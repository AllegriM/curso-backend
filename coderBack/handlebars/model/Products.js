const knex = require('knex')

class Products {
    constructor(config, tableName) {
        this.knex = knex(config);
        this.tableName = tableName;
    }
    async createTable() {
        return this.knex.schema.hasTable(this.tableName)
            .then(response => {
                if (!response) {
                    return this.knex.schema.createTable(this.tableName, (table) => {
                        table.increments('id');
                        table.string('nombre');
                        table.float('precio');
                        table.string('imagen');
                    })
                }
            }).then(() => {
                console.log('Tabla de productos creada');
            }).catch((err) => {
                console.log(err);
            })
    }
    async getAll() {
        try {
            const products = await this.knex.from(this.tableName).select('nombre', 'precio', 'imagen');
            return products
        } catch (error) {
            console.log('La base de datos tuvo un problema: ', error)
        }
    }

    async getById(productId) {
        try {
            const productByID = await this.knex.from(this.tableName).select('string', 'precio', 'imagen').where('id', productId);
            return productByID
        } catch (error) {
            console.log('La base de datos tuvo un problema: ', error)
        }
    }

    async addProduct(product) {
        try {
            const newProduct = {
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen
            };
            await this.knex(this.tableName).insert(newProduct)
            return 'Producto Agregado';
        } catch (error) {
            console.log('La base de datos tuvo un problema: ', error)
        }
    };

    async updateById(productId, product) {
        const {
            nombre,
            descripcion,
            precio,
            imagen
        } = product;
        try {
            await this.knex(this.tableName).where({ id: productId }).update({ nombre, descripcion, precio, imagen })
            return 'Producto Actualizado!!';
        } catch (error) {
            console.log('La base de datos tuvo un problema: ', error)
        }
    }

    async deleteById(productId) {
        try {
            await this.knex(this.tableName).where({ id: productId }).del()
            return 'Producto Eliminado!!'
        } catch (error) {
            console.log('La base de datos tuvo un problema: ', error)
        }
    }
}

module.exports = Products;