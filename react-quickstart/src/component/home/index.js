import React, {Component} from 'react';
import {connect} from 'react-redux';

import { computerAdd } from '../../redux/actions';

import Header from './header'
import ComputerAdd from './computer'

class Home extends Component {

  render() {
    const { adds, dispatch } = this.props;
    return (
    <div>
      <Header/>
      <ComputerAdd onAddClick={(num1, num2) => dispatch(computerAdd(num1, num2))}/>
      <h2>{adds}</h2>
    </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    adds: state.computer
  }
}


export default connect(mapStateToProps)(Home);
