const express = require('express')
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io')
const { engine } = require('express-handlebars')
const path = require('path')
const Products = require('./model/Products')
const Mensajes = require('./model/Mensajes')

const PORT = process.env.PORT || 8080;
const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productsList = new Products()
const mensajes = new Mensajes('mensajes.json')

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

app.get('/', async (req, res) => {
    const products = productsList.getAll()
    const messajes = await mensajes.getAll()
    res.render('./partials/main', { layout: "index", products, messajes })
})

// app.post('/products', (req, res) => {
//     const product = req.body
//     productsList.add(product)
//     res.render('./partials/products', { layout: "index", products: productsList.getAll() })
// })

io.on('connection', (socket) => {
    console.log(`New client connection 💻: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected')
    })

    socket.on('add-product', product => {
        productsList.add(product)

        io.emit('update-products', product)
    })

    socket.on('message', async message => {
        const data = {
            email: message.email,
            message: message.message,
            date: new Date().toLocaleString(),
        };

        await mensajes.save(data);

        io.emit('message', data);
    });

})

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({ error, message: "Something went wrong, sorry" })
})


httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})

httpServer.on('error', err => {
    console.log(`Something went WORNG: ${err}`);
});


