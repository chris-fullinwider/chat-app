const socketEvents = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  CHANGE_USERNAME: 'CHANGE_USERNAME',
  USER_CONNECTED: 'USER_CONNECTED',
  GET_EXISTING: 'GET_EXISTING',
};

// using CommonJs to support node
module.exports = {
    socketEvents,
}