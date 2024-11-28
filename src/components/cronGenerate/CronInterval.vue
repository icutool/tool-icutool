<template>
    <div class="interval-settings">
      <h2>间隔设置</h2>
      <div class="input-group">
        <label for="interval">每隔多少时间单位执行:</label>
        <input type="number" v-model="interval" min="1" />
      </div>
      <div class="input-group">
        <label for="unit">时间单位:</label>
        <select v-model="unit">
          <option value="minute">分钟</option>
          <option value="hour">小时</option>
          <option value="day">天</option>
        </select>
      </div>
      <button @click="submitInterval">确认设置</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        interval: 1,
        unit: 'minute'
      };
    },
    methods: {
      submitInterval() {
        let cronPart = '';
        switch (this.unit) {
          case 'minute':
            cronPart = `*/${this.interval}`;
            break;
          case 'hour':
            cronPart = `*/${this.interval}`;
            break;
          case 'day':
            cronPart = `*/${this.interval}`;
            break;
        }
        this.$emit('update-interval', cronPart);
      }
    }
  };
  </script>
  
  <style scoped>
  .interval-settings {
    margin: 20px 0;
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  