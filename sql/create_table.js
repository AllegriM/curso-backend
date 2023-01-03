const configDB = require('./DB/config')
const knex = require('knex')(configDB.mariaDB);

(async () => {
    try {
        const tableExists = knex.schema.hasTable('cars')
        if (!tableExists) {
            knex.schema.createTable('cars', (table) => {
                table.increments('id');
                table.string('name');
                table.integer('price');
            });
        }
        console.log("Table Created!!")
    } catch (error) {
        console.log(error);
        throw error
    }
    finally {
        knex.destroy();
    }
})()
