if (process.env.NODE_ENV === 'prod') {
    console.log('KEYS PROD')
    module.exports = require('./keys.prod')
} else if (process.env.NODE_ENV === 'dev') {
    console.log('KEYS DEV')
    module.exports = require('./keys.dev')
}
