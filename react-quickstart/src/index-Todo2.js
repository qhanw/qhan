import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WeUI from 'react-weui';
import 'weui';
const {Button} = WeUI;
const {Uploader} = WeUI;

/*let child = React.createElement('li', null, 'Text Content');
 let root = React.createElement('ul', {className: 'my-list'}, child);*/

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      count: 0,
      userInput:''
    };
  }

  handleClick(e) {
    this.setState({
      liked: !this.state.liked,
      count: ++ this.state.count
    })
  }

  componentDidMound() {
    console.log(ReactDOM.findDOMNode(this))
  }

  handleClickInput(e){
    this.setState({
      userInput: e.target.value
    })
  }

  clearAndFocusInput() {
    this.setState({userInput:''}, ()=> {
      this.refs.theInput.focus();
    })
  }

  render() {
    const text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <div>
        <button onClick={this.componentDidMound.bind(this)}>console node</button>
        <p onClick={this.handleClick.bind(this)}>You {text} this. Click to Toggle.{this.state.count}</p>
        <button onClick={this.clearAndFocusInput.bind(this)}>Click to Focus and Reset</button>
        <input ref="theInput" value={this.state.userInput} onChange={this.handleClickInput.bind(this)}/>
        <Button>hello wechat</Button>
        <Uploader/>
      </div>
      )
  }
}

ReactDOM.render(<LikeButton/>, document.getElementById('root'))
