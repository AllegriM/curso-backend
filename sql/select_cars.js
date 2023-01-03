const configDB = require('./DB/config')
const knex = require('knex')(configDB.mariaDB);

(async () => {
    try {
        const cars = await knex.from('cars').select('*')
        console.table(cars)
    } catch (error) {
        console.log(error);
        throw error
    }
    finally {
        knex.destroy()
    }

})()
