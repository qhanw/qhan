// explain: https://unocss.dev/guide/extracting#extracting-from-build-tools-pipeline
// @unocss-include

export type Route = {
  path?: string;
  element?: string;
  name?: string;
  icon?: React.ReactNode;
  index?: boolean;
  layout?: string;
  access?: string;
  children?: Route[];
  redirect?: string;
  hideInMenu?: boolean;
};

const routes: Route[] = [
  {
    path: '/',
    layout: './layouts/BaseLayout',
    children: [
      { path: 'lands', name: 'lands', element: './lands' },
      { path: 'ads', name: 'ads', element: './ads' },
      { path: 'recharge', name: 'recharge', element: './recharge' },

      { path: '*', element: './exception/404' },
    ],
  },

  { path: '*', element: './exception/404' },
];

export default routes;
