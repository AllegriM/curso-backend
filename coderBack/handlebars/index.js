const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const Products = require('./model/Products')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productsList = new Products()

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('./partials/form', { layout: "index" })
})

app.get('/products', (req, res) => {
    res.render('./partials/products', { layout: "index", products: productsList.getAll() })
})

app.post('/products', (req, res) => {
    const product = req.body
    productsList.add(product)
    res.render('./partials/products', { layout: "index", products: productsList.getAll() })
})

app.listen(PORT, () => [
    console.log(`Escuchando en el puerto ${PORT}`)
])


