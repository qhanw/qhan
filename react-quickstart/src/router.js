import App   from './component/layout'; // 主页面模板结构
import Home  from './component/home'; // 主页面模板结构
import About from './component/about';
import Inbox from './component/inbox';
import Mall  from './component/mall';
import Me    from './component/me'

const Routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home, name:'首页' },
  childRoutes: [
    { path: 'about', name: '营养库', component: About },
    { path: 'inbox', name: '营养师', component: Inbox },
    { path: 'mall', name: '商城', component: Mall },
    { path: 'me', name:'我的',component: Me }
  ]
};

export default Routes;