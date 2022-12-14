import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userReducer } from './reducers/UserReducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const reducer = combineReducers({ userReducer })
const store = configureStore({ reducer }, composeWithDevTools())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
