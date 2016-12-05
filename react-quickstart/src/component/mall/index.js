/**
 * Created by Wang QiHan on 2016/11/30.
 */

import React, { Component } from 'react';
import Portlet from '../common/Portlet';
import ListMedia from '../common/ListMedia';
import 'whatwg-fetch';

const listData = ['A', 'B', 'C', 'D', 'E', 'F'];

export default class Mall extends Component {
  render() {
    return (
      <div>
        <h1>Mall</h1>
        <Portlet caption="标题1">
          <ListMedia data={listData}/>
        </Portlet>
        <Portlet caption="标题2">
          <ListMedia data={listData}/>
        </Portlet>
        <Portlet caption="标题3">
          <ListMedia data={listData}/>
        </Portlet>
      </div>
    );
  }
}
