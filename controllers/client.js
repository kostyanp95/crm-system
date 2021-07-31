const Client = require('../models/Client')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

/**
 * Получить всеъ клиентов
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getAll = async function (req, res) {

    const query = {}

    // Date registration
    if (req.query.start) {
        query.date = {
            // >=
            $gte: req.query.start
        }
    }

    if (req.query.order) {
        query.order = +req.query.order
    }

    if (req.query.clientId) {
        query._id = req.query.clientId
    }

    try {

        const clients = await Client
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)

        let promise = []

        clients.forEach(client => {
            promise = client.orders.map(async (order, index) => {
                client.orders[index] = await Order.findById(order._id)
            })
        })

        await Promise.all(promise)

        res.status(200).json(clients)

    } catch (e) {
        errorHandler(res, e)
    }
}

/**
 * Получить клиента по ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getById = async function (req, res) {
    try {
        const client = await Client.findById(req.body.clientId)

        const promise = client.orders.map(async (order, index) => {
            client.orders[index] = await Order.findById(order._id)
        })

        await Promise.all(promise)

        res.status(200).json(client)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const lastClient = await Client
            .findOne()
            .sort({date: -1})
        const maxClient = lastClient ? lastClient.order : 0

        const client = await new Client({
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            user: req.user._id,
            order: maxClient + 1
        }).save()

        console.log(client)

        res.status(201).json(client)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {

        const client = await Client.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )

        res.status(201).json(client)
    } catch (e) {
        errorHandler(res, e)
    }
}

