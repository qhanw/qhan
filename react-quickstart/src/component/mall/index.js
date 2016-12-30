/**
 * Created by Wang QiHan on 2016/11/30.
 */

import React, { Component } from 'react';
import Portlet from '../common/Portlet';
import ListMedia from '../common/ListMedia';
import 'whatwg-fetch';

const listData = [
  { title: '标题A', child:['A', 'B', 'C', 'D', 'E', 'F'] },
  { title: '标题B', child:['AA', 'BB', 'CC', 'DD', 'EE', 'FF'] },
  { title: '标题C', child:['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'] }
];

export default class Mall extends Component {
  render() {
    return (
      <div>
        <h1>Mall</h1>
        {
          listData.map((list, index)=>
            <Portlet key={index} caption={list.title}>
              <ListMedia data={list.child}/>
            </Portlet>
          )
        }

      </div>
    );
  }
  componentDidMount(){
    console.log('aa')
  }
}
