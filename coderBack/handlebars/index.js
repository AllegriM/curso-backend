const express = require('express')
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io')
const { engine } = require('express-handlebars')
const path = require('path')
const Products = require('./model/Products')
const chatClient = require('./model/chat');
const dbConfig = require('./DB/config');

const chat = new chatClient(dbConfig.sqlite, 'chat')
const productsList = new Products(dbConfig.sqlite, 'product')

const PORT = process.env.PORT || 8080;
const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

app.get('/', async (req, res) => {
    const products = await productsList.getAll()
    const messages = await chat.listMessages()
    res.render('./partials/main', { layout: "index", products, messages })
})

io.on('connection', async (socket) => {
    console.log(`New client connection 💻: ${socket.id}`)

    await chat.createTable()
    await productsList.createTable()

    const messages = await chat.listMessages();
    socket.emit('message', messages)

    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected')
    })

    socket.on('add-product', product => {
        productsList.addProduct(product)
        io.emit('update-products', product)
    })

    socket.on('message', async (message) => {
        chat.addMessage(message)
        const messages = await chat.listMessages();
        io.emit('message', messages)
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


