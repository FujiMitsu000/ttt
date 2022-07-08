/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
    await knex.schema
        .createTable('users', (table) => {
        table
                increments('id')
                .comment('Идентификатор');
        table
                .string('username', 255)
                .notNullable()
                .unique()
                .comment('Имя пользователя');
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
        })
        };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
   await knex.schema
        .dropTable('users');
};
