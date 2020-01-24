This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Requirements
1. node version 8+
2. yarn or npm

### Using the Chat App
1. open a terminal window and clone the repository
2. `cd chat-app` (or whatever directory name you used when cloning)
3. run `yarn install` or `npm install` to install dependencies
4. run `yarn start` or `npm start` to initialize:
	* The client on port 3000
	* The server on port 9001
5. open up multiple browsers to `http://localhost:3000`
6. complete the sign in steps and have a chat with yourself ;)

### About:
- technologies used:
    - react (with `create-react-app`)
    - nodejs (with `express`)
    - web sockets (with `socket.io`)
    - sass (.scss)
- design considerations during development:
    - pub-sub
    - a server that:
        - opens a websocket for clients to connect with
        - listens for new incoming messages from connected clients
        - manages the messages state for the session
        - emits message updates to any connected client in real-time
    - a client that:
        - allows a user to "sign in"
        - opens a connection to the express server's websocket
        - listens for message updates from the websocket
        - emits new messages to the websocket
        - renders messages real-time
        - The UI should be simple and snappy
- things I would do if I had more time:
    - frontend:
        - to accomodate further development scope, "componentize" relevent UI sections for the following selectors:
            - .sign-in
            - .chat
            - .messages
            - .message
            - .badge
            - .controls
        - loading states
        - probably a useContext() or useReducer() to make message state interactions portable
        - better transitions from sign-in to viewing the chat
        - transitions when messages pop in
    - backend:
        - use some relational db to store and manage messages/users/rooms/chat_histories/etc...
    - both
        - unit tests
        - a more robust login procedure that does things like:
			- prevent users from creating a username that already exists
            - password login
            - actual user creation
		- deployment so the app is usable outside of a local dev environment
        - the ability to persist chat histories
        - create private rooms
        - invite people to rooms
        - read receipts
        - `...{user} is typing`
        - CORS
        - security (all of it)
        - emojis
        - etc...
        - (there's a very long list)

## Create React App Stuff

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
