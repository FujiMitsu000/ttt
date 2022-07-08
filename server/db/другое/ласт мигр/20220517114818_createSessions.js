/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('sessions', function (table) {
            table
                .increments('id')
                .comment('Идентификатор');
            table
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users');
            table
                .string('token', 512)
                .notNullable();
            table
                .datetime('created_at', {useTz: false})
                .notNullable()
                .defaultTo(knex.fn.now())
                .comment('Дата создания');
            table
                .timestamp('expires_in', {useTz: false})
                .comment('Дата истечения');
        });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
    return knex.schema
        .dropTable('sessions')
};
