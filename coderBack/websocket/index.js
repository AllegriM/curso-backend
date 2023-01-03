const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io')

const PORT = process.env.PORT || 8080;
const app = express()

app.use(express.static('./public'))

const httpServer = new HttpServer(app);
const POLL_RATE = 500

// setInterval(async () => {
//     // const messages = await fetch('https://api.chat-app.com/messages')
//     // console.log(messages)
// }, POLL_RATE)


httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})

const io = new SocketServer(httpServer)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')

    socket.on('client-message', (message) => {
        io.emit('server-message', message)
    })
})