// const http = require('http')
const express = require('express')
const PORT = process.env.PORT || 8080
const fs = require('fs')
const apiRoutes = require('./routers/app.routers')
const loggerMiddleware = require('./middleware/logger')

// VERSION CORTA CON EXPRESS
const app = express()
const path = require('path')

// MIDDLEWARE

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)

// RUTAS

app.use('/api', apiRoutes)


const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', (error) => {
    console.log(error)
})
