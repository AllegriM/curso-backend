const configDB = require('./DB/config')
const knex = require('knex')(configDB.mariaDB);

const name = 'VOLSVAGEN';
(async () => {
    try {
        const updatedCar = await knex.from('cars').where({ name }).update({ name: 'Volkswagen' })
        console.log('Car Updated!')
        console.log(updatedCar)
    } catch (error) {
        console.log(error);
        throw error
    }
    finally {
        knex.destroy()
    }
})()