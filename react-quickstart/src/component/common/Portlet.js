/**
 * Created by Wang QiHan on 2016/12/2.
 */
import React, {Component, PropTypes} from 'react';

export default class Portlet extends Component{
  render(){
    return(
      <div className="portlet">
        <div className="portlet-title"><h2 className="caption">{this.props.caption}</h2><span className="actions"><a href="#">更多<i className="icon icon-arrow right"></i></a></span></div>
        <div className="portlet-body">{this.props.children}</div>
      </div>
    )
  }
}

Portlet.propTypes = {
  caption : PropTypes.string.isRequired
}