/**
 * Created by Wang QiHan on 2016/12/27.
 */
import React, {Component} from "react";
import {Link} from 'react-router'
import {
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxHeader,
  MediaBoxBody,
  MediaBoxTitle,
  MediaBoxDescription,
  Button
} from 'react-weui';
import "weui";

import {ListData} from './utils/listData';
import './App.css';


export default class Entity extends Component {
  render() {
    return (
      <div className="test-list">
        {
          ListData.map((item, i) =>
            <Panel key={i}>
              <PanelHeader>{item.title}</PanelHeader>
              <PanelBody>
                <MediaBox type="appmsg">
                  <MediaBoxHeader>
                    <Link to={'/'+item.id}>
                      <Button type="primary" size="small" disabled={item.isTest}>{item.isTest ? '已测试' : '开始测试'}</Button>
                    </Link>
                  </MediaBoxHeader>
                  <MediaBoxBody>
                    <MediaBoxTitle>{item.name}</MediaBoxTitle>
                    <MediaBoxDescription>{item.bDate}-{item.eDate}</MediaBoxDescription>
                  </MediaBoxBody>
                </MediaBox>
              </PanelBody>
            </Panel>
          )
        }
      </div>
    )
  }
}

