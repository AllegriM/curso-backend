const fs = require('fs')


class Contenedor{
    constructor(file){
        this.file = file;
    }

    async getAll(){
        try {
            const productosInfo = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const contenidoProductos = JSON.parse(productosInfo)
            return contenidoProductos            
        } catch (error) {   
            console.log(error)
        }
    }
    async saveItem(item){
        try {
            const START_ARRAY = await this.getAll()
            const lastID = START_ARRAY.length - 1
            const LAST_TO_ADD = START_ARRAY[lastID].id
            item.id = LAST_TO_ADD + 1
            const NEW_ID = item.id
            START_ARRAY.push(item)
            await fs.promises.writeFile(`./${this.file}`, JSON.stringify(START_ARRAY))
            return NEW_ID
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id){
        try {
            const START_ARRAY = await this.getAll()
            const ITEM_BY_ID = START_ARRAY.find(item => item.id === id)  
            if (ITEM_BY_ID) return ITEM_BY_ID
            else return null
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(id){
        try {
            const START_ARRAY = await this.getAll()
            const NEW_ARRAY = START_ARRAY.filter(item => item.id !== id)
            console.log(NEW_ARRAY)
            return fs.promises.writeFile(`./${this.file}`, JSON.stringify(NEW_ARRAY))
        } catch (error) {
            console.log(error)
        }   
    }
    deleteAll(){
        try {
            const NEW_ARRAY = []
            return fs.promises.writeFile(`./${this.file}`, JSON.stringify(NEW_ARRAY))
        } catch (error) {
            console.log(error)
        }   
    }
}

let contenedor = new Contenedor('productos.json')

const nuevoProducto = {
    "title": "Podadora",
    "price": 140.50,
    "thumbnail": 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    "id": 4,
}

console.log(contenedor.deleteAll().then(res => console.log(res)))