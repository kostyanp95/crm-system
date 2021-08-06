const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')

const User = mongoose.model('users')
const keys = require('../config/keys')

console.log(keys.jwt)
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

/**
 * Checking the user's token
 * @param passport
 */
module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('id')
                user ? done(null, user) : done(null, false)
            } catch (error) {
                console.error(error)
            }
        })
    )
}
