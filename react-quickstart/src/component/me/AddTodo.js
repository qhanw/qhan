/**
 * Created by EVEN on 2016/12/1.
 */

import React, {Component, PropTypes} from 'react';

export default class AddTodo extends Component {
  render(){
    return(
      <div>
        <input type="text" ref="input"/>
        <button onClick={(e)=> this.handleClick(e)}>Add</button>
      </div>
    )
  }

  handleClick(e){
    let node = this.refs.input;
    let text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}
