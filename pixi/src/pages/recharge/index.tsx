import { useState } from 'react';
import RechargeList from './RechargeList';

import type { RechargeInfo } from './typings';

import { data, prop } from './data';

export default function Recharge() {
  const [grade, setGrade] = useState<RechargeInfo['goodsModels']>(data as any);

  return (
    <div className='pt-12'>
      <RechargeList
        value={grade}
        // loading={loading}
        onChange={setGrade}
        valueEnum={{ prop }}
      />
    </div>
  );
}
