const express = require('express');

const app = express();
const { socketEvents } = require('./constants')

// init the server
const server = app.listen(9001, () => {
    console.log("listening on port 9001")
});

// init the websocket
const io = require("socket.io")(server);

// store messages
let messages = [];

// create connection handler
io.on('connection', (socket) => {
    console.log("New Connection");

    // handle request for initial messages
    socket.on(socketEvents.REQUEST_INITIAL_MESSAGES, () => {
        // emit to the connection that made the request
        socket.emit(
            socketEvents.FULFILL_INITIAL_MESSAGES,
            messages,
        );
    });

    // handle incoming new message
    socket.on(socketEvents.POST_NEW_MESSAGE, (message) => {
        // message "manager"
        messages.push(message);

        // emit updated messages to all connections
        io.sockets.emit(
            socketEvents.MESSAGES_UPDATED,
            messages,
        );
    });
});