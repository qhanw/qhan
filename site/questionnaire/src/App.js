import React, {Component} from "react";

import {data} from "./utils/questions";
import "./App.css";
import {Link} from 'react-router'

import {ButtonArea, Button, Toptips, Footer} from "react-weui";
import "weui";
/*import 'react-weui/lib/react-weui.min.css';*/

import Entry from './components/entry'
import Result from './components/result'
import QuestionList from './components/questions'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tip: false,
      index: 0,
      step: 0,
      submitData: {
        sex: '男',
        date: '',
        height: '33',
        weight: '23'
      }
    }
  }
 /* componentDidUpdate(prevProps, prevState) {
    console.log(this.state)
    if (prevState.step !== this.state.step) {
      this.refs.page.className = this.refs.page.className ? this.refs.page.className + ' animate-right-in' : 'animate-right-in';

      setTimeout(() => {
        let classArr = this.refs.page.className.split(' ');
        classArr.splice(classArr.indexOf('animate-right-in'), 1);
        this.refs.page.className = classArr.join(' ');
      }, 200);
    }
  }*/

  start() {
    /* if(!this.state.sexPickerValue){
     return;
     }

     if(!this.state.datetimePickerValue){
     return;
     }

     if(!this.state.submitData.height){
     return;
     }
     if(!this.state.submitData.weight){
     return;
     }*/

    this.setState({
        step: 1,
        submitData: Object.assign(this.state.submitData, {
          sex: this.state.sexPickerValue,
          date: this.state.datetimePickerValue
        })
      }
    );
  }

  next() {
    let index = this.state.index + 1;
    if (index >= data.length) {
      index = data.length - 1;
      return;
    }
    this.setState({index: index})
  }

  prev() {
    let index = this.state.index - 1;
    if (index < 0) {
      index = 0;
      this.setState({step: 0});
      return;
    }
    this.setState({index: index})
  }

  save() {
    this.setState({step: 2})
  }

  updateHandler(event){

    this.setState({
      submitData: Object.assign(this.state.submitData, {height: event.target.value})
    });

    console.log(event.target);
  }

  render() {
    let index = this.state.index; // 当前题索引;
    let {Template, FooterOption} = [null, null];


    switch (this.state.step) {
      case 0:
      default:
        Template = ()=> <Entry data={this.state.submitData} updateHandler={this.updateHandler.bind(this)}/>;
        FooterOption = ()=> (
          <ButtonArea>
            <Button onClick={this.start.bind(this)}>开始测试</Button>
          </ButtonArea>
        )
        break;
      case 1:
        Template = ()=> <QuestionList index={index} data={data}/>;
        FooterOption = ()=>(
          <ButtonArea className="button-sp-area" direction="horizontal">
            <Button type="default" onClick={this.prev.bind(this)}>{(index <= 0) ? '上一步' : '上一题'}</Button>
            <Button type="default"
                    onClick={this[(index >= data.length - 1) ? 'save' : 'next'].bind(this)}>{(index >= data.length - 1) ? '提交' : '下一题'}</Button>
          </ButtonArea>
        )
        break;
      case 2:
        Template = ()=> <Result take={598}/>;
        FooterOption = ()=>(
          <ButtonArea className="button-sp-area" direction="horizontal">
            <Link to="/" className="weui-btn weui-btn_primary">返回首页</Link>
          </ButtonArea>
        )
        break;
    }

    return(
      <div className='App page' ref='page'>
        <Toptips type="warn" show={this.state.tip}> Oops, something is wrong! </Toptips>
        <Template />
        <Footer>
          <FooterOption />
        </Footer>
      </div>
    )
  }
}

export default App;
