/*
    Here we create store and apply middlewares
 */


import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import app from './reducers';
import {createLogger} from 'redux-logger';

const thunkMiddleware = ({dispatch, getState}) => (next) => (action) =>{
    return typeof action === 'function' ?
           action(dispatch, getState) : next(action);
}


const configureStore = () => {
    const middlewares = [thunkMiddleware];
    if (process.env.NODE_ENV !== 'production'){
        middlewares.push(createLogger());
    }
    return createStore(
        app, composeWithDevTools(
        applyMiddleware(...middlewares)
    ));
};
export default configureStore;
