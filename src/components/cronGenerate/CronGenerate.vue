<template>
  <div id="app">
    <h1>Cron 表达式生成器</h1>

    <!-- CronForm Component -->
    <div class="cron-form">
      <h2>选择 Cron 表达式的时间规则</h2>
      <el-tabs v-model="activeTab" type="card">
        <!-- Minute Selection -->
        <el-tab-pane label="分钟" name="minute">
          <div>
            <div>
              <label class="left-align">
                <input type="radio" v-model="minuteMode" value="*" /> 每秒执行 (允许的通配符: *, -, /)
              </label>
            </div>
            <div>
              <label class="left-align">
                <input type="radio" v-model="minuteMode" value="range" /> 周期 从
                <input type="number" v-model.number="minuteRangeStart" min="0"
                  :max="unitRange" />
                -到
                <input type="number" v-model.number="minuteRangeEnd" min="0"
                  :max="unitRange" />
                秒
              </label>
            </div>
            <div>
              <label class="left-align">
                <input type="radio" v-model="minuteMode" value="step" /> 从
                <input type="number" v-model.number="minuteStepStart" min="0"
                  :max="unitRange" />
                秒开始, 每
                <input type="number" v-model.number="minuteStepInterval" min="1"
                  :max="unitRange" />
                秒执行一次
              </label>
            </div>

            <div>
              <label class="left-align">
                <input type="radio" v-model="minuteMode" value="numbers" /> 指定
                <div class="numbers">
                  <div v-for="(row, index) in numberRows" :key="index" class="row">
                    <label v-for="number in row" :key="number" class="number">
                      <input type="checkbox" :value="number" v-model="selectedNumbers" />
                      {{ number }}
                    </label>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </el-tab-pane>

        <!-- Hour Selection -->
        <el-tab-pane label="小时" name="hour">
          <!-- <cron-unit v-model="hour" :unitRange="23" /> -->
        </el-tab-pane>

        <!-- Day Selection -->
        <el-tab-pane label="日期" name="day">
          <!-- <cron-unit v-model="day" :unitRange="31" /> -->
        </el-tab-pane>

        <!-- Month Selection -->
        <el-tab-pane label="月份" name="month">
          <!-- <cron-unit v-model="month" :unitRange="12" /> -->
        </el-tab-pane>

        <!-- Day of Week Selection -->
        <el-tab-pane label="星期" name="weekday">
          <!-- <cron-unit v-model="weekday" :unitRange="7" :customLabels="['周日', '周一', '周二', '周三', '周四', '周五', '周六']" /> -->
        </el-tab-pane>
      </el-tabs>
      <div class="input-group">
        <button @click="generateCronExpression">生成 Cron 表达式</button>
      </div>
    </div>

    <!-- CronResult Component -->
    <div class="cron-result">
      <h2>生成的 Cron 表达式</h2>
      <p>{{ cronExpression }}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeTab: 'minute',
      minute: '*',
      hour: '*',
      day: '*',
      month: '*',
      weekday: '*',
      cronExpression: '',
      unitRange: 59,
      minuteMode: '*',
      minuteRangeStart: 0,
      minuteRangeEnd: 59,
      minuteStepStart: 0,
      minuteStepInterval: 1,
      selectedNumbers: [],
      numberRows: [
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'],
        ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
        ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
        ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39'],
        ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
        ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      ],
    };
  },
  methods: {
    generateCronExpression() {
      const cron = `${this.minute} ${this.hour} ${this.day} ${this.month} ${this.weekday}`;
      this.cronExpression = cron;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

.cron-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.left-align {
    text-align: left;
    display: block; /* 使其成为块级元素，确保左对齐 */
}

.numbers {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.number {
  width: 10%; /* 设置每个数字占据 10% 宽度 */
  box-sizing: border-box; /* 确保宽度包括内边距和边框 */
  text-align: center;
}
</style>
