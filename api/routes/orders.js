const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => res.json({
    message: 'List of orders!'
}))

router.post('/', (req, res, next) => {
    const order = {
        id: req.body.id,
        price: req.body.price
    }
    res.status(201).json({
        message: 'New order created',
        order: order
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).json({
        id: id
    })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    res.json({
        message: `Order ${id} deleted`
    })
})

module.exports = router