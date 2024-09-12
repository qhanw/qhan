declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  // common query params
  type Qs = {
    current?: number;
    pageSize?: number;
    sort?: Record<string, 'ascend' | 'descend' | null>;
  };

  // 分页数据类型
  type ResPagination<T> = { lists: T[]; current: number; pageSize: number; total: number };

  type EnumItem = { label: string; value: string | number; [propName: string]: string | number };

  type ResEnum<T = EnumItem[]> = T;
}

declare module 'clipper-lib';
declare module 'ali-oss';

// src/global.d.ts
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
