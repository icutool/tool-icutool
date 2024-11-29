import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router/index";
import VueMeta from 'vue-meta'

Vue.use(ElementUI);
Vue.use(VueMeta);

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
       return h(App)
  },
  mounted () {//新增
         document.dispatchEvent(new Event('render-event'))
   }
 }).$mount('#app');
