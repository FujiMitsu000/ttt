const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { getUserByLogin, getUserByUsername } = require('../controller/players.controller');

const strategy = new Strategy(
    {
        secretOrKey: 'meow',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (payload, done) => {
        try {
            console.log(payload);

            const [user] = await getUserByUsername(payload.sub.username);

            if(user) {
            console.log('test');

                done(null, user);
            } else {
                done(null, false);
            }
        } catch(err) {
            done(err, false);
        }
    }
);

module.exports = strategy;


// module.exports = function(passport){

//     passport.use('login', new LocalStrategy({
//         passReqToCallback: true
//         },
//         async function(req, username, password, done) {
//             try {
//                 const [user] = await getUserByUsername(username);
//                 if (!user) {
//                     console.log('нет юзера');
//                     return done(null, false, {msg: `Пользователя с ником ${username} не существует`})
//                 }
//                 if (!isValidPassword(user, password)) {
//                     console.log('пароль неверен');
//                     return done(null, false, {msg: `Неверный пароль`})
//                 }

//                 return done(null, user)
//             } catch (error) {
//                 console.log(error, 'LocalStrategy');
//             }
//         }
        
//     ))
// }