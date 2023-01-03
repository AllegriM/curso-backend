const { options } = require('./options/MariaDB')
const knex = require('knex')(options)

knex.schema.createTable('cars', table => {
    table.increments('id')
    table.string('name')
    table.integer('price')
})
    .then(() => console.log("Table Created!!"))
    .catch((error) => { console.log(error); throw error })
    .finally(() => {
        knex.destroy();
    })