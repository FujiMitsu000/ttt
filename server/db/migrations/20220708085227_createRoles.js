/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
    await knex.schema
        .createTable('roles', (table) => {
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
exports.down = async(knex) => {
    await knex.schema
        .dropTable('roles');
};
