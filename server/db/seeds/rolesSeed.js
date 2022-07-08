/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async(knex) => {
    await knex.raw('TRUNCATE TABLE roles RESTART IDENTITY CASCADE');
    await knex('roles').insert([
        {role: 'User', active: true},
        {role: 'Admin', active: true},
    ]);
};
