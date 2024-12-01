const { defineConfig } = require('@vue/cli-service');
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path'); // 引入 path 模块

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
      ],
    };
  },
});
