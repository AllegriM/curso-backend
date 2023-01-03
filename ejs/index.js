const express = require('express');
const Products = require('./model/Products')
const PORT = 8080;

const app = express();

const productList = new Products();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/form', { layout: "index" })
})

app.get('/products', (req, res) => {
    res.render('pages/products', { layout: "index", products: productList.getAll() })
})

app.post('/products', (req, res) => {
    const product = req.body;
    productList.add(product)
    res.render('pages/products', { layout: "index", products: productList.getAll() })
})

app.listen(PORT, () => {
    console.log(`Server running on port https://localhost.${PORT}`)
})