// const http = require('http')
const express = require('express')
const fs = require('fs')
const Contenedor =  require('./ejercicio2.js') 

const PORT = 8080

// VERSION CORTA CON EXPRESS
const app = express()

const nuevoContenedor = new Contenedor('Nuevosproductos.json')

console.log(nuevoContenedor)
app.get('/productos', async function(req, res) {
    const ALL_PRODS = await nuevoContenedor.getAll().then(item => item)
    res.send(ALL_PRODS)
})

app.get('/productoRandom', async function(req, res) {
    const ALL_PRODS = await nuevoContenedor.getAll().then(item => item)
    const RANDOM_NUM = Math.floor(Math.random() * ALL_PRODS.length) 
    const RANDOM_PROD = ALL_PRODS[RANDOM_NUM]
    res.send(RANDOM_PROD)
})


app.listen(PORT)


const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

// Manejar error duraten conexion al server

server.on('error', error => console.log(`Error en el servidor ${error}`))





// VERSION LARGA CON NODE.JS //
// const server = http.createServer((req, res) => {
//     res.end('Hola Mundo')
// })

// const connectedServer = server.listen(8080, () =>{
//     console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
// })
