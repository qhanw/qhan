/**
 * Created by EVEN on 2016/12/1.
 */
import React, { Component } from 'react'

class ComputerAdd extends Component {
  handleComputer() {
    let num1 = this.refs.num1.value.trim(),
      num2 = this.refs.num2.value.trim();
    this.props.onAddClick(parseInt(num1, 10), parseInt(num2, 10))
  }
  render() {
    return (
      <div>
        <div><input ref="num1" /> + <input ref="num2"/></div>
        <div><button onClick={this.handleComputer.bind(this)}>计算</button></div>
      </div>
    )
  }
}

export default ComputerAdd;