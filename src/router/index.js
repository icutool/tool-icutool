import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import TimestampConverter from '../components/TimestampConverter.vue';
import IpInfo from '../components/IpInfo.vue';
import CronFive from '../components/CronFive.vue';

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
    path: '/cron5',
    name: '5位Cron表达式',
    component: CronFive,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
