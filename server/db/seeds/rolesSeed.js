/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
    await knex.raw('TRUNCATE TABLE roles RESTART IDENTITY CASCADE');
    await knex('roles').insert([
        {role: 'Guest', active: true},
        {role: 'User', active: true},
        {role: 'Admin', active: true},
    ]);
};
