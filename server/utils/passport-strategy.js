const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { getUserByLogin } = require('../controller/players.controller')

const strategy = new Strategy(
    {
        secretOrKey: 'qwerty',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (payload, done) => {
        try {
            const [user] = await getUserByLogin(['id', 'username', 'password'], [{
                left: 'u.id',
                operator: '=',
                right: payload.sub
            }]);


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