const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require('socket.io');
const io = new Server(server);

const Game = require('./game');
const game = new Game(19, 19);

let userCount = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    userCount+=1;
    console.log(socket.userId = userCount);
    socket.join('some room');
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('resetGame', () => {
        game.setupGame();
        io.emit('resetGame');
    });

    socket.on('playerTurn', (coords) => {
        if (game.validMove(coords, socket.userId)) {
            console.log(game.grid);
            winner = game.checkWin();
            console.log(winner);
            if (!winner) io.emit('playerTurn', coords, socket.userId);
            else io.emit('playerWin', coords, socket.userId);
        }
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});