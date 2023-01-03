const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(cookieParser());

// Routes
app.get('/set', (req, res, next) => {
    const { cookie } = req.query;
    res.cookie('nombre', 'marco', { httpOnly: true }).send('Cookie Set');
});

app.get('/setex', (req, res, next) => {
    res.cookie('server2', 'express2', { maxAge: 10000 }).send('Cookie 2 Set');
});

app.get('/get', (req, res, next) => {
    const { cookie } = req.query;
    console.log(req.cookies);
    res.send(req.cookies['server1']);
});

app.get('/clr', (req, res, next) => {
    res.clearCookie('nombre').send('Cookie Cleared')
})

// Edit cookie => document.cookie = "userEmail=camilin@gmail.com"

app.listen(PORT, () => {
    console.log('Server is up and running on port: ', PORT)
});