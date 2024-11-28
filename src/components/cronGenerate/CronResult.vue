<template>
    <div class="cron-result">
      <h2>生成的 Cron 表达式</h2>
      <p>{{ cron }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cron: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .cron-result {
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  