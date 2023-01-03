const configDB = require('./DB/config')
const knex = require('knex')(configDB.mariaDB);

(async () => {
    try {
        const orderedCars = await knex.from('cars').orderBy('price')
        console.table(orderedCars)
    } catch (error) {
        console.log(error);
        throw error
    }
    finally {
        knex.destroy()
    }
})()