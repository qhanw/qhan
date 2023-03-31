import { Card, Form, Space, Checkbox, ProgressBar } from "antd-mobile";

export default ({ index, data }: any) => {
  return (
    <Card title="营养调查问卷">
      <article className="article">
        <ProgressBar
          percent={((index + 1) * 100) / data.length}
          text={index + 1 + "/" + data.length}
          style={{
            "--text-width": "auto",
            "--fill-color": "var(--adm-color-success)",
            "--track-width": "3px",
          }}
        />

        <p>
          {index + 1}、{data[index].name}
        </p>
      </article>

      <Form.Item name={data[index].id} required>
        <Checkbox.Group>
          <Space direction="vertical" block>
            {data[index].answer.map((item: any) => (
              <Checkbox value={item.id} key={item.id} block>
                {item.content}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </Card>
  );
};
