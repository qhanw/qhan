import React, {Component} from "react";
import {Date2} from "./utils/Date2";
import {data} from "./utils/questions";
import "./App.css";
import {
  Article,
  ButtonArea,
  Button,
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter,
  Cell,
  CellHeader,
  CellBody,
  CellFooter,
  Form,
  FormCell,
  Input,
  Label,
  Checkbox,
  Footer,
  FooterText,
  Picker,
  Progress
} from "react-weui";
import "weui";
/*import 'react-weui/lib/react-weui.min.css';*/

const currentDay = new Date2().Format('yyyy-MM-dd');
const initMonthes = (function () {
  let month = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');
  let arr = [];
  for (let i = 0; i < month.length; i++) {
    arr.push({label: month[i]})
  }
  return arr;
})();
const initYears = (function () {
  let arr = [];
  for (let i = 1900; i <= 2080; i++) {
    arr.push({label: i});
  }
  return arr;
})();

const initDays = function (max) {
  let days = [];
  for (let i = 1; i <= (max || 31); i++) {
    days.push({label: i < 10 ? '0' + i : i});
  }
  return days;
};

const getDaysByMonthAndYear = function (year, month) {
  /*let int_d = new Date(year, parseInt(month)+1-1, 1);
   let d = new Date(int_d - 1);*/
  return initDays(new Date(year, month, 0).getDate());
};

const datetimePickerGroup = [{items: initYears}, {items: initMonthes}, {items: initDays()}]

const getDatetimeSelected = function (value) {
  let arr = [];
  let dateArr = value.split('-');
  for (let n = 0; n < dateArr.length; n++) {
    for (let i = 0; i < datetimePickerGroup[n].items.length; i++) {
      if ('' + (dateArr[n]) === (datetimePickerGroup[n].items[i].label + '')) {
        arr.push(i);
        break;
      }
    }
  }
  return arr;
}


class App extends Component {
  state = {
    sexPickerShow: false,
    sexPickerValue: '',
    sexPickerGroup: [{items: [{label: '男'}, {label: '女'}]}],
    datetimePickerShow: false,
    datetimePickerValue: currentDay,
    datetimePickerSelected: getDatetimeSelected(currentDay),
    datetimePickerGroup: datetimePickerGroup,

    index: 0,
    isStart: false
  }

  handlerStart() {
    this.setState({isStart: true})
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
      this.setState({isStart: false});
      return;
    }
    this.setState({index: index})
  }

  render() {
    return (
      <div className="App">
        {
          /*<div className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h2>Welcome to React</h2>
           </div>
           <p className="App-intro">
           To get started, edit <code>src/App.js</code> and save to reload.
           </p>*/}
        <div className={ 'page ' + (this.state.isStart ? 'hide' : 'show')}
             style={{display: (this.state.isStart ? 'none' : 'block')}}>
          <Panel>
            <PanelHeader>营养调查问卷</PanelHeader>
            <PanelBody>
              <Article>
                <h3>测试须知</h3>
                <p>本问卷是为了调研日常生活中的基本营养健康膳食习惯，便于营养专家了解被测者的营养健康膳食行为缺陷，通过大数据分析，制定个性化的幼儿园/学校食堂营养改善计划和家庭营养改善计划。</p>
              </Article>

              <Form>
                <FormCell>
                  <CellHeader>
                    <Label>性别</Label>
                  </CellHeader>
                  <CellBody>
                    <Input type="text"
                           onClick={e => {
                             e.preventDefault()
                             this.setState({sexPickerShow: true})
                           }}
                           placeholder="请您的选择性别"
                           value={this.state.sexPickerValue}
                           readOnly={true}
                    />
                  </CellBody>
                </FormCell>
                <FormCell>
                  <CellHeader>
                    <Label>出生日期</Label>
                  </CellHeader>
                  <CellBody>
                    {/*<Input type="date" defaultValue="" onChange={ e=> console.log(e.target.value)}/>*/}

                    <Input type="text" onClick={e => {
                      e.preventDefault();
                      this.setState({datetimePickerShow: true})
                    }} value={this.state.datetimePickerValue} readOnly={true} placeholder="请您的出生日期"/>
                  </CellBody>
                </FormCell>
                <FormCell>
                  <CellHeader>
                    <Label>身高</Label>
                  </CellHeader>
                  <CellBody>
                    <Input type="number" placeholder="请填写您的身高"/>
                  </CellBody>
                </FormCell>
                <FormCell>
                  <CellHeader>
                    <Label>体重</Label>
                  </CellHeader>
                  <CellBody>
                    <Input type="number" placeholder="请填写您的体重"/>
                  </CellBody>
                </FormCell>
              </Form>
              <Picker
                className="picker-sex"
                onChange={selected => {
                  let value = ''
                  selected.forEach((s, i) => {
                    value = this.state.sexPickerGroup[i]['items'][s].label
                  })
                  this.setState({
                    sexPickerValue: value,
                    sexPickerShow: false
                  })
                }}
                groups={this.state.sexPickerGroup}
                show={this.state.sexPickerShow}
                onCancel={e => this.setState({sexPickerShow: false})}
              />
              <Picker
                className="picker-datetime"
                defaultSelect={this.state.datetimePickerSelected}
                onChange={selected => {
                  console.log(selected)
                  let value = ''
                  selected.forEach((s, i) => {
                    value += (!value ? '' : '-') + this.state.datetimePickerGroup[i]['items'][s].label
                  })
                  this.setState({datetimePickerValue: value, datetimePickerShow: false})
                }}
                onGroupChange={
                  (item, i, gi, selected, instance) => {
                    let days = getDaysByMonthAndYear(initYears[selected[0]].label, initMonthes[selected[1]].label);
                    this.setState({datetimePickerGroup: [{items: initYears}, {items: initMonthes}, {items: days}]});
                    if (selected[2] > (days.length - 1)) selected[2] = days.length - 1;
                  }
                }
                groups={this.state.datetimePickerGroup}
                show={this.state.datetimePickerShow}
                onCancel={e => this.setState({datetimePickerShow: false})}
              />
            </PanelBody>
          </Panel>
          <Footer>
            <ButtonArea>
              <Button onClick={this.handlerStart.bind(this)}>开始测试</Button>
            </ButtonArea>
          </Footer>
        </div>
        <div className={ 'page ' + (this.state.isStart ? 'hide' : 'show')}
             style={{display: (!this.state.isStart ? 'none' : 'block')}}>
          <Panel>
            <PanelHeader>营养调查问卷</PanelHeader>
            <PanelBody>
              <Article>
                <Progress value={(this.state.index+1)*100/5}/>
                {(this.state.index+1) + '/' + data.length}
                <p>{data[this.state.index].name}</p>
              </Article>
              <Form checkbox data-key={data[this.state.index].range.join('-')}>
                {
                  data[this.state.index].answer.map((item, i) => {
                    return (
                      <FormCell checkbox key={i}>
                        <CellHeader>
                          <Checkbox name="checkbox1" value={item.id}/>
                        </CellHeader>
                        <CellBody>{item.content}</CellBody>
                      </FormCell>
                    )
                  })
                }

              </Form>
            </PanelBody>
          </Panel>
          <Footer>
            <ButtonArea className="button-sp-area" direction="horizontal">
              <Button type="default" onClick={this.prev.bind(this)}>上一题</Button>
              <Button type="default" onClick={this.next.bind(this)}>下一题</Button>
              <Button type="default" onClick={this.next.bind(this)}>提交</Button>
            </ButtonArea>
          </Footer>
        </div>
      </div>
    );
  }
}

export default App;
