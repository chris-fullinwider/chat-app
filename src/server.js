const express = require('express');
const app = express();

const { socketEvents } = require('./constants')

const server = app.listen(9001, () => {
    console.log("listening on port 9001")
});

const io = require("socket.io")(server);

let messages = [];

io.on('connection', (socket) => {
    console.log("New Connection")

    socket.on( socketEvents.POST_NEW_MESSAGE, (message) => {
        // message "manager"
        messages.push(message);

        // emit to all connections
        io.sockets.emit(
            socketEvents.MESSAGES_UPDATED,
            messages,
        );
    })

    socket.on(socketEvents.REQUEST_INITIAL, () => {
        // emit to one connection
        socket.emit(
            socketEvents.FULFILL_INITIAL,
            messages
        );
    });
});