import type { GetProps } from 'antd';
import { Space, DatePicker, Button } from 'antd';

import { useMemo, useState } from 'react';

import dayjs from 'dayjs';

import type { RechargeItem } from '../typings';

const { RangePicker } = DatePicker;

type ActiveDateTimeRangeProps = GetProps<typeof RangePicker> & { prevNode?: RechargeItem };

const format = (timestamp: number) => dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');

export function ActiveDateTimeRange({ value, onChange, prevNode }: ActiveDateTimeRangeProps) {
  const [time, setTime] = useState<ActiveDateTimeRangeProps['value']>();

  const val = useMemo(() => value || time, [value, time]);

  const onInnerChange: ActiveDateTimeRangeProps['onChange'] = (dates, dateStrings) => {
    onChange?.(dates, dateStrings);
    setTime(dates);
  };

  const picker = (
    <RangePicker
      showTime
      value={val?.length ? [dayjs(val[0]), dayjs(val[1])] : undefined}
      onChange={onInnerChange}
    />
  );

  return prevNode && !val ? (
    <Space>
      {picker}
      <Button
        onClick={() => {
          const { time } = prevNode;
          if (time) {
            onInnerChange([dayjs(time[0]), dayjs(time[1])], [format(time[0]), format(time[1])]);
          } else {
            onInnerChange(null, ['', '']);
          }
        }}
      >
        同上
      </Button>
    </Space>
  ) : (
    picker
  );
}
