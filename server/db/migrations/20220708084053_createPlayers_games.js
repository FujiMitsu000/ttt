/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
  await knex.schema
    .createTable('players_games', (table) => {
        table
            .increments('id')
            .primary()
            .comment('Идентификатор');
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .comment('Первый игрок Х');
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .comment('Второй игрок О');
        table
            .integer('game_id')
            .notNullable()
            .references('id')
            .inTable('games_results')
            .comment('Идентификатор игры');
        table
            .integer('number')
            .notNullable()
            .comment('Номер игрока по порядку');
        table
            .unique(['user_id', 'game_id'])
            .unique(['game_id', 'number'])
            .comment('Игроки в сыгранных играх');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
  await knex.schema
    .dropTable('players_games');
};
