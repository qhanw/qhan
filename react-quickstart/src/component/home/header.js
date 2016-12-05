/**
 * Created by Wang QiHan on 2016/11/30.
 */

import React, {Component} from 'react';
import logo from '../../../public/logo.svg';
const names = ['Alice', 'Emily', 'Kate'];

class Header extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reloaddsd.
        </p>
        <div className="router-list">
          <h1>App</h1>
          <div className="example">
            {
              names.map(function (name) {
                return <span key={name}>Hello, {name}!</span>;
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Header

