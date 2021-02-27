const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

/**
 * Get all positions
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e)
    }
}
