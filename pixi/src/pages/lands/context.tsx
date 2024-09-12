import { useContext, createContext, useState } from 'react';

import type { ToolsType } from './map/editor';

type LandsContextState = {
  tool?: ToolsType;
  setTool?: any;
};

function useProvideLands() {
  const [tool, setTool] = useState<ToolsType>();

  // 添加其它状态值维护
  // .....
  // 暴露数据对象
  return { tool, setTool };
}

const LandsContext = createContext<LandsContextState>({});

function ProviderLands({ children }: { children: React.ReactNode }) {
  const lands = useProvideLands();
  return <LandsContext.Provider value={lands}>{children}</LandsContext.Provider>;
}

// 添加自定义 hooks 包裹 LandsContext 简化使用方式
function useLandsContext() {
  return useContext(LandsContext);
}

export { ProviderLands, useLandsContext };
