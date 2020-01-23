import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import { socketEvents } from '../constants';

const message = {
  id: null,
  text: null,
  username: null,
}

function App() {

  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // set the listener only on mount
  }, [])

  const onSignIn = (evt) => {
    evt.preventDefault();
    const username = evt.target.querySelector('#username').value; // I would normally do better null checking

    // all of this socket set up and listening is probably prone to race conditions
    window.chatSocket = io('http://localhost:9001');
    window.chatSocket.emit(
      socketEvents.CHANGE_USERNAME,
      { username }
    );

    window.chatSocket.on(socketEvents.NEW_MESSAGE, (newmessages) => {
      setMessages(newmessages); 
    })

    window.chatSocket.emit(socketEvents.GET_EXISTING)

    window.chatSocket.on(socketEvents.GET_EXISTING, (existingMessages) => {
      setMessages(existingMessages); 
    })

    setUsername(username)
  };

  const onMessageSend = (evt) => {
    evt.preventDefault();
    const outgoingMessage = evt.target.querySelector('#outgoing-message').value; // I would normally do better null checking
    window.chatSocket.emit(
      socketEvents.NEW_MESSAGE,
      {
        username,
        text: outgoingMessage,
      }
    );
  };

  return (
    <main className="App">
      <header>Check out this sweet header</header>
      {
        !username && (
          <form onSubmit={onSignIn}>
            <label htmlFor="username">Please type in a username to Sign in:</label>
            <input id="username"></input>
            <button type="submit">Sign In</button>
          </form>
        )
      }
      {
        username && (
          <section className="chat">
            <h3>{username}: logged in</h3>

            <div className="chat__container">
              <div className="chat__controls">
                <form onSubmit={onMessageSend}>
                  <input id="outgoing-message"></input>
                  <button type="submit" className="chat_send"> Send </button>
                </form>
              </div>

              <div className="chat__messages">
                {messages.map((message, i) => {
                  return (
                    <p key={`message-${i}`}>{message.text}</p>
                  )
                })} 
              </div>

            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
