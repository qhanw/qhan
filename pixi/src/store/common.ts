import { useMemo } from 'react';
import { create } from 'zustand';

type ServerTimeState = {
  unix: number;
  set: (unix: number) => void;
};

/** 服务器时间 */
export const useServerTime = create<ServerTimeState>((set) => ({
  unix: +new Date(),
  set: (unix: number) => set({ unix }),
}));

type TimeCalibrationState = {
  calibration: number;
  set: (unix: number) => void;
};

/** 时间校准值 */
export const useTimeCalibration = create<TimeCalibrationState>((set) => ({
  calibration: 0,
  set: (calibration: number) => set({ calibration }),
}));

/** 当前时间 */
export const useCurrentTime = () => {
  const { calibration } = useTimeCalibration();

  return useMemo(() => +new Date() + calibration, [calibration]);
};
