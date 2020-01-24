const socketEvents = {
  POST_NEW_MESSAGE: 'POST_NEW_MESSAGE',
  MESSAGES_UPDATED: 'MESSAGES_UPDATED',
  REQUEST_INITIAL: 'REQUEST_INITIAL',
  FULFILL_INITIAL: 'FULFILL_INITIAL',
};

// using CommonJs to support node
module.exports = {
    socketEvents,
}