import type { Route } from './base';
import base from './base';
import { access } from './access';
import { getFullPath } from './utils';

const genMenus = function f(r: Route[], parent?: Route) {
  return r.reduce((prev, curr) => {
    const { index, children, icon, path } = curr;

    if (index) curr.path = parent?.path || '/';

    if (icon && typeof icon === 'string') {
      curr.icon = <span className={`anticon ${icon}`} />;
    }

    // full path
    // 补全 path 使路由变为绝对地址
    const fullPath = getFullPath(curr, parent?.path);

    // 权限过滤
    // 如果子页面没有权限配置则继承父级权限
    const realPath = path !== '*';
    const acc = fullPath.access || parent?.access;
    const pass = acc && realPath ? access[acc]?.(fullPath) : true;

    if (pass && realPath) {
      prev.push({
        ...fullPath,
        ...(children ? { children: f(children, { ...fullPath, access: acc }) } : {}),
      });
    }

    return prev;
  }, [] as Route[]);
};

export const menus = () => genMenus(base.filter((node) => node.path === '/')).at(-1);
