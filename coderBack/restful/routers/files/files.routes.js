const express = require('express')
const multer = require('multer')
const router = express.Router();

// Middlewares
// diskStorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //req => peticion
        //file => archivo que se esta cargando
        //cb => callback para cargar el archivo ascincronamente
        cb(null, '')
    }
})

const upload = multer({ storage })

// RUTAS

router.post('/file', upload.single('single-file'), (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Debe cargar un archivo!')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send('OK')
})

router.post('/files', upload.array('multiple-files'), (req, res) => {
    const files = req.files
    if (!files || files.length < 1) {
        const error = new Error('Debe cargar uno o mas archivos!')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send('OK')
})


module.exports = router