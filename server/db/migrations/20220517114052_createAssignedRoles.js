/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('assigned_roles', function (table) {
            table
                .increments('id')
                .comment('Идентификатор');
            table
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users');
            table
                .integer('role_id')
                .notNullable()
                .references('id')
                .inTable('roles');
        });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
    return knex.schema
        .dropTable('assigned_roles')
};

