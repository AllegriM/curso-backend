
const express = require('express');
const cluster = require('cluster')
const args = require('minimist')(process.argv.slice(2), { default: { PORT: 8080 }, alias: { p: 'PORT' } });
const os = require('os');
const PORT = args.PORT;

if (cluster.isPrimary) {
    console.log('Estoy en el proceso principal')
    const numCPUs = os.cpus().length;
    console.log(`Número de CPUs => ${numCPUs}`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    console.log('Estoy en un proceso secundario')
    const app = express();
    let visitas = 0;
    const delay = (duration) => {
        const startTime = Date.now();

        while (Date.now() - startTime < duration) { }; // Event loop is blocked};
    }

    app.get('/', (req, res) => {
        res.send(`No. de visitas => ${++visitas}`);
    });

    app.get('/timer', (req, res) => {
        delay(9000); res.send("Ding ding ding!");
    });

    app.listen(PORT, () => {
        console.log(`Server is up and running on http://localhost:${PORT}`);
    })
}


