import type { Route } from './base';

// import { getUserInfo, getAuthKeys } from '@/utils/store';

type AuthProvider = {
  canAccess: (route?: Route) => void;
  [propName: string]: any;
};

export const access: AuthProvider = {
  canAccess: (route) => {
    // 如果是超级管理员
    const isAdmin = 'root' === 'root';
    if (isAdmin) return isAdmin;

    const authKeys = [] as string[];

    // 如果权限权限不存在
    if (!authKeys?.length || !route?.path) return false;

    const key = route.path.replace(/^\//, '').replace(/\//g, ':').toUpperCase().replace(/-/g, '_');

    return authKeys.includes(key);
  },
};
