const configDB = require('./DB/config')
const knex = require('knex')(configDB.mariaDB);

(async () => {
    try {
        const deletedCars = await knex.from('cars').del()
        console.log('All cars deleted')
        return deletedCars
    } catch (error) {
        console.log(error);
        throw error
    }
    finally {
        knex.destroy()
    }
})()