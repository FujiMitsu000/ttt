/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('available_rights', function (table) {
            table
                .increments('id')
                .comment('Идентификатор');
            table
                .integer('role_id')
                .notNullable()
                .references('id')
                .inTable('roles');
            table
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('available_rights')
};
