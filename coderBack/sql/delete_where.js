const { options } = require('./options/MariaDB')
const knex = require('knex')(options)

knex.from('cars').where('price', '>', '50000').del()
    .then(() => console.log('Cars deleted'))
    .catch((error) => {
        console.log(error);
        throw error
    })
    .finally(() => knex.destroy())