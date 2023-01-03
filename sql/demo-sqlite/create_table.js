const configDB = require('../DB/config')
const knex = require('knex')(configDB.sqlite);

(async () => {
    try {
        const tableExists = await knex.schema.hasTable('cars')
        if (!tableExists) {
            await knex.schema.createTable('cars', (table) => {
                table.increments('id')
                table.string('name')
                table.integer('price')
            })
            console.log("Table Created!!")
        }
    } catch (error) {
        console.log(error);
        throw error
    }
    finally {
        knex.destroy();
    }
})();