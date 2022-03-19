const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => res.json({
    message: 'Product GET route works!'
}))

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    }
    res.status(201).json({
        message: 'Product POST route works!',
        product: product
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id === 'special') {
        res.status(200).json({
            id: id,
            message: 'Got an special ID'
        })
    } else {
        res.status(200).json({
            id: id,
            message: 'Got an ID'
        })
    }
})

router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).json({
        message: `Product ${id} updated`
    })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    res.json({
        message: `Product ${id} deleted`
    })
})

module.exports = router