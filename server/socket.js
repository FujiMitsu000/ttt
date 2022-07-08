const { TicTacToe } = require('./gameLogic/Tic Tac Toe.js')
const { computeUserId } = require("socket.io");

module.exports = (io) => {
    io.on('connection', async (socket) => {
        console.log('connection');
        
        
        // socket.on('user:get', getUser => {
        //     const players = []
        //     players.push(getUser);
            // console.log(socket.request.user);
            console.log(io.allSockets());
        // })

        // console.log(socket.server.eio.clients);

        const game = new TicTacToe(io);

        game.onConnection(socket);

        socket.emit('second-player', {userId: game.players[1].userId, name: game.players[1].name});










    //     onInit = async () => {
    //         setInterval(
    //           async () => {
    //             this.io.local.emit(
    //               'players:list',
    //               Object.values(await this.getPlayersList())
    //             );
    //           },
    //           2000
    //         );
    //       }

    //     getPlayersList = async () => Array.from(await io.fetchSockets())
    // .map((anotherSocket) => ({
    //   id: anotherSocket.data.id,
    //   login: anotherSocket.data.login,
    //   isFree: !Array.from(anotherSocket.operator?.rooms || anotherSocket.rooms)
    //     .some((key) => Boolean(key.match(/game#\d+/))),
    //   socketId: anotherSocket.id
    // }))
    // .reduce((players, {id, login, isFree, socketId}) => ({
    //   ...players,
    //   [id]: {
    //     id,
    //     login,
    //     isFree: (players[id]?.isFree || true) && isFree,
    //     socketIds: [...players[id]?.socketIds || [], socketId]
    //   }
    // }), {});
        
        
        // console.log(players);
        // const sockets = Array.from(io.sockets.sockets)

        console.log(io.engine.clientsCount); 
        
        // console.log(Array.from(await io.fetchSockets()));

        

        // for (const socket of sockets) {
        //     console.log(socket.data);
        // }
        // console.log(sockets[0].data);
        // console.log(socket.request.user);

        // for (const socket of test) {
        //     console.log(socket.data);
        // }

        // players.map(async player => {
        //     socket.data.username = player.username;
        //     socket.data.id = player.id;
        
        // });


        io.on('disconnect', () => {
            console.log('disconnected');
        }); 
    });
};

