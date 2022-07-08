/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table
                .increments('id')
                .comment('Идентификатор');
            table
                .string('username', 255)
                .notNullable().unique()
                .comment('Логин');
            table
                .string('password', 255)
                .notNullable()
                .comment('Пароль');
            table
                .string('status', 64)
                .notNullable()
                .defaultTo('active')
                .comment('Статус');
            table
                .datetime('created_at', {useTz: false})
                .notNullable()
                .defaultTo(knex.fn.now())
                .comment('Дата создания');
            table
                .timestamp('updated_at', {useTz: false})
                .nullable()
                .comment('Дата обновления');
            table.comment('Пользователи');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('users')
};
