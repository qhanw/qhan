// @ts-nocheck
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxHeader,
  MediaBoxBody,
  MediaBoxTitle,
  MediaBoxDescription,
  Button,
} from "react-weui";
import "weui";

import { ListData } from "./utils/listData"; // 列表数据

export default () => {
  return (
    <div className="test-list">
      {ListData.map((item) => (
        <Panel key={item.id}>
          <PanelHeader>{item.title}</PanelHeader>
          <PanelBody>
            <MediaBox type="appmsg">
              <MediaBoxHeader>
                {item.isTest ? (
                  <Button type="primary" size="small" disabled={true}>
                    已测试
                  </Button>
                ) : (
                  <Link
                    to={"/" + item.id}
                    className="weui-btn weui-btn_mini weui-btn_primary"
                  >
                    开始测试
                  </Link>
                )}
              </MediaBoxHeader>
              <MediaBoxBody>
                <MediaBoxTitle>{item.name}</MediaBoxTitle>
                <MediaBoxDescription>
                  {item.bDate}-{item.eDate}
                </MediaBoxDescription>
              </MediaBoxBody>
            </MediaBox>
          </PanelBody>
        </Panel>
      ))}
    </div>
  );
};
