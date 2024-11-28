import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import TimestampConverter from '../components/TimestampConverter.vue';
import IpInfo from '../components/IpInfo.vue';
import CronExp from '../components/cronGenerate/CronExp.vue';
import CronGenerate from '../components/cronGenerate/CronGenerate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/timestamp-converter',
    name: 'TimestampConverter',
    component: TimestampConverter,
  },
  {
    path: '/ip',
    name: 'IpInfo',
    component: IpInfo,
  },
  {
    path: '/cron',
    name: 'Cron表达式',
    component: CronExp,
  },
  {
    path: '/cronGenerate',
    name: 'Cron表达式生成',
    component: CronGenerate,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
