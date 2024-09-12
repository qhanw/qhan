import { Modal, Form, Checkbox, Select, InputNumber, Cascader } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';

import type { RechargeItem, RechargeProp } from '../typings';

import { PLATFORM, CURRENCIES } from '../enumValues';

type RefMethods = { open: (val?: RechargeItem) => void };
export type MutateType = RefMethods | undefined;

type MutateProps = {
  onConfirm?: (value: RechargeItem) => void;
  propList: RechargeProp[];
};

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };

const MutateAdmin = forwardRef<MutateType, MutateProps>(({ onConfirm, propList }, ref) => {
  const [form] = Form.useForm<RechargeItem>();

  // 设置一个值用于编辑或新增的表单初始数据，并用于控制窗口显示与隐藏
  const [initVal, setInInitVal] = useState<RechargeItem>();

  const isAdd = !initVal?.id;
  const titlePrefix = initVal?.id ? '编辑' : '新增';

  useImperativeHandle(ref, () => ({
    open: (val = {}) => {
      form.resetFields();
      if (val)
        form.setFieldsValue({
          ...val,
          platforms: val.platform ? [val.platform] : undefined,
          pictures: val.picture
            ? [{ uid: val.picture, url: val.picture, name: val.picture?.split('/').at(-1) }]
            : undefined,
        });
      setInInitVal(val);
    },
  }));

  const onCancel = () => setInInitVal(undefined);

  const onOk = async () => {
    const fieldsVal = await form.validateFields().catch(console.error);
    if (!fieldsVal) return;
    onConfirm?.({ ...initVal, ...fieldsVal });

    // 关闭窗口
    onCancel();
  };

  return (
    <Modal open={!!initVal} title={`${titlePrefix}档位`} onOk={onOk} onCancel={onCancel}>
      <Form<RechargeItem> form={form} {...formItemLayout}>
        <Form.Item
          label="所属平台"
          name="platforms"
          rules={[{ required: true, message: '请选择所属平台' }]}
        >
          <Checkbox.Group
            disabled={!isAdd}
            options={[...PLATFORM].map(([k, v]) => ({ label: v.text, value: k }))}
          />
        </Form.Item>

        <Form.Item
          label="币种选择"
          name="currency"
          rules={[{ required: true, message: '请选择币种' }]}
        >
          <Select
            options={[...CURRENCIES].map(([k, v]) => ({ label: v.text, value: k }))}
            placeholder="请选择币种"
          />
        </Form.Item>

        <Form.Item dependencies={['currency']} noStyle>
          {({ getFieldValue }) => (
            <Form.Item
              label="档位金额"
              name="price"
              rules={[
                { required: true, message: '请输入档位金额' },
                {
                  pattern: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
                  message: '金额必须为大于0的数字值',
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="档位金额"
                {...(getFieldValue('currency') === 1 ? { precision: 0 } : {})}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item label="奖励内容" required style={{ marginBottom: 0 }}>
          <Form.Item
            name={['reward', 'itemId']}
            rules={[{ required: true, message: '请选择奖励内容' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Cascader options={propList} placeholder="请选择奖励内容" />
          </Form.Item>
          <Form.Item
            name={['reward', 'itemNum']}
            rules={[{ required: true, message: '请输入奖励数量' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <InputNumber placeholder="奖励数量" min={1} precision={0} />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default MutateAdmin;
