
const options = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            database: 'demopb16'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: { filename: '../DB/sqlite/demopb16.sqlite' },
        useNullAsDefault: true
    }
}

module.exports = options 