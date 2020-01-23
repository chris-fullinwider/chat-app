const express = require('express');
const { socketEvents } = require('../constants');
const app = express();

app.get('/', (req, res) => {
    // send profiles when / called
    res.send('PROFILES');
});

app.post('/login', (req, res) => {
    // log user in with some profile id
})

app.post('/logout', (req, res) => {
    // log user out of some profile id
})

const server = app.listen(9001, () => {
    console.log('listening on port 9001');
});

const io = require("socket.io")(server);

const messages = [];

io.on('connection', (socket) => {
    console.log("USER CONNECTED")

    // sync any new users
    // TODO: this is probably more trouble than it's worth right now
    socket.on(socketEvents.GET_EXISTING, () => {
        console.log('get existing messages', messages.length);
        io.sockets.emit(socketEvents.GET_EXISTING, messages);
    })

    socket.on(socketEvents.CHANGE_USERNAME, (data) => {
        console.log('username changed to: ', data.username)
        socket.username = data.username;
    });

    socket.on(socketEvents.NEW_MESSAGE, (message) => {
        console.log("message sent from: ", message.username);
        messages.push(message);

        io.sockets.emit(
            socketEvents.NEW_MESSAGE,
            messages,
        )
    })
})