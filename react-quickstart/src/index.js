import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory  } from 'react-router';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reduxApp from './redux/reducers'
import Routers from './router';

let store = createStore(reduxApp);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory } routes={Routers} />
  </Provider>,
    document.getElementById('root')
);
