const express = require('express')
const fs = require('fs')
const router = express.Router();
const products = require('../../products.json')

// Middlewares


// RUTAS

router.get('/', (req, res, next) => {
    res.json(products)
})

router.get('/', async function (req, res, next) {
    console.log(req.query)
    const { precio } = req.query
    const precioToNumber = +precio
    const productosMenorAPrecio = products.filter(producto => producto.price <= precioToNumber)
    res.send(productosMenorAPrecio)
})

router.get('/:id', async function (req, res, next) {
    const { id } = req.params
    const producto = products.find(producto => producto.id === +id)
    res.send(producto)
})

router.post('/', async function (req, res, next) {
    console.log(req.body)
    const { title, price, description, image } = req.body
    const newProduct = {
        id: products.length + 1,
        description,
        title,
        price,
        image
    }
    products.push(newProduct)
    fs.writeFileSync('../../products.json', JSON.stringify(products, null, 2))
    res.send(newProduct)
})

router.put('/:id', async function (req, res, next) {
    const { id } = req.params
    const { title, price, description, image } = req.body
    if (!title || !price || !description || !image) {
        return res.status(400).json({ success: false, error: "Wrong body format!" })
    }
    const productoIndex = products.findIndex(producto => producto.id === +id)
    if (productoIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!` });
    console.log(productoIndex)
    const newProduct = {
        ...products[productoIndex],
        title,
        price,
        description,
        image
    }
    products[productoIndex] = newProduct
    console.log(newProduct)
    fs.writeFileSync('../../products.json', JSON.stringify(products, null, 2))
    res.json(products)
})

router.delete('/:id', async function (req, res, next) {
    const { id } = req.params
    const prodIndex = products.findIndex(product => product.id === +(id))
    if (prodIndex < 0) {
        return res.status(400).send(`Producto con id ${id} no existe`)
    }
    const deletedProds = products.splice(prodIndex, 1)
    fs.writeFileSync('../../products.json', JSON.stringify(deletedProds, null, 2))
    res.json(products)
})

module.exports = router