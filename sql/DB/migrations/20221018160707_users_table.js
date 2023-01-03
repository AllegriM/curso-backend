/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = async function (knex) {
    const exist = await knex.schema.hasTable('cars')
    if (!exist) {
        return knex.schema.createTable('cars', table => {
            table.increments('id')
            table.string('name').notNullable().defaultTo('Volkswagen')
            table.integer('price')
        })
            .then(() => console.log("Table Created!!"))
            .catch((error) => { console.log(error); throw error })
            .finally(() => {
                knex.destroy();
            })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function (knex) {
    const exist = await knex.schema.hasTable('cars')
    if (exist) {
        knex.schema.dropTable('cars')
    }
};
