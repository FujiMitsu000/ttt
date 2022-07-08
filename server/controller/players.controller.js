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
    getUserByUsername: async(username) => {
        const db = knex(config.development.database);
        const query = await db
            .select({
                id: 'id',
                username: 'username',
                password : 'password',
                status: 'status',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            })
            .from('users')
            .where({'status': 'active'})
            .andWhere('username', '=', username);
            // console.log(query);
        return await query;
    },
    getUserById: async(userId) => {
        const db = knex(config.development.database);
        const query = await db
            .select({
                id: 'id',
                username: 'username',
                status: 'status',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            })
            .from('users')
            .where({'status': 'active'})
            .andWhere('id', '=', userId);
        
        return await query;
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
        .from('users')
        .where({'id': userId, 'status': 'active'});

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

        const [userExist] = await getUserByUsername(username);

        if (userExist) {
            return res
                .status(400)
                .json({msg: `Пользователя c ником ${username} уже существует`})
        }

        const [user] = await db
            .into('users')
            .insert({
                username,
                password: getHashPassword(password),
                status,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .returning('id');
            console.log(user.id);
        const [roleId] = await db
            .into('assigned_roles')
            .insert({
                user_id: user.id,
                role_id: 1
            })
            .returning('role_id');
            console.log(roleId);
        const [userRole] = await db
            .into('roles')
            .select({
                role: 'role'
            })
            .where({'id': roleId.role_id})
            .returning('role');
        await db
            .into('tokens')
            .insert({
                user_id: user.id,
                token: jwt.sign({sub: {userId: user.id, userRole: userRole.role}}, 'meow'),
                // expires_in: new Date().toISOString()
            });

    res.json({msg: `Пользователь с ником ${username} успешно создан`});
    },
    updateUserPassword: async (req, res) => {
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
        }
    },
    updateUserStatus: async(req, res) => {
        const {username} = req.body;
        const db = knex(config.development.database);

        const {blockedUser} = await db
        .first({blockedUser: 'status'})
        .from('users')
        .where({username: username})

        if (!blockedUser) {
            res.json({msg: `Пользователя с ником ${username} нет в базе`});

            return;
        } else if (blockedUser === 'active') {
            res.json({msg: `Пользователь ${username} уже имеет статус "active"`});

            return;
        } else if (blockedUser === 'blocked') {
            await db
            .from('users')
            .update({
                status: 'active',
                updated_at: new Date().toISOString()
            })
            .where({username: username})
            
            res.json({msg: 'Статус обновлен'});

            return;
        } else {
            res.sendStatus(400);
        }
    },
    blockUser: async (req, res) => {
        const {username} = req.body;
        const db = knex(config.development.database);
        console.log(req.body);
        const {blockedUser} = await db
            .first({blockedUser: 'status'})
            .from('users')
            .where({username: username})
        
        if (blockedUser === 'blocked') {
            res.json({msg: `Пользователь ${username} уже заблокирован`});

            return;
        }

        await db
            .from('users')
            .update({
                status: 'blocked',
                updated_at: new Date().toISOString()
            })
            .where({username: username})
        
            res.json({msg: `Пользователь ${username} заблокирован`});
    }
}
