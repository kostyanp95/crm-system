const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

/**
 * Login
 * @param req - request
 * @param res - response
 * @returns {Promise<void>}
 */
module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        name: req.body.name,
        surname: req.body.surname
    })

    if (candidate) {
        // Проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                name: candidate.name,
                surname: candidate.surname,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600 * 30})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Не верный пароль.'
            })
        }
    } else {
        // Пользователь не существует
        res.status(404).json({
            message: 'Пользователь не найден.'
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
    const candidate = await User.findOne({
        name: req.body.name,
        surname: req.body.surname
    })

    // если юзер существует
    if (candidate) {
        // возвращаем ошибку
        res.status(409).json({
            message: 'Такой пользователь уже есть.'
        })
    } else {
        // иначе, создаем юзера
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            // сохраняем пользователя
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            // обрабатываем ошибку
            errorHandler(res, e)
        }

    }
}
