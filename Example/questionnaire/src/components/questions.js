/**
 * Created by Wang QiHan on 2017/1/5.
 */
import React, {Component} from 'react';
import {
  Article,
  Panel,
  PanelHeader,
  PanelBody,
  //PanelFooter,
  //Cell,
  CellHeader,
  CellBody,
  //CellFooter,
  Form,
  FormCell,
  Checkbox,
  Progress,

} from "react-weui";
import "weui";


export default class QuestionsList extends Component {

  render() {
    const {index, data} = this.props;
    return (
      <Panel>
        <PanelHeader>营养调查问卷</PanelHeader>
        <PanelBody>
          <Article>
            <div className="progress-bar">
              <Progress value={(index + 1) * 100 / data.length} showCancel={false}/>
              <span>{(index + 1) + '/' + data.length}</span>
            </div>
            <p>{index + 1}、{data[index].name}</p>
          </Article>
          <Form checkbox data-key={data[index].range.join('-')} data-qid={data[index].id}>
            {
              data[index].answer.map((item, i) =>
                <FormCell checkbox key={i} data-aid={item.id}>
                  <CellHeader>
                    <Checkbox name="checkbox1" value={item.id}/>
                  </CellHeader>
                  <CellBody>{item.content}</CellBody>
                </FormCell>
              )
            }
          </Form>
        </PanelBody>
      </Panel>
    )
  }
}