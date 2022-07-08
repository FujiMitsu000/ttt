/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
  await knex.schema
    .createTable('tokens', (table) => {
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
            .nullable
            .comment('Дата истечения');
        table.comment('Токены пользователей');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
  await knex.schema
    .dropTable('tokens');
};
