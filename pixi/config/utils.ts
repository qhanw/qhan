import type { Route } from './base';

export function getFullPath(curr: Route, parentPath?: string) {
  const path = curr.path;
  return {
    ...curr,
    path: path?.startsWith('/')
      ? path
      : '/' +
        [...(parentPath?.split('/') || []), ...(path?.split('/') || [])].filter(Boolean).join('/'),
  };
}
