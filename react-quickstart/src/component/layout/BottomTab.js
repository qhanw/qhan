/**
 * Created by Wang QiHan on 2016/12/2.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class BottomTab extends Component{
  render(){
    return(
      <div className="su-flex tab-menu bottom">
        {
          this.props.navData.map((router, index)=>
            <div className="su-column" key={index}><Link to={router.url} ref={router.name}>{router.name}</Link></div>
          )
        }
      </div>
    )
  }
}

BottomTab.propTypes = {
  navData: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
  }).isRequired).isRequired
}