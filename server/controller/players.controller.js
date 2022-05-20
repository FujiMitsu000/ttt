const { sendStatus } = require('express/lib/response');
const knex = require('knex');
const { getHashPassword } = require('../utils/crypto');
const config = require('../configs');

module.exports = {
    getUserByLogin: async(fields, filters) => {
        for (const filter of filters) {
            const db = knex(config.development.database);
            const query = await db
                .select(Array.from(new Set([...fields, 'id'])))
                .from('users')
                .where({'status': 'active'})
                .orderBy('id')
                .andWhere(filter.left, filter.operator, filter.right);
                
            return await query;
        }
    },
    getUsers: async(req, res) => {
        const db = knex(config.development.database);
        const users = await db
        .select({
            id: 'id',
            username: 'username',
            status: 'status',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
        .from({u: 'users'})
        // .where({'u.status': 'active'})
        .orderBy('id')

    res.json(users);
    }, 
    getUser: async(req, res) => {
        const {userId} = req.params;
        const db = knex(config.development.database);
        const user = await db
        .select({
            username: 'username',
            status: 'status',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
        .from({u: 'users'})
        .where({'u.id': userId, 'u.status': 'active'})

        if (!user) {
            res.sendStatus(400);

            return;
        }

    res.json(user);
    },
    // getUserId: async(req, res) => {
    //     const {username} = req.body;
    //     const db = knex(config.development.database);
    //     const user = await db
    //     .select({
    //         username: 'username',
    //         status: 'status',
    //         createdAt: 'created_at',
    //         updatedAt: 'updated_at'
    //     })
    //     .from({u: 'users'})
    //     .where({'u.id': userId, 'u.status': 'active'})

    //     if (!user) {
    //         res.sendStatus(400);

    //         return;
    //     }

    // res.json(user);
    // },
    createUser: async (req, res) => {
        const db = knex(config.development.database);
        const {username, password, status = 'active'} = req.body;

        if (!username || !password) {
            res.sendStatus(400);

            return;
        }

        const user = await db
            .into('users')
            .insert({
                username,
                password: getHashPassword(password),
                status,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

    res.json({user});
    },
    updateUser: async (req, res) => {
        const {userId} = req.params;
        const {password} = req.body;
        const db = knex(config.development.database);
    
        const {blockedUser} = await db
        .first({blockedUser: 'status'})
        .from('users')
        .where({id: userId})

        if (password && blockedUser === 'active') {
            await db
            .from('users')
            .update({
                password: getHashPassword(password),
                updated_at: new Date().toISOString()
            })
            .where({id: userId})
            
            res.sendStatus(200);

            return;
        } else if (!newPassword && blockedUser === 'blocked') {
            await db
            .from('users')
            .update({
                status: 'active',
                updated_at: new Date().toISOString()
            })
            .where({id: userId})
            
            res.sendStatus(200);

            return;
        } else {
            res.sendStatus(400);
        }
    },
    deleteUser: async (req, res) => {
        const {userId} = req.params;
        const db = knex(config.development.database);
        
        const {blockedUser} = await db
            .first({blockedUser: 'status'})
            .from('users')
            .where({id: userId})
        
        if (blockedUser === 'blocked') {
            res.sendStatus(400);

            return;
        }

        await db
            .from('users')
            .update({
                status: 'blocked',
                updated_at: new Date().toISOString()
            })
            .where({id: userId})
        
        res.sendStatus(200);
    }
}
