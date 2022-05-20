const { sendStatus } = require('express/lib/response');
const knex = require('knex');
const config = require('../configs');

module.exports = {
    getGames: async (req, res) => {
        const db = knex(config.development.database);
        const games = await db
            .select({
                id: 'g.id',
                winner: 'g.winner',
                createdAt: 'g.created_at',
                finishedAt: 'g.finished_at',
                playerOne: 'u1.username',
                playerTwo: 'u2.username'
            })
            .from({g: 'games_results'})
            .leftJoin({p1: 'players_games'}, {'g.id': 'p1.game_id', 'p1.number': 1})
            .leftJoin({u1: 'users'}, {'p1.user_id': 'u1.id'})
            .leftJoin({p2: 'players_games'}, {'g.id': 'p2.game_id', 'p2.number': 2})
            .leftJoin({u2: 'users'}, {'p2.user_id': 'u2.id'})
            .where({'g.deleted_at': null});

        res.json(games);
    },
    getGame: async (req, res) => {
        const {gameId} = req.params;
        const db = knex(config.development.database);
        const game = await db
            .first({
                id: 'g.id',
                winner: 'g.winner',
                createdAt: 'g.created_at',
                finishedAt: 'g.finished_at',
                playerOne: 'u1.username',
                playerTwo: 'u2.username'
            })
            .from({g: 'games_results'})
            .leftJoin({p1: 'players_games'}, {'g.id': 'p1.game_id', 'p1.number': 1})
            .leftJoin({u1: 'users'}, {'p1.user_id': 'u1.id'})
            .leftJoin({p2: 'players_games'}, {'g.id': 'p2.game_id', 'p2.number': 2})
            .leftJoin({u2: 'users'}, {'p2.user_id': 'u2.id'})
            .where({'g.id': gameId, 'g.deleted_at': null});

            if (!game) {
                res.sendStatus(400);

                return;
            }

        res.json(game);
    },
    createGame: async (req, res) => {
        const db = knex(config.development.database);
        const {userIds, size = 3} = req.body;

        if (!userIds || userIds.length !== 2) {
            res.sendStatus(400);

            return;
        }

        const [{id: gameId}] = await db    
            .into('games_results')
            .insert([{
                size
            }])
            .returning('id');

        await db    
            .into('players_games')
            .insert(userIds.map(
                (userId, idx) => ({
                    user_id: userId,
                    game_id: gameId,
                    number: idx +1
                })
            ));
        
        res.json({gameId});
    },
    updateGame: async (req, res) => {
        const {gameId} = req.params;
        const db = knex(config.development.database);

        const {deletedAt} = await db
            .first({deletedAt: 'deleted_at'})
            .from('games_results')
            .where({id: gameId})

        if (deletedAt) {
            res.sendStatus(400);

            return;
        }

        const {winner} = req.body;

        if (!winner) {
            res.sendStatus(400);

            return;
        }
        
        await db
        .from('games_results')
        .update({
            winner,
            finished_at: new Date().toISOString()
        })
        .where({id: gameId});
    
    res.sendStatus(200);
    },

    deleteGame: async (req, res) => {
        const {gameId} = req.params;
        const db = knex(config.development.database);

        const {finishedAt} = await db
            .first({finishedAt: 'finished_at'})
            .from('games_results')
            .where({id: gameId})

        if (finishedAt) {
            res.sendStatus(400);

            return;
        }

        await db
            .from('games_results')
            .update({
                deleted_at: new Date().toISOString()
            })
            .where({id: gameId})
        
        res.sendStatus(200);
    }
};