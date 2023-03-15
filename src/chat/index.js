const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const chat = () => {
    app.use(express.static('public/pages'));

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/pages/index.html');
    });

    io.on('connection', (socket) => {
        console.log('A user connected.');

        socket.on('disconnect', () => {
            console.log('A user disconnected.');
        });

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });
    });

    http.listen(3000, (err) => {
        if (err) {
            console.log('Chat: ', err.message);
        } else {
            console.log('Chat: http://localhost:3000');
        }
    });
}

module.exports = chat
