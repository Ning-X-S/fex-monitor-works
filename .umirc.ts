import { defineConfig } from 'umi';

export default defineConfig({
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/home',
      title: 'home.title',
      // exact: true,
      // redirect: '/index',
      routes: [
        {
          path: '/index',
          exact: true,
          component: '@/pages/index',
          title: 'index.title',
        },
        {
          path: '/test',
          exact: true,
          component: '@/pages/test',
          title: 'test.title',
        },
        {
          path: '/error/list',
          exact: true,
          component: '@/pages/list-error',
          title: 'list.title',
        },
        {
          path: '/error/detail/:name',
          exact: true,
          component: '@/pages/detail-error',
          title: 'detail.title',
        },
        {
          path: '/web/error_list',
          exact: true,
          component: '@/pages/web/error-list',
          title: 'list.title',
        },
      ],
    },
  ],
});
