const { Server } = require("socket.io");
const { createServer } = require("http");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://localhost:8000"],
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('connection');
    io.emit('hello', 'Привет');

    socket.on("playerMove", (arg1) => {
        
        console.log(arg1);

        socket.broadcast.emit('aaa', arg1);
    });

    io.on('disconnect', () => {
        console.log('disconnected');
    }); 
});


async function startSocket() {
    try {
        httpServer.listen(3000, () => console.log("SOCKET STARTED ON PORT " + 3000))
    } catch (e) {
        console.log(e)
    }
}


module.exports = startSocket;


// io.on("connection", (socket) => {
//     socket.on("update item", (arg1, callback) => {
//       console.log(arg1); // 1
//       callback({
//         status: arg1
//       });
//     });
//   });