import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducers from './reducers';
import { createLogger} from 'redux-logger';
import {createStore , applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import {GoogleOAuthProvider} from '@react-oauth/google'

const store = createStore(reducers,applyMiddleware(thunk));
console.log(store);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    <GoogleOAuthProvider clientId="313931600279-oektlp3bdru0q78p5vgjc4dbg97cc469.apps.googleusercontent.com">
    <Provider store={store}>
      <App/>
    </Provider>
    </GoogleOAuthProvider>
    

   
  </React.StrictMode>
);

