/**
 * Created by Wang QiHan on 2017/1/5.
 */
import React, {Component} from 'react';
import {
  Article,
  Panel,
  PanelHeader,
  PanelBody,
} from "react-weui";

export default class Result extends Component {
  render() {
    return (
      <Panel>
        <PanelHeader>营养调查问卷</PanelHeader>
        <PanelBody>
          <Article>
            <h1>当前测试用时：{this.props.take}s</h1>
            <p>感谢您对营养健康的重视与关注，专家将针对结果进行个性化报告解读，报告将给到学校，尽请期待！</p>
          </Article>
        </PanelBody>
      </Panel>
    )
  }
}
