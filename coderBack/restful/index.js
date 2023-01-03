// const http = require('http')
const express = require('express')
const PORT = process.env.PORT || 8080
const apiRoutes = require('./routers/app.routers')
const loggerMiddleware = require('./middleware/logger')

console.log(__dirname)

// VERSION CORTA CON EXPRESS
const app = express()
const path = require('path')

// MIDDLEWARE

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(loggerMiddleware)

// RUTAS
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
    console.log(__dirname)
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', (error) => {
    console.log(error)
})
