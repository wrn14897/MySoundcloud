/*
    Here we create store and apply middlewares
 */

import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //-> you can import thunk here as well
import app from './reducers';
// import {createLogger} from 'redux-logger';

import {createLogger} from './middlewares';


const configureStore = () => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production'){
        middlewares.push(createLogger);
    }
    return createStore(
        app, composeWithDevTools(
        applyMiddleware(...middlewares)
    ));
};
export default configureStore;
