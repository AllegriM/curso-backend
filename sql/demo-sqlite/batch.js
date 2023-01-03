const configDB = require('../DB/config')
const knex = require('knex')(configDB.sqlite);

const cars = [
    { name: "Audi", price: 50000 },
    { name: "Mercedes", price: 40000 },
    { name: "BMW", price: 45000 },
    { name: "Volkswagen", price: 30000 },
    { name: "Renault", price: 35000 },
    { name: "Volvo", price: 50000 },
    { name: "Mazda", price: 65000 },
    { name: "Chevrolet", price: 35000 }
];

(async () => {
    try {
        console.log(' ---> Borramos todos los autos')
        await knex('cars').del()

        console.log(' ---> Insertamos autos')
        await knex('cars').insert(cars)

        console.log(' ---> Leemos todos los autos')
        let rows = await knex.from('cars').select('*')
        for (row of rows) console.log(`${row['id']} ${row['name']} ${row['price']}`)

        console.log(' ---> Insertamos un auto mas')
        await knex('cars').insert({ name: 'Fiat', price: 15000 })

        console.log(' ---> Leemos todos los autos actualizados')
        rows = await knex.from('cars').select('*')
        for (row of rows) console.log(`${row['id']} ${row['name']} ${row['price']}`)
    }
    catch (error) {
        console.log(error)
    }
    finally {
        knex.destroy()
    }
})();