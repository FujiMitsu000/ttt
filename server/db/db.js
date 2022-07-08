const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: '12Gens',
    host: 'localhost',
    port: 5432,
    database: 'ttt' /////////////
});

module.exports = pool;