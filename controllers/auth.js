const bcrypt = require('bcryptjs')

const User = require('../models/User')

module.exports.login = function(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

module.exports.register = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  // если юзер существует
  if(candidate) {
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
      // созраняем пользователя
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      // обрабатываем ошибку

    }

  }
}