/**
 * Created by Wang QiHan on 2016/12/2.
 */
import React, {Component} from 'react';

export default class ListMedia extends Component {
  render(){
    return(
      <ul>
        {
          this.props.data.map((item, index)=> <li key={index}>{item}</li>)
        }
      </ul>
    )
  }
}