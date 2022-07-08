/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('turns', function (table) {
            table
                .increments('id')
                .primary()
                .comment('Идентификатор');
            table
                .integer('game_id')
                .notNullable()
                .comment('Идентификатор игры')
                .references('id')
                .inTable('games_results');
            table
                .integer('number')
                .notNullable()
                .comment('Номер хода по порядку');
            table
                .integer('position')
                .notNullable()
                .comment('Позиция на которую сделан ход');
            table
                .unique(['game_id', 'number'])
                .unique(['game_id', 'position'])
                .comment('Ходы');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('turns')
};
