import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import App from './App';
import Main from './Main'
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}/>
    <Route path="/:id" component={App}/>
  </Router>,
  document.getElementById('root')
);
