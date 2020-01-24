import io from "socket.io-client"
import { socketEvents } from '../constants'
/**
 * Sets up the chat socket
 *  - sets up listener for message updates
 * @param {function} setMessages sets messages in the UI
 */
export const setupChatSocket = (setMessages) => {

    let initialReceived = false;
    window.chatSocket = io.connect('http://localhost:9001');

    window.chatSocket.on(socketEvents.FULFILL_INITIAL, (messages) => {
        // only update for this event if you haven't done so already
        if (!initialReceived) {
            initialReceived = true;
            setMessages(messages);
        }
    });

    window.chatSocket.on(socketEvents.MESSAGES_UPDATED, (messages) => {
        setMessages(messages);
    });

    window.chatSocket.emit(socketEvents.REQUEST_INITIAL);
};