/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE players_games RESTART IDENTITY CASCADE');
  await knex('players_games').insert([
    {id: 1, user_id: 1, game_id: 1, number: 1},
    {id: 2, user_id: 2, game_id: 1, number: 2},
    {id: 3, user_id: 2, game_id: 2, number: 1},
    {id: 4, user_id: 3, game_id: 2, number: 2},
    {id: 5, user_id: 3, game_id: 3, number: 1},
    {id: 6, user_id: 4, game_id: 3, number: 2},
    {id: 7, user_id: 4, game_id: 4, number: 1},
    {id: 8, user_id: 5, game_id: 4, number: 2},
    {id: 9, user_id: 5, game_id: 5, number: 1},
    {id: 10, user_id: 1, game_id: 5, number: 2},
    {id: 11, user_id: 3, game_id: 6, number: 1},
    {id: 12, user_id: 5, game_id: 6, number: 2}
  ]);
};
