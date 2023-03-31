import { FC, RefObject } from "react";
import { Card, Form, Picker, DatePicker, Input } from "antd-mobile";
import type { DatePickerRef } from "antd-mobile/es/components/date-picker";
import dayjs from "dayjs";

type EntryProps = {
  data?: any;
  updateHandler?: (e: any) => void;
};

const Entry: FC<EntryProps> = () => {
  return (
    <>
      <Card title="营养调查问卷">
        <article className="article">
          <h3>测试须知</h3>
          <p>
            本问卷是为了调研日常生活中的基本营养健康膳食习惯，便于营养专家了解被测者的营养健康膳食行为缺陷，通过大数据分析，制定个性化的幼儿园/学校食堂营养改善计划和家庭营养改善计划。
          </p>
        </article>
      </Card>
      <Form
        layout="horizontal"
        mode="card"
        initialValues={{ birthday: new Date() }}
      >
        <Form.Item label="性别" style={{ paddingLeft: 0 }}>
          <Picker
            columns={[
              [
                { label: "男", value: "1" },
                { label: "女", value: "0" },
              ],
            ]}
            onSelect={(val, extend) => {
              console.log("onSelect", val, extend.items);
            }}
          >
            {(items, { open }) => {
              return (
                <>
                  <Input
                    onClick={open}
                    placeholder="请选择性别"
                    value={items
                      .map((item) => item?.label ?? "未选择")
                      .join(" - ")}
                  />
                </>
              );
            }}
          </Picker>
        </Form.Item>

        <Form.Item
          name="birthday"
          label="出生日期"
          trigger="onConfirm"
          onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open();
          }}
          style={{ paddingLeft: 0 }}
        >
          <DatePicker>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : "Please select"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item name="height" label="身高" style={{ paddingLeft: 0 }}>
          <Input placeholder="请输入身高" />
        </Form.Item>
        <Form.Item name="weight" label="体重" style={{ paddingLeft: 0 }}>
          <Input placeholder="请输入体重" />
        </Form.Item>
      </Form>
    </>
  );
};

export default Entry;
