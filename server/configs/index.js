module.exports = {
    development: {
        server: {
            port: 8000
        },
        database: {
            client: 'postgresql',
            connection: {
                database: 'ttt',
                user:     'postgres',
                password: '12Gens',
                host: 'localhost',
                port: 5432,
            },
            migrations: {
                tableName: 'migrations',
                directory: './db/migrations'
            },
            seeds: {
                directory: './db/seeds'
            }
        }
    }
};
