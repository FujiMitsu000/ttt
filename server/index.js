const express = require('express');
const session = require('express-session')
const passport = require('passport');
const strategy = require('./passport/passport-strategy')
const config = require('./configs');
const routes = require('./routes/index.routes')
const { handler } = require('./middlewares/errorHandler');
const { loginUser, createToken, registrationUser } = require('./controller/auth.controller');
const { catcher } = require('./utils/catcher');
const { Server } = require("socket.io");
const { createServer } = require("http");
const { getUser } = require('./controller/players.controller');
const flash = require('express-flash');
const { auth, authToken } = require('./middlewares/isAuth');


const PORT = config[process.env.NODE_ENV || 'development'].server.port;

const app = express();

const httpServer = createServer(app);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

passport.use(strategy)

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/../public', {index: false}));
app.use(passport.initialize());
// app.use('/api', passport.authenticate('jwt', {session: false}), routes);
app.post('/login', catcher(loginUser));
app.post('/registration', catcher(registrationUser));

passport.serializeUser((user, done) => {
    console.log('serializing user: ', user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const [user] = await getUserById(id);
    if (user.id === id) {
        console.log('deserializing user: ' + id);
        done(null, user);
    }
});

app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile('/frontend/public/index.html', {root: __dirname + '/..'});
});
// app.use(handler);




const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:8000"],
        methods: ['GET', 'POST'],
    }
});

require('./socket.js')(io);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(passport.initialize()));
io.use(wrap(passport.authenticate(('jwt', {session: false}, null))));
io.use((socket, next) => {
    console.log(socket.request.user);
    if (socket.request.user) {
        // socket.data.id = socket.request.user.id;
        // socket.data.login = socket.request.user.login;
        next();
    } else {
        console.log('нет ответа');
    }
});

async function startApp() {
    try {
        httpServer.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp();
