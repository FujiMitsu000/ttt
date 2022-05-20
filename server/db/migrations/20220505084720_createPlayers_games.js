/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('players_games', function (table) {
            table
                .increments('id')
                .primary()
                .comment('Идентификатор');
            table
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .comment('Идентификатор пользователя');
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
                .comment('Игроки');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('players_games')
};
