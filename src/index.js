import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/custom.less'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './store/reducers/auth';
import { Helmet } from 'react-helmet';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


const TITLE = 'EZtrade'
const composeEnhances = compose;
const store = createStore(reducer, composeEnhances(
  applyMiddleware(thunk)
));

const app = (

  <Provider store={store}>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();