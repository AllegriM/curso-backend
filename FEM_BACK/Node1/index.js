const http = require('http');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');

http.createServer((req, res) => {
    res.write("Hello World!");
    res.end();
}).listen(8080)

console.log('Server started on port 8080!')

const data = {
    title: 'Hello World',
    body: "I'm the best frontend developer in the world!"
}
// console.log(Object.entries(data))

const readFilePromise = async () => {
    try {
        let template = await readFile(path.join(__dirname, 'template.html'), 'utf8');
        for (const [k, v] of Object.entries(data)) {
            template = template.replace(`{${k}}`, v);
        }
        await writeFile(path.join(__dirname, 'template.html'), template);
    } catch (error) {
        console.error(error)
    }
}

readFilePromise()
