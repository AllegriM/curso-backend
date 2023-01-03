const knex = require('knex')

module.exports = class Chat {
    constructor(config, tableName) {
        this.knex = knex(config);
        this.tableName = tableName;
    };
    async createTable() {
        return this.knex.schema.hasTable(this.tableName)
            .then(response => {
                if (!response) {
                    return this.knex.schema.createTable(this.tableName, (table) => {
                        table.increments('id');
                        table.string('email');
                        table.string('message');
                    })
                }
            }).then(() => {
                console.log('Tabla de chat creada');
            }).catch((err) => {
                console.log(err);
            })
    }
    async listMessages() {
        try {
            const messages = await this.knex.from(this.tableName).select('email', 'message')
            return messages;
        } catch (error) {
            console.log('No se pudo leer la Base de Datos', error)
        }
    }
    async addMessage(message) {
        try {
            const newMessage = await this.knex(this.tableName).insert(message)
            return newMessage
        } catch (error) {
            console.log('No se pudo leer la Base de Datos', error)
        }
    }
};