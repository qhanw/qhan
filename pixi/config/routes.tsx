import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import type { Route } from './base';
import base from './base';
import { access } from './access';
import { getFullPath } from './utils';

import ErrorBoundary from '@/pages/exception/ErrorBoundary';

const lazyLoad = (src: any) => (
  <Suspense fallback={<Spin spinning />}>{React.createElement(lazy(src))}</Suspense>
);

// 动态路由配置
const pages = import.meta.glob([
  '/src/{pages,layouts}/**/*.{ts,tsx,js,jsx}',
  '!**/{components,utils,services,auth,modals,map}',
  '!**/{utils,util,service,services,auth,modal}.{ts,tsx,js,jsx}',
  '!**/*.{d.ts,json}',
]);

const exception = {
  403: '/src/pages/exception/403',
  404: '/src/pages/exception/404',
  500: '/src/pages/exception/500',
  ErrorBoundary: '/src/pages/exception/ErrorBoundary',
};

const metaPages = Object.entries(pages).reduce(
  (prev, [key, val]) => ({
    ...prev,
    [key.replace(/(\/index)?\.tsx$/, '')]: val,
  }),
  {} as any,
);

/**
 * 根据配置文件解析路由
 * @param r 路由配置
 * @param allow 继承父级权限
 * @returns 路由配置
 */
const genRoutes = function f(r: Route[], parent?: Route): any {
  return r.map((curr) => {
    const { index, path, layout, element, children, redirect, access: acc } = curr;
    // 如果不存在 layout 和 页面组件，表示当前路由层为无布局容器页
    const isEmptyContainer = !(layout || element);

    let page;
    if (!isEmptyContainer) {
      const replacer = `/src/${layout ? '' : 'pages/'}`;
      page = metaPages[(layout ?? element)!.replace('./', replacer)];
    }

    const elem = page ?? metaPages[exception[404]];

    // full path
    // 补全 path 使路由变为绝对地址
    const fullPath = getFullPath(curr, parent?.path);

    return {
      loader: () => {
        // 鉴权权限
        // 先判断父级权限，现判断子页权限

        const p = parent?.access && access[parent?.access](fullPath);
        const c = acc && access[acc](fullPath);
        const pass = p ?? c ?? true;

        const realPath = path !== '*'; // 是否为真实路由地址
        if (!pass && realPath) throw new Response('Not Authorized', { status: 403 });

        return null;
      },
      errorElement: <ErrorBoundary />, // lazyLoad(metaPages[exception.ErrorBoundary]),
      element: isEmptyContainer ? <Outlet /> : lazyLoad(elem),
      ...(index ? { index } : { path }),
      ...(redirect ? { element: <Navigate to={redirect} replace /> } : {}),
      ...(children ? { children: f(children, fullPath) } : {}),
    };
  });
};

export const routes = genRoutes(base);
