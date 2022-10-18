const { options } = require('./options/MariaDB')
const knex = require('knex')(options)

knex.from('cars').del()
    .then(() => console.log('All cars deleted'))
    .catch((error) => {
        console.log(error);
        throw error
    })
    .finally(() => knex.destroy())