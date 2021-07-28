const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
const passport = require('passport')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const keys = require('./config/keys')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const clientRoutes = require('./routes/client')

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.info('MongoDB connected.'))
    .catch(error => console.error(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/client', clientRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/dist/client/index.html'))
    })
}

module.exports = app
