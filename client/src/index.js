import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
