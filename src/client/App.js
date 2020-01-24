import React, { useState, useRef, useEffect } from 'react';

import './App.scss';
import { socketEvents } from '../constants';
import { setupChatSocket } from './chatSocket'

function App() {

  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null)

  useEffect(() => {
    // keep the message container scrolled to the bottom
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollTop = current.scrollHeight - current.clientHeight;
    }
  }, [messages]);

  /**
   * "signs" the user in and sets up the websocket connection
   *  - should only ever run ONCE per session
   * @param {object} evt form submit event
   */
  const onSignIn = (evt) => {
    evt.preventDefault();
    const { target } = evt

    if(!target || username) {
      return;
    };

    const newUsername = target.querySelector('#username').value;

    // TODO: add a check that the username doesn't exist
    if (!newUsername || newUsername.length < 3 || newUsername.length > 10) {
      // alert() does weird things, apologies for the hideous indentation
      alert(`
ha, sike.\n
you can't sign in uless you provide a username.\n
it needs to be at least three and no more than 10 characters
      `)
      return;
    };

    setupChatSocket(setMessages);
    setUsername(newUsername);
  };

  /**
   * dispatches a new message to the socket
   *  - clears input afterwards
   * @param {object} evt form submit event
   */
  const onMessageSend = (evt) => {
    evt.preventDefault();
    const { target } = evt;

    if (!target) {
      console.log("something wen't wrong")
      return;
    }

    const input = target.querySelector('#outgoing-message');
    const outgoingMessage = input.value;

    if (!outgoingMessage) {
      return;
    };

    window.chatSocket.emit(
      socketEvents.POST_NEW_MESSAGE,
      {
        username,
        text: outgoingMessage,
      },
    );

    input.value = ''
  };

  /**
   * allow users to send messages by pressing 'enter'
   *  - warning: jank approaching
   * @param {object} evt keydown event
   */
  const onMessageKeyDown = (evt) => {
    const { target } = evt;
    if (evt.which === 13) {
      target.previousSibling.click(); // kind of icky, but gets the job done
      evt.preventDefault(); // prevents cursor from going to next line
    }
  }
  
  return (
    <main className="app">
      <header>
        <h1>check out this chat app</h1>
      </header>

      { !username && (
          <form className="sign-in" onSubmit={onSignIn}>
            <label htmlFor="username">please type in a username to sign in:</label>
            <input id="username"></input>
            <button>sign in</button>
          </form>
        )
      }

      { username && (
          <section className="chat">
            <h3>logged in as - {username}</h3>

              <div ref={scrollRef} className="messages">

                { messages.map((message, i) => {

                  const alignment = message.username === username? 'left' : 'right';

                  return (
                    <div className={`message ${alignment}`} key={`message-${i}`}>

                      { alignment === 'left' && (
                        <span className="badge badge-left"> You </span>
                      )}

                      <span className="message-text">{message.text}</span>

                      { alignment === 'right'  && (
                        <span className="badge badge-right">
                          {message.username}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              <section className="controls">
                <form onSubmit={onMessageSend}>
                  <button className="chat_send">send</button>
                  <textarea
                    id="outgoing-message"
                    style={{ resize: 'none'}}
                    onKeyDown={onMessageKeyDown}
                  />
                </form>
              </section>

          </section>
        )
      }
    </main>
  );
}

export default App;
