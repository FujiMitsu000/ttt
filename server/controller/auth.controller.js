const knex = require('knex');
const { getHashPassword } = require('../utils/crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const config = require('../configs');
const { validationResult } = require('express-validator');
const { getUserByLogin, getUserByUsername } = require('./players.controller')

module.exports = {
    registrationUser: async(req, res) => {
        const db = knex(config.development.database);
        const {username, password} = req.body;
        const registrationErrors = validationResult(req);

        if(!registrationErrors.isEmpty()) {
            return res
                .status(400)
                .json({registrationErrors})
        }
        console.log(req.body);

        const [userExist] = await getUserByLogin(['username', 'password'], [{
            left: 'username',
            operator: '=',
            right: username
        }]);

        if (userExist) {
            
            return res
                .status(400)
                .json({registrationErrors: {errors: [{msg: `Пользователь c ником ${username} уже существует.`}]}})
        }

        await db
            .into('users')
            .insert({
                username,
                password: getHashPassword(password),
                status: 'active',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .returning('id');

        await db
            .into('assigned_roles')
            .insert({
                user_id: user.id,
                role_id: 1
            })
            .returning('role_id');

    res.json([{msg: 'Регистрация прошла успешно!'}, {msg: 'Нажмите "Вход"'}]);
    },
    loginUser: async(req, res) => {
        const db = knex(config.development.database);
        const {username, password} = req.body;

        if (!username || !password) {
            res.sendStatus(400);

            return;
        }

        const [userExist] = await getUserByUsername(username);

        if (!userExist) {
            return res
                .status(400)
                .json({msg: `Пользователя c ником ${username} не существует`})
        }

        // const [token] = await db
        //     .select('token')
        //     .from('sessions') /////////////////
        //     .where({'user_id': userExist.id});

        const [userId] = await db
            .select('id')
            .from('users')
            .where({'username': username})
            console.log(userId);
        const [roleId] = await db
            .select('role_id')
            .from('assigned_roles')
            .where({'user_id': userId.id})
            console.log(roleId);
        const [userRole] = await db
            .into('roles')
            .select({
                role: 'role'
            })
            .where({'id': roleId.role_id})
        // await db
        //     .into('sessions') //////////////
        //     .insert({
        //         user_id: user.id,
                
        //         // expires_in: 3600
        //     });

        res.json(response = {
            'token': jwt.sign({sub: {id: userId.id, username, userRole: userRole.role}}, 'meow'),
        });
    },
    createToken: async(req, res) => {
        const {username, password} = req.body;
        // console.log(req.body);
        const [user] = await getUserByLogin(['username', 'password'], [{
            left: 'username',
            operator: '=',
            right: username
        }]);
        // console.log(user.password);
        const isEqual = await bcrypt.compare(password, user.password);
        
        if (isEqual) {
            return res
                .status(200)
                .json({token: jwt.sign({sub: user.id}, 'meow')});
        } else {
            return res
                .status(400)
                .json({msg: 'Неверный пароль'});
        }
    },
    getToken: async(req, res) => {
        const db = knex(config.development.database);
        const {userId} = req.params;

        const [token] = await db
            .select('token')
            .from('tokens')
            .where({'user_id': userId});

    res.json(token.token);
    },
    checkToken: async(req, res) => {
        const db = knex(config.development.database);
        const {userId, token} = req.body;
        console.log(req.body);

        if(!userId || !token) {
            res
            .status(400)
            .json({msg: 'token или userId отствуют'})
        }

        const [tokenDb] = await db
            .select('token')
            .from('tokens')
            .where({'user_id': userId});

        if (!tokenDb) {
            res
            .status(400)
            .json({msg: `Токен с userId:${userId} отсутсвует в бд`})
        }

        return res.json(token == tokenDb.token ? true : false);
    },
};