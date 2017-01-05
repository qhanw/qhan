/**
 * Created by Wang QiHan on 2017/1/5.
 */
import React, {Component} from 'react';

import {Date2} from "../utils/Date2";
import {
  Article,
  Panel,
  PanelHeader,
  PanelBody,
  CellHeader,
  CellBody,
  Form,
  FormCell,
  Input,
  Label,
  Picker,
} from "react-weui";



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

const initDays = (max)=> {
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

const datetimePickerGroup = [{items: initYears}, {items: initMonthes}, {items: initDays()}];

const getDatetimeSelected = (value)=> {
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

export default class Entry extends Component {

  constructor(props){
    super(props);
    this.state ={
      sexPickerShow: false,
        sexPickerValue: this.props.data.sex,
        sexPickerGroup: [{items: [{label: '男'}, {label: '女'}]}],

        datetimePickerShow: false,
        datetimePickerValue: currentDay,
        datetimePickerSelected: getDatetimeSelected(currentDay),
        datetimePickerGroup: datetimePickerGroup,
    }
  }

  render() {
    const {weight, height, sex} = this.props.data;
    return (
      <Panel>
        <PanelHeader>营养调查问卷</PanelHeader>
        <PanelBody>
          <Article>
            <h3>测试须知</h3>
            <p>本问卷是为了调研日常生活中的基本营养健康膳食习惯，便于营养专家了解被测者的营养健康膳食行为缺陷，通过大数据分析，制定个性化的幼儿园/学校食堂营养改善计划和家庭营养改善计划。</p>
          </Article>
          {
            console.log(this.props.data)
          }
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
                       value={sex}
                       readOnly={true}
                       onChange={this.props.updateHandler}
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
                <input type="number" ref="height" className="weui-input" value={height} onChange={this.props.updateHandler} placeholder="请填写您的身高"/>
              </CellBody>
            </FormCell>
            <FormCell>
              <CellHeader>
                <Label>体重</Label>
              </CellHeader>
              <CellBody>
                {/*<Input type="number" defaultValue={this.state.submitData.weight} placeholder="请填写您的体重"/>*/}
                {/*<input type="number" ref="weight" className="weui-input" value={weight} placeholder="请填写您的体重"/>*/}
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
    )
  }
}