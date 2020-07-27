import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMidlleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

import reducers from './reducers'

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const persistConfig = {
  key:'loggedUser',
  storage:storage,
  whitelist:['loggedUser']
}

const pReducer = persistReducer(persistConfig,reducers);

const middleware = applyMiddleware(promiseMidlleware,reduxThunk);
const store = createStore(pReducer,middleware);
const persistor = persistStore(store)

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Router history={browserHistory}>
              <Routes />
            </Router>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}
