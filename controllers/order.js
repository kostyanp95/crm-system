const Order = require('../models/Order')
const Client = require('../models/Client')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {

    const query = {}

    // Date start
    if (req.query.start) {
        query.date = {
            // >=
            $gte: req.query.start
        }
    }

    // Date end
    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }
        query.date.$lte = req.query.end
    }

    if (req.query.order) {
        query.order = +req.query.order
    }

    try {
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)

        const client = orders.map(async order => {
            order.client = await Client.findById(order.client)
        })

        const user = orders.map(async order => {
            order.user = await User.findById(order.user)
        })

        await Promise.all(client)
        await Promise.all(user)

        res.status(200).json(orders)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        let clientId = ''
        let idCreatedClient = ''
        let createdClient = {}

        const lastOrder = await Order
            .findOne()
            .sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order : 0

        const lastClient = await Client
            .findOne()
            .sort({date: -1})
        const maxClient = lastClient ? lastClient.order : 0

        if (req.body.clientId) {
            clientId = req.body.clientId
        } else {
            createdClient = await new Client({
                name: req.body.client.name,
                surname: req.body.client.surname,
                lastname: req.body?.client?.lastname,
                phone: req.body.client.phone,
                email: req.body?.client?.email,
                user: req.user._id,
                order: maxClient + 1
            }).save()
            idCreatedClient = createdClient._id
        }

        const order = await new Order({
            list: req.body.list,
            user: req.user._id,
            client: clientId || idCreatedClient,
            comment: req.body?.comment,
            status: req.body.status,
            order: maxOrder + 1
        }).save()

        createdClient = await Client.findByIdAndUpdate(
            {_id: clientId || idCreatedClient},
            {$push: {orders: order._id}},
            {new: true}
        )

        const resultOrder = {
            order,
            client: createdClient
        }
        res.status(201).json(resultOrder)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        console.log('update order: ', req.body)
        console.log('params: ', req.params)
        const order = await Order.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )

        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}
