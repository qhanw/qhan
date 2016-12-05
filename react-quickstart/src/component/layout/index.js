import React, {Component} from 'react';
import TopTab from './TopTab';
import BottomTab from './BottomTab';
import '../../scss/main.scss';

const routerData = [
  {url:'/', name:'首页'},
  {url:'/about', name:'营养库'},
  {url:'/inbox', name:'营养师'},
  {url:'/mall', name:'商城'},
  {url:'/me', name:'我的'}
]

class App extends Component {
  render() {
    return (
      <div className="container">
        <TopTab title={this.props.routes[1].name} onClickPrev={()=>this.props.router.goBack()}/>
        <div className="content">
          {/*
           next we replace `<Child>` with `this.props.children`
           the router will figure out the children for us
           */}
          {this.props.children}
        </div>
        <BottomTab navData={routerData}/>
      </div>
    );
  }
}

export default App;
