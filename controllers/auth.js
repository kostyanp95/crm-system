const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')

/**
 * Login
 * @param req - request
 * @param res - response
 * @returns {Promise<void>}
 */
module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        // Проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 3600 })
            res.status(200).json({
                token: token
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают...'
            })
        }
    } else {
        // Пользователь не существует
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}

/**
 * User registration
 * @param req - request
 * @param res - response
 * @returns {Promise<void>}
 */
module.exports.register = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    // если юзер существует
    if (candidate) {
        // возвращаем ошибку
        res.status(409).json({
            message: 'Такой email уже занят.'
        })
    } else {
        // иначе, создаем юзера
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            // сохраняем пользователя
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            // обрабатываем ошибку

        }

    }
}
