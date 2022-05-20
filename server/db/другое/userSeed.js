/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await knex('users').insert([
    {id: 1, login: 'redf@fdf.ty', password: 'dsadf', status: 'active'},
    {id: 2, login: 'vbc@fgh.ty', password: 'sdfer', status: 'active'},
    {id: 3, login: 'bvcbf@jjf.ty', password: 'sdfxfvb', status: 'active'},
    {id: 4, login: 'fggf@gg.ty', password: 'cxbfg', status: 'active'},
    {id: 5, login: 'ldxa@gqe.ty', password: 'hmbncm', status: 'active'},
    {id: 6, login: 'xczxc@gf.ru', password: 'zcvbkl', status: 'active'},
    {id: 7, login: 'gjfj@gf.ru', password: 'vcbnfgh', status: 'active'},
    {id: 8, login: 'bmggp@ty.ru', password: 'xnghjg', status: 'active'}
  ]);
};
