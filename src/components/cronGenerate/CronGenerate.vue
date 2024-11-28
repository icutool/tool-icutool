<template>
    <div id="app">
      <h1>Cron 表达式生成器</h1>
      <CronForm @generate-cron="generateCron" />
      <CronResult :cron="cronExpression" />
    </div>
  </template>
  
  <script>
  import CronForm from './CronForm.vue';
  import CronResult from './CronResult.vue';
  
  export default {
    components: {
      CronForm,
      CronResult
    },
    data() {
      return {
        cronExpression: ''
      };
    },
    methods: {
      generateCron(cron) {
        this.cronExpression = cron;
      }
    }
  };
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
  }
  </style>
  