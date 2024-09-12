import { Button, message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, EditableFormInstance } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import dayjs from 'dayjs';
import { useCurrentTime } from '@/store/common';

import type { RechargeItem } from '../typings';

import { SortableItem, DragHandler } from './SortableItem';
import { ActiveDateTimeRange } from './ActiveDateTimeRange';

import { WHETHER, PLATFORM, CURRENCIES, BUY_LIMIT, IS_DOUBLE } from '../enumValues';

import { getGradeId, validateGradeId } from './utils';

import Mutate from './Mutate';
import type { MutateType } from './Mutate';
type RechargeListProps = {
  onChange?: (d: RechargeItem[]) => void;
  value?: RechargeItem[];
  loading?: boolean;
  valueEnum?: Record<string, any>;
  onSubmit?: () => void;
  submitLoading?: boolean;
};

const resetRow = {
  multiple: undefined,
  extraReward: undefined,
  quota: undefined,
  buyLimit: undefined,
  recommend: undefined,
  startTime: undefined,
  endTime: undefined,
  time: undefined,
};

export default function RechargeList({ onChange, value, loading, valueEnum }: RechargeListProps) {
  const actionRef = useRef<ActionType>();
  const mutateRef = useRef<MutateType>();

  const unix = useCurrentTime();

  const editorFormRef = useRef<EditableFormInstance<RechargeItem>>();

  const [list, setList] = useState<RechargeItem[]>();

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>();

  const val = useMemo(() => value || list || [], [value, list]);

  useEffect(() => {
    setEditableRowKeys(val?.map((c) => c.id!));
  }, [val]);

  const onValuesChange = (val: RechargeItem[]) => {
    // 添加排序值
    const res = val.map((c, i) => ({ ...c, sort: i + 1 }));

    setList(res);
    onChange?.(res);
  };

  const renderOptions = (record: RechargeItem, idx?: number) => {
    return [
      <Button
        key="close"
        type="primary"
        size="small"
        onClick={() => {
          if (typeof idx === 'number') {
            editorFormRef.current?.setRowData?.(idx, resetRow);
            onValuesChange([
              ...val.slice(0, idx),
              { ...val[idx], ...resetRow },
              ...val.slice(idx + 1),
            ]);
          }
        }}
      >
        关闭优惠
      </Button>,
      <Button
        key="delete"
        type="primary"
        danger
        size="small"
        onClick={() => {
          if (typeof idx === 'number') {
            editorFormRef.current?.setRowData?.(idx, resetRow);
          }

          onValuesChange(val.filter((c) => c.id !== record.id));
        }}
      >
        删除档位
      </Button>,
      <Button
        key="edit"
        type="primary"
        size="small"
        onClick={() => mutateRef.current?.open(record)}
      >
        编辑
      </Button>,
    ];
  };

  const columns: ProColumns<RechargeItem>[] = [
    {
      title: '档位管理',
      align: 'left',
      children: [
        {
          title: '排序',
          dataIndex: 'sort',
          width: 48,
          render: (_, row) => <DragHandler id={row.id!} />,
          align: 'center',
          editable: false,
        },
        { title: '商品ID', dataIndex: 'id', editable: false, width: 60 },
        {
          title: '所属平台',
          dataIndex: 'platform',
          editable: false,
          valueEnum: PLATFORM,
          width: 80,
        },
        { title: '币种', dataIndex: 'currency', editable: false, valueEnum: CURRENCIES, width: 80 },
        { title: '金额', dataIndex: 'price', editable: false, width: 80 },
        {
          title: '奖励道具',
          dataIndex: ['reward', 'itemId'],
          editable: false,
          valueType: 'cascader',
          fieldProps: { options: valueEnum?.prop },

          renderText: (text) => text?.at(-1),
          width: 100,
        },
        { title: '奖励数量', dataIndex: ['reward', 'itemNum'], editable: false, width: 80 },
        // { title: '图片修改', dataIndex: 'picture' },
      ],
    },

    {
      title: '折扣&活动管理',
      align: 'left',
      children: [
        {
          title: '是否奖励双倍',
          dataIndex: 'multiple',
          valueType: 'select',
          valueEnum: IS_DOUBLE,
          // formItemProps: (form, config) => {
          //   const { time, extraReward } = form.getFieldValue(config.rowKey) || {};

          //   return {
          //     rules: [{ required: time && !extraReward?.itemId, message: '请选择是否奖励双倍' }],
          //   };
          // },
          width: 120,
        },
        {
          title: '额外赠送道具',
          dataIndex: ['extraReward', 'itemId'],
          valueType: 'cascader',
          fieldProps: {
            options: valueEnum?.prop,
            showSearch: true,
            displayRender: (labels: string[]) => labels?.at(-1),
          },
          // formItemProps: (form, config) => {
          //   const { time, multiple } = form.getFieldValue(config.rowKey?.slice(0, 1)) || {};

          //   return { rules: [{ required: time && !multiple, message: '请选择额外赠送道具' }] };
          // },
          width: 140,
        },
        {
          title: '额外赠送道具数量',
          dataIndex: ['extraReward', 'itemNum'],
          valueType: 'digit',
          fieldProps: { precision: 0, min: 1 },
          formItemProps: (form, config) => {
            const required = form.getFieldValue(config.rowKey)?.itemId;

            return { rules: [{ required, message: '请输入额外赠送道具数量' }] };
          },
          width: 130,
        },
        {
          title: '限购类型',
          dataIndex: 'quota',
          valueType: 'select',
          valueEnum: BUY_LIMIT,
          width: 120,

          formItemProps: (form, config) => {
            const { extraReward, multiple } = form.getFieldValue(config.rowKey) || {};

            return {
              rules: [
                {
                  required: multiple !== undefined || extraReward?.itemId,
                  message: '请选择限购类型',
                },
              ],
            };
          },
        },
        {
          title: '购买次数',
          dataIndex: 'buyLimit',
          valueType: 'digit',
          fieldProps: { precision: 0, min: -1, style: { width: '100%' } },
          formItemProps: (form, config) => {
            const required = form.getFieldValue(config.rowKey)?.quota;
            return {
              rules: [
                { required, message: '请输入购买次数' },
                { pattern: /^(-?1|[1-9]\d*)$/, message: '购买次数不能为0' },
              ],
            };
          },
          width: 100,
        },
        {
          title: '新品推荐',
          dataIndex: 'recommend',
          valueType: 'select',
          valueEnum: WHETHER,
          fieldProps: { style: { width: '100%' } },
          width: 120,
        },
        //startTime endTime
        {
          title: '活动时间',
          dataIndex: 'time',
          valueType: 'dateTimeRange',
          width: 380,
          formItemProps: {
            rules: [
              { required: true, message: '请选择活动时间' },
              {
                validator: (_, value) => {
                  if (value) {
                    if (value[0].valueOf() >= value[1].valueOf()) {
                      return Promise.reject(new Error('活动结束时间必须大于活动开始时间！'));
                    }
                    if (value[1].valueOf() < dayjs(unix).valueOf()) {
                      return Promise.reject(new Error('活动结束时间必须大于当前时间！'));
                    }
                  }

                  return Promise.resolve();
                },
              },
            ],
          },
          renderFormItem: ({ index }) => {
            return <ActiveDateTimeRange prevNode={index ? val[index - 1] : undefined} />;
          },
        },
        {
          title: '操作',
          valueType: 'option',
          key: 'option',
          render: (_, record) => renderOptions(record),
          width: 234,
        },
      ],
    },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const actId = active.id;
    const oveId = over!.id;

    if (actId !== oveId) {
      const oldIdx = val.findIndex((item) => item.id === actId);
      const newIdx = val.findIndex((item) => item.id === oveId);

      // 同平台的商品之间才可以排序
      if (val[oldIdx].platform === val[newIdx].platform) {
        const next = arrayMove(val, oldIdx, newIdx);

        onValuesChange(next);
      }
    }
  };

  const onMutate = async (v: RechargeItem) => {
    const { platforms, pictures, ...rest } = v;

    // 根据选择的平台生成相对应数据
    const values = platforms?.map((c) => ({
      ...rest,
      platform: c,
      picture: pictures?.[0]?.url,
      id: v.id ?? getGradeId(val, c),
    }));

    if (!values) return;

    const submitVal = await validateGradeId(values).catch((e) => {
      message.error(
        e.map((c: any) => (
          <div className="text-left">
            平台：{c.type}的{c.message}
          </div>
        )),
      );
    });

    if (!submitVal) return;

    // 插入创建数据到列表
    submitVal.forEach((item) => {
      const i = val.findIndex((c) => c.id === item.id);

      // 当商品ID存在时表示修改
      if (i >= 0) {
        val.splice(i, 1, item);
      } else {
        const index = val.findLastIndex((c) => c.platform === item.platform);
        const idx = index < 0 ? val.length : index + 1;

        val.splice(idx, 0, item);
      }
    });

    onValuesChange([...val]);
  };

  return (
    <>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
        <SortableContext items={val.map((c) => c.id!)} strategy={verticalListSortingStrategy}>
          <EditableProTable<RechargeItem>
            dateFormatter="number"
            editableFormRef={editorFormRef}
            loading={loading}
            components={{ body: { row: SortableItem } }}
            search={false}
            columns={columns}
            actionRef={actionRef}
            ghost
            bordered
            editable={{
              editableKeys,
              type: 'multiple',
              actionRender: (row, config) => renderOptions(row, config.index),
              onValuesChange: (_, list) => onValuesChange(list),
              onChange: setEditableRowKeys,
            }}
            value={val}
            rowKey="id"
            headerTitle="Recharge List"
            toolBarRender={() => [
              <Button
                key="button"
                icon={<PlusOutlined />}
                onClick={() => mutateRef.current?.open()}
                type="primary"
              >
                New Add
              </Button>,
            ]}
            recordCreatorProps={false}
            pagination={false}
          />
        </SortableContext>
      </DndContext>
      <Mutate ref={mutateRef} propList={valueEnum?.prop} onConfirm={onMutate} />
    </>
  );
}
