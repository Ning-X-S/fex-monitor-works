import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://localhost:7043',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  // chainWebpack(memo, opts = {
  //   ignore: true, // 启用 .eslintignore
  //   useEslintrc: true // 启用 .eslintrc
  //   }) {
  //   memo.module
  //     .rule('eslint')
  //     .use('eslint-loader')
  //     .tap(options => ({
  //       ...options,
  //       ...opts,
  //     }))
  // }
});
