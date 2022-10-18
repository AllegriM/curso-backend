const { options } = require('./options/MariaDB')
const knex = require('knex')(options)

knex.from('cars').select('price', '9000').update({ price: '9500' })
    .then(() => console.log('Car Updated!'))
    .catch((error) => {
        console.log(error);
        throw error
    })
    .finally(() => knex.destroy())