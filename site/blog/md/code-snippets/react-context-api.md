---
title: React Context API 聚合
date: 2024-05-10T20:08:56+08:00
category: react
tags: [react, javascript]
---

- 示例一
```tsx
// 源码来自鲁班系统
import React, { useContext, createContext, useState } from 'react';
import WS from '@/base/ws-browser';
import { ToGo } from '../base/constant';

function onWsConnected() {
  window.ws.sendToGo(ToGo.FETCH_FULL_WXID_LIST, null);
}

function useProvideWs() {
  const [ws, setWsInstance] = useState<WS>(window.ws);

  function setWs(alias: string) {
    if (window.ws) return;

    const wsInstance = alias === 'MainRender' ? new WS(alias, onWsConnected) : new WS(alias);

    window.ws = wsInstance;
    setWsInstance(wsInstance);
  }

  return { ws, setWs };
}

type WsContextState = {
  ws?: WS;
  setWs?: (alias: string) => void;
};

const WsContext = createContext<WsContextState>({});

const ProvideWsInstance: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ws = useProvideWs();

  return <WsContext.Provider value={ws}>{children}</WsContext.Provider>;
};

function useWsInstance() {
  return useContext(WsContext);
}

export { ProvideWsInstance, useWsInstance };
```
- 示例二
```tsx
import React, { createContext, useContext, useReducer } from 'react';

type StepDataType = {
  payAccount: string;
  receiverAccount: string;
  receiverName: string;
  amount: string;
};

type StateType = { current: string; step: StepDataType };

type FormContextType = {
  state: StateType;
  dispatch: ({ type, payload }: { type: string; payload?: any }) => void;
};

const initialState = {
  current: 'info',
  step: {
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
  },
};

// 创建 context
const FormContext = createContext<FormContextType>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: StateType, { type, payload }: { type: string; payload?: any }) {
  switch (type) {
    case 'saveCurrentStep':
      return { ...state, current: payload };
    case 'saveStepFormData':
      return { ...state, step: payload };
    default:
      throw new Error(`action ${type} does not exist!`);
  }
}

const FormStepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
};

export { FormStepProvider, FormContext };

export function useModel() {
  const {
    state: { current, step },
    dispatch,
  } = useContext(FormContext);

  function setCurrent(curr: string) {
    dispatch({ type: 'saveCurrentStep', payload: curr });
  }
  function setStepData(values: StepDataType) {
    dispatch({ type: 'saveStepFormData', payload: values });
  }

  return { current, setCurrent, step, setStepData };
}
```
