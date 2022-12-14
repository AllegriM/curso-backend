const path = require('path')

const options = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: { filename: path.resolve(__dirname, 'sqlite/ecommerce.sqlite') },
        useNullAsDefault: true
    }
}

module.exports = options 