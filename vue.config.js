const { resolve } = require('path');

module.exports = {
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@component', resolve('src/component'))
      .set('@common', resolve('src/common'))
      .set('@pages', resolve('src/pages'))
      .set('@utils', resolve('src/utils'))
      .set('@apis', resolve('src/apis'));
    // 配置忽略文件的后缀名
    config.resolve.extensions.add('.styl');
    // 配置css预处理全局样式（主要是全局变量）
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('stylus').oneOf(type)));
  },
  devServer: {
    port: '8080',
    proxy: {
      '/proxy': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '/',
        },
      },
    },
  },
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [resolve('src/common/styles/variables.styl')],
    });
}
