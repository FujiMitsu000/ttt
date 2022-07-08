const { checkToken } = require("../controller/auth.controller");
const { parseJwt } = require('../utils/parseJWT');


const authToken = (req, res, next) => {
    console.log(req.headers.authorization);

    const token = req.headers.authorization

    if (!token) {
        return res.json({msg: 'Токен не был отправлен'})
    }

    const userId = parseJwt(token);
    console.log(userId);
    
    // if (condition) {
        
    // checkToken
    // }
}


const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect('/')
    }
};

module.exports = {auth, authToken};