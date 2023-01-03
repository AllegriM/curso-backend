const express = require('express');

const PORT = process.argv[2] || 8080;

const delay = (duration) => {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {// event loop bloqueado;
    }
};

const app = express();

app.use(express.static(__dirname + '/public'))
app.get('/datos', (req, res) => {
    console.table({
        port: PORT, date: new Date().toISOString()
    });
    const html = `Servidor express <span style="color: coral; font-weight: bold;">(NginX)</span> | ${PORT} - <b>PID => ${process.pid}</b> - ${new Date().toLocaleString()}`
    res.send(html);
});

app.get('/tempo', (req, res) => {
    delay(6000);
    res.send(`<b>[${process.pid}] => Beep! beep! beep! | (${PORT}) </b>`);
});

const runningServer = app.listen(PORT, () => {
    console.log('[', process.pid, '] => ', `Server is up and running on http://localhost:${PORT}`);
});

runningServer.on('error', (error) => {
    console.log(error.message);
})
