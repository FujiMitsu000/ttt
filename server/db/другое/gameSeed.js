/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE games_results RESTART IDENTITY CASCADE');
  await knex('games_results').insert([
    {id: 1, size: 3, winner: 1},
    {id: 2, size: 3, winner: 1},
    {id: 3, size: 3, winner: 2},
    {id: 4, size: 3, winner: 1},
    {id: 5, size: 3, winner: null},
    {id: 6, size: 3, winner: 2,}
  ]);
};
