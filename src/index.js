import React from 'react';
import ReactDOM from 'react-dom';
import jwt from "jsonwebtoken";
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import setTokenToHeaders from "./auth/setTokenToHeaders";
import { configureStore } from './redux/store';
import {logoutUser} from "./redux/auth/actions";

export const store = configureStore();

if (localStorage.token) {
    setTokenToHeaders(localStorage.token);
    const decodedToken = jwt.decode(localStorage.token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        store.dispatch(logoutUser());
    }
} else {
    // configureStore().dispatch(logoutUser());
}


ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
