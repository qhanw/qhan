import { useNavigate } from "react-router-dom";

import { Card, Button, Grid } from "antd-mobile";

import { list } from "./constant"; // 列表数据

export default () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      {list.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          style={{ marginBottom: 12, borderRadius: 0 }}
        >
          <Grid columns={3} gap={8}>
            <Grid.Item span={2}>
              <h4 className="weui-media-box__title">{item.name}</h4>
              <p className="weui-media-box__desc">
                {item.bDate}-{item.eDate}
              </p>
            </Grid.Item>
            <Grid.Item style={{ textAlign: "right" }}>
              {item.isTest ? (
                <Button size="small" disabled>
                  已测试
                </Button>
              ) : (
                <Button color="success" onClick={() => navigate(`/${item.id}`)}>
                  开始测试
                </Button>
              )}
            </Grid.Item>
          </Grid>
        </Card>
      ))}
    </div>
  );
};
