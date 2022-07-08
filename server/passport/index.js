const { getUserById } = require('../controller/players.controller');
const login = require('./login');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ', user);
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        const [user] = await getUserById(id);
        if (user.id === id) {
            console.log('deserializing user: ' + id);
            done(null, user);
        }
    });

    login(passport);
}