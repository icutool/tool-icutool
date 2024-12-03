const { defineConfig } = require('@vue/cli-service');
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path'); // 引入 path 模块
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;

    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, './dist'),
          routes: ['/', '/ip', '/timestamp-converter', '/cron', '/cronGenerate'], // 需要预渲染的路由
          renderer: new Renderer({
            inject: {
              foo: "bar",
            },
            headless: false,
            renderAfterDocumentEvent: 'render-event',
          }),
        }),

        // Gzip 压缩插件配置
        new CompressionWebpackPlugin({
          algorithm: 'gzip', // 使用 gzip 算法
          test: /\.js$|\.css$|\.html$/, // 匹配需要压缩的文件类型
          threshold: 10240, // 只处理大于此大小的文件（单位：字节）
          minRatio: 0.8, // 压缩率小于 0.8 的文件才会被压缩
          deleteOriginalAssets: false, // 不删除原始文件
        }),
      ],
    };
  },
});
