if (process.env.NODE_ENV === 'prod') {
    module.exports = require('./keys.prod')
} else {
    module.exports = require('./keys.dev')
}
