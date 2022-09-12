const express = require('express')
const productRoutes = require('./products/products.routes')
const userRoutes = require('./users/users.routes')
const fileRoutes = require('./files/files.routes')
const router = express.Router();

router.use('/files', fileRoutes)
router.use('/products', productRoutes)
router.use('/users', userRoutes)

module.exports = router