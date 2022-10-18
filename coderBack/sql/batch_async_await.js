const { default: knex } = require("knex")

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
    })