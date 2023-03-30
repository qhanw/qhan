import { useRef, useState } from "react";

import { data } from "./utils/questions";
import "./App.css";
import { Link } from 'react-router-dom'

import { ButtonArea, Button, Toptips, Footer } from "react-weui";
import "weui";

import Entry from './components/entry'
import Result from './components/result'
import QuestionList from './components/questions'

const sexPickerValue = '1'
const datetimePickerValue = '2'


export default () => {
  const ref = useRef()
  const [tip, setTip] = useState(false);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [submitData, setSubmitData] = useState({
    sex: '男',
    date: '',
    height: '33',
    weight: '23'
  });


  const start = () => {
    setStep(1);
    setSubmitData(Object.assign(submitData, {
      sex: sexPickerValue,
      date: datetimePickerValue
    }))
  }

  const next = () => {
    let idx = index + 1;
    if (idx >= data.length) {
      idx = data.length - 1;
      return;
    }
    setIndex(idx)
  }


  const prev = () => {
    let idx = index - 1;
    if (idx < 0) {
      idx = 0;
      setIndex(0)
      return;
    }
    setIndex(idx)
  }

  const save = () => setStep(2)


  const updateHandler = (event) => {

    setSubmitData({
      submitData: Object.assign(submitData, { height: event.target.value })
    });

    console.log(event.target);
  }



  let { Template, FooterOption } = { Template: null, FooterOption: null };


  switch (step) {
    case 0:
    default:
      Template = () => <Entry data={submitData} updateHandler={updateHandler} />;
      FooterOption = () => (
        <ButtonArea>
          <Button onClick={start}>开始测试</Button>
        </ButtonArea>
      )
      break;
    case 1:
      Template = () => <QuestionList index={index} data={data} />;
      FooterOption = () => (
        <ButtonArea className="button-sp-area" direction="horizontal">
          <Button type="default" onClick={prev}>{(index <= 0) ? '上一步' : '上一题'}</Button>
          <Button type="default"
            onClick={(index >= data.length - 1) ? save : next}>{(index >= data.length - 1) ? '提交' : '下一题'}</Button>
        </ButtonArea>
      )
      break;
    case 2:
      Template = () => <Result take={598} />;
      FooterOption = () => (
        <ButtonArea className="button-sp-area" direction="horizontal">
          <Link to="/" className="weui-btn weui-btn_primary">返回首页</Link>
        </ButtonArea>
      )
      break;
  }

  return (
    <div className='App page' ref={ref}>
      <Toptips type="warn" show={tip}> Oops, something is wrong! </Toptips>
      <Template />
      <Footer>
        <FooterOption />
      </Footer>
    </div>
  )

}


