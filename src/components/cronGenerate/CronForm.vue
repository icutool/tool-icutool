<template>
    <div class="cron-form">
      <h2>选择 Cron 表达式的时间规则</h2>
      <form @submit.prevent="submitForm">
        <!-- Minute Selection -->
        <div class="input-group">
          <label for="minute">分钟:</label>
          <select v-model="minute" id="minute">
            <option value="*" selected>每分钟</option>
            <option value="0">0</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>
  
        <!-- Hour Selection -->
        <div class="input-group">
          <label for="hour">小时:</label>
          <select v-model="hour" id="hour">
            <option value="*" selected>每小时</option>
            <option value="0">0</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
          </select>
        </div>
  
        <!-- Day Selection -->
        <div class="input-group">
          <label for="day">日期:</label>
          <select v-model="day" id="day">
            <option value="*" selected>每天</option>
            <option value="1">1</option>
            <option value="15">15</option>
          </select>
        </div>
  
        <!-- Month Selection -->
        <div class="input-group">
          <label for="month">月份:</label>
          <select v-model="month" id="month">
            <option value="*" selected>每月</option>
            <option value="1">1</option>
            <option value="6">6</option>
            <option value="12">12</option>
          </select>
        </div>
  
        <!-- Day of Week Selection -->
        <div class="input-group">
          <label for="weekday">星期:</label>
          <select v-model="weekday" id="weekday">
            <option value="*" selected>每周</option>
            <option value="0">周日</option>
            <option value="1">周一</option>
            <option value="2">周二</option>
          </select>
        </div>
  
        <div class="input-group">
          <button type="submit">生成 Cron 表达式</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        minute: "*",
        hour: "*",
        day: "*",
        month: "*",
        weekday: "*"
      };
    },
    methods: {
      submitForm() {
        const cron = `${this.minute} ${this.hour} ${this.day} ${this.month} ${this.weekday}`;
        this.$emit('generate-cron', cron);
      }
    }
  };
  </script>
  
  <style scoped>
  .cron-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  input, select, button {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #35495e;
  }
  </style>
  