import { Card } from "antd-mobile";

export default ({ take }: any) => {
  return (
    <Card title="营养调查问卷">
      <article className="article" style={{ textAlign: "center" }}>
        <h1>当前测试用时：{take}s</h1>
        <p>
          感谢您对营养健康的重视与关注，专家将针对结果进行个性化报告解读，报告将给到学校，尽请期待！
        </p>
      </article>
    </Card>
  );
};
