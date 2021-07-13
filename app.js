const express = require('express')
const morgan = require("morgan")
const cors = require("cors")
const passport = require('passport')
const mongoose = require('mongoose')
const app = express()

const keys = require('./config/keys')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

mongoose.connect(keys.localMongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.info('MongoDB connected.'))
    .catch(error => console.error(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(express.json({extended: true}))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
