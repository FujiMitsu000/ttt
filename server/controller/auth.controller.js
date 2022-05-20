const knex = require('knex');
const { getHashPassword } = require('../utils/crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const config = require('../configs');
const { validationResult } = require('express-validator');
const { getUserByLogin } = require('./players.controller')

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
                .json({msg: `Пользователь c ником ${username} уже существует`})
        }

        const user = await db
            .into('users')
            .insert({
                username,
                password: getHashPassword(password),
                status: 'active',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .returning('id');
            console.log(user[0].id);
        await db
            .into('assigned_roles')
            .insert({
                user_id: user[0].id,
                role_id: 1
            });

        await db
            .into('sessions')
            .insert({
                user_id: user[0].id,
                token: jwt.sign({sub: user[0]}, 'qwerty'),
                expires_in: new Date().toISOString()
            });

    res.json(user[0]);
    },
    loginUser: async(req, res) => {
        const db = knex(config.development.database);
        const {username, password} = req.body;

        if (!username || !password) {
            res.sendStatus(400);

            return;
        }

        const [userExist] = await getUserByLogin(['username', 'password'], [{
            left: 'username',
            operator: '=',
            right: username
        }]);

        if (!userExist) {
            return res
                .status(400)
                .json({msg: `Пользователя c ником ${username} не существует`})
        }

        const token = await db
            .select('token')
            .from('sessions')
            .where({'user_id': userExist.id});

        res.json(response = {
            'userId': userExist.id, 
            'token': token[0].token
        });
    },
    createToken: async(req, res) => {
        const {username, password} = req.body;

        const [user] = await getUserByLogin(['username', 'password'], [{
            left: 'username',
            operator: '=',
            right: username
        }]);
        const isEqual = await bcrypt.compare(password, user.password);
        
        if (isEqual) {
            res
                .status(200)
                .json({token: jwt.sign({sub: user.id}, 'qwerty')});
        } else {
            return res
                .status(400)
                .json({msg: 'Неверный пароль'});
        }
    },
    getToken: async(req, res) => {
        const db = knex(config.development.database);
        const {userId} = req.params;

        const token = await db
            .select('token')
            .from('sessions')
            .where({'user_id': userId});

    res.json(token[0].token);
    },
    checkToken: async(req, res) => {
        const db = knex(config.development.database);
        const {userId, token} = req.body;
        console.log(req.body);
        console.log(req.body);
        if(!userId || !token) {
            res
            .status(400)
            .json({msg: 'token или userId отствуют'})
        }

        const tokenBd = await db
            .select('token')
            .from('sessions')
            .where({'user_id': userId});

        if (!tokenBd) {
            res
            .status(400)
            .json({msg: `Токен с userId:${userId} отсутсвует в бд`})
        }

        return res.json(token == tokenBd[0].token ? true : false);
    },
};