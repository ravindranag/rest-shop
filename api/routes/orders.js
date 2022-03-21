const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Order = require('../models/order')

router.get('/', (req, res, next) => {
    Order.find()
        .then(docs => {
            const result = {
                count: docs.length,
                data: docs
            }
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId,
        ...req.body
    })

    const err = order.validateSync()

    if (err) {
        res.status(400).json({
            error: err
        })
    }

    order.save()
        .then(order => {
            const result = {
                message: 'Order created',
                order: order,
                request: {
                    type: 'GET',
                    url: req.headers.host + '/orders/' + order._id
                }
            }
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Order.findById(id).select('_id product quantity')
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ error: 'Not Found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: err })
        })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Order.findByIdAndDelete(id)
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'Order deleted successfully.'
                })
            } else {
                res.status(404).json({
                    error: 'Order not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router