/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await knex('turns').insert([
    {game_id: 1, order: 4, position: 'X'},
    {game_id: 1, order: 0, position: 'O'},
    {game_id: 1, order: 1, position: 'X'},
    {game_id: 1, order: 3, position: 'O'},
    {game_id: 1, order: 7, position: 'X'},

    {game_id: 2, order: 4, position: 'X'},
    {game_id: 2, order: 6, position: 'O'},
    {game_id: 2, order: 7, position: 'X'},
    {game_id: 2, order: 3, position: 'O'},
    {game_id: 2, order: 1, position: 'X'},

    {game_id: 3, order: 0, position: 'X'},
    {game_id: 3, order: 1, position: 'O'},
    {game_id: 3, order: 3, position: 'X'},
    {game_id: 3, order: 7, position: 'O'},
    {game_id: 3, order: 5, position: 'X'},
    {game_id: 3, order: 4, position: 'O'},

    {game_id: 4, order: 4, position: 'X'},
    {game_id: 4, order: 3, position: 'O'},
    {game_id: 4, order: 8, position: 'X'},
    {game_id: 4, order: 0, position: 'O'},
    {game_id: 4, order: 6, position: 'X'},
    {game_id: 4, order: 7, position: 'O'},
    {game_id: 4, order: 2, position: 'X'},

    {game_id: 5, order: 8, position: 'X'},
    {game_id: 5, order: 2, position: 'O'},
    {game_id: 5, order: 0, position: 'X'},
    {game_id: 5, order: 4, position: 'O'},
    {game_id: 5, order: 5, position: 'X'},
    {game_id: 5, order: 6, position: 'O'}
  ]);
};
