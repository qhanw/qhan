/**
 * Created by Wang QiHan on 2016/12/2.
 */
import React, {Component, PropTypes} from 'react'

export default class TopTab extends Component {
  render(){
    return(
      <div className="tab-menu top">
        <span className="tab-menu-prev" onClick={()=> this.props.onClickPrev()}><i className="icon icon-arrow left"></i> 返回</span>
        <span className="tab-menu-next">下一项 <i className="icon icon-arrow right"></i></span>
        <h2>{this.props.title}</h2>
      </div>
    )
  }
}

TopTab.propTypes = {
  onClickPrev: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}