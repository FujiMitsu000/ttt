/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('rights', function (table) {
            table
                .increments('id')
                .comment('Идентификатор');
            table
                .string('name', 255)
                .notNullable();
            table
                .string('entity', 128)
                .notNullable();
            table
                .integer('level')
                .notNullable();
        });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
return knex.schema
    .dropTable('rights')
};

