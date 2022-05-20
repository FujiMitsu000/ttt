const express = require('express');
const passport = require('passport');
const strategy = require('./utils/passport-strategy');
const config = require('./configs');
const startSocket = require('./socket')
const routes = require('./routes/index.routes')
const { handler } = require('./middlewares/errorHandler');
const { createToken } = require('./controller/auth.controller');
const { catcher } = require('./utils/catcher');


const PORT = config[process.env.NODE_ENV || 'development'].server.port;

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

passport.use(strategy);

app.use(express.json());
app.use(express.static(__dirname + '/../public', {index: false}));
app.use(passport.initialize());
app.use('/api', passport.authenticate('jwt', {session: false}), routes);
// app.use('/api', routes);
app.post('/token', catcher(createToken));
// app.get(
//     '/',
//     passport.authenticate('jwt', {session: false}),
//     (req, res) => res.status(200).end()
// );
app.get('*', (req, res) => {
    res.sendFile('/public/index.html', {root: __dirname + '/..'});
});
// app.use(handler);

async function startApp() {
    try {
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp();
startSocket();
