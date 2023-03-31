import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoticeBar, Button, AutoCenter, Space } from "antd-mobile";

import Entry from "./components/Entry";
import Result from "./components/Result";
import QuestionList from "./components/Questions";

import { data } from "./constant";

export default () => {
  const navigate = useNavigate();
  const [tip, setTip] = useState(false);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [submitData, setSubmitData] = useState({
    sex: "1",
    date: "",
    height: "33",
    weight: "23",
  });

  const start = () => {
    setStep(1);
    setSubmitData(Object.assign(submitData, { sex: "1", date: new Date() }));
  };

  const next = () => {
    let idx = index + 1;
    if (idx >= data.length) {
      idx = data.length - 1;
      return;
    }
    setIndex(idx);
  };

  const prev = () => {
    let idx = index - 1;
    if (idx < 0) {
      idx = 0;
      setIndex(0);
      return;
    }
    setIndex(idx);
  };

  const save = () => setStep(2);

  const updateHandler = (event: any) => {
    setSubmitData(Object.assign(submitData, { height: event?.target?.value }));

    console.log(event.target);
  };

  const { Template, Footer } = (() => {
    switch (step) {
      case 0:
      default:
        return {
          Template: () => (
            <Entry data={submitData} updateHandler={updateHandler} />
          ),
          Footer: () => (
            <Button color="success" onClick={start}>
              开始测试
            </Button>
          ),
        };

      case 1:
        return {
          Template: () => <QuestionList index={index} data={data} />,
          Footer: () => (
            <Space>
              <Button onClick={prev}>{index <= 0 ? "上一步" : "上一题"}</Button>
              <Button onClick={index >= data.length - 1 ? save : next}>
                {index >= data.length - 1 ? "提交" : "下一题"}
              </Button>
            </Space>
          ),
        };

      case 2:
        return {
          Template: () => <Result take={598} />,
          Footer: () => <Button onClick={() => navigate("/")}>返回首页</Button>,
        };
    }
  })();

  return (
    <div className="page">
      {!tip ? (
        <NoticeBar
          content="Oops, something is wrong!"
          color="alert"
          closeable
        />
      ) : null}

      <Template />
      <footer style={{ margin: "48px 16px 8px" }}>
        <AutoCenter>
          <Footer />
        </AutoCenter>
      </footer>
    </div>
  );
};
