/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('roles', function (table) {
            table
                .increments('id')
                .comment('Идентификатор');
            table
                .string('role', 255)
                .notNullable().unique()
                .comment('Роль');
            table
                .boolean('active')
                .notNullable();
            table
                .timestamp('created_at', {useTz: false})
                .notNullable()
                .defaultTo(knex.fn.now())
                .comment('Дата создания');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('roles')
};
