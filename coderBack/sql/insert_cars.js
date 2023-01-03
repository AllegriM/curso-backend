const { options } = require('./options/MariaDB')
const knex = require('knex')(options);

const cars = [
    { name: "Audi", price: 50000 },
    { name: "Mercedes", price: 40000 },
    { name: "BMW", price: 45000 },
    { name: "Volkswagen", price: 30000 },
    { name: "Renault", price: 35000 },
    { name: "Volvo", price: 50000 },
    { name: "Mazda", price: 65000 },
    { name: "Chevrolet", price: 35000 }
]

knex('cars').insert(cars)
    .then(() => console.log('Data inserted'))
    .catch((error) => { console.log(error); throw error })
    .finally(() => knex.destroy())