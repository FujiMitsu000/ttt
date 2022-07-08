/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('games_results', function (table) {
            table
                .increments('id')
                .comment('Идентификатор');
            table
                .integer('size')
                .notNullable()
                .comment('Размер поля');
            table
                .integer('winner')
                .nullable()
                .comment('Номер победившего игрока');
            table
                .timestamp('created_at', {useTz: false})
                .notNullable()
                .defaultTo(knex.fn.now())
                .comment('Дата создания');
            table
                .timestamp('finished_at', {useTz: false})
                .nullable()
                .comment('Дата окончания');
            table
                .timestamp('deleted_at', {useTz: false})
                .nullable()
                .comment('Дата удаления');
            table.comment('Игры');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('games_results')
};
