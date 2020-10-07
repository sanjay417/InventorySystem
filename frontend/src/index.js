import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import thunk from 'redux-thunk';
import { setItemViewCount } from './redux/actions/itemsActions';
import { insertMessage } from './redux/actions/homePageActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const ws = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');
console.log('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');
// const ws = new WebSocket('ws://localhost:5000/websocket');
const store = createStore(rootReducer, applyMiddleware(thunk));

ws.onclose = () => {
  console.log("Connection to server Closed")
}
ws.onmessage = (mesage) => {
  const messageObject = JSON.parse(mesage.data)
  console.log("Message from the server");
  console.log(messageObject);
  switch (messageObject.type) {
    case 'UPDATE_USER_COUNT':
      console.log("Index.Js" + mesage.data)
      store.dispatch(setItemViewCount(messageObject.id, messageObject.count, store.getState().itemsReducer.items))
      break;
    case 'UPDATE_MESSAGE':
      store.dispatch(insertMessage(messageObject.notificationMessage))
      break;
    default:
      console.log("No Default Message Handler")

  }
}
ws.onerror = (e) => {
  console.log("error" + e)
}
ws.onopen = () => {
  console.log("Connection to server Opened")
}
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App ws={ws}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
