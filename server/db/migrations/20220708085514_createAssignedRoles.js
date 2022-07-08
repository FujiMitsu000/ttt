/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
    await knex.schema
    .createTable('assigned_roles', (table) => {
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
exports.down = async(knex) => {
    await knex.schema
        .dropTable('assigned_roles')
};
