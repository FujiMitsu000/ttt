const { Router } = require('express');
const { catcher } = require('../utils/catcher');
const { check } = require('express-validator');
const { 
    registrationUser,
    loginUser,
    getToken,
    checkToken
} = require('../controller/auth.controller');


const router = Router();

router.post('/registration', [
    check('username', 'Никнейм должен состоять минимум из 3 символов').isLength({min:3}), 
    check('password', 'Пароль должен быть не меньше 6 символов').isLength({min:6})], catcher(registrationUser));
router.post('/login', catcher(loginUser));
router.post('/token', catcher(checkToken));
router.get('/token/:userId', catcher(getToken));

module.exports = router;