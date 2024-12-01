<template>
  <div id="app">
    <!-- CronForm Component -->
    <div class="container">
      <div class="tab">
        <h2>选择 Cron 表达式的时间规则</h2>
        <el-tabs v-model="activeTab" value='second' type="card">
          <!-- second Selection -->
          <el-tab-pane label="秒钟" name="second">
            <div>
              <div>
                <label class="left-align">
                  <input type="radio" v-model="secondMode" value='every' @click="() => cancleSelectMode('every')" />
                  每秒执行
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="secondMode" value="range" @click="() => cancleSelectMode('range')" />
                  周期性执行 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="minuteRangeStart" @input="() => updateMinuteValue('range')"
                      @focus="() => updateMinuteValue('range')" min="0" :max="unitRange" placeholder="起始秒" />
                    到
                    <input type="number" v-model.number="minuteRangeEnd" @input="() => updateMinuteValue('range')"
                      @focus="() => updateMinuteValue('range')" min="0" :max="unitRange" placeholder="结束秒" />
                    秒 (每秒执行)
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="secondMode" value="step" @click="() => cancleSelectMode('step')" /> 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="minuteStepStart" @input="() => updateMinuteValue('step')"
                      @focus="() => updateMinuteValue('step')" min="0" :max="unitRange" />
                    秒开始, 每
                    <input type="number" v-model.number="minuteStepInterval" @input="() => updateMinuteValue('step')"
                      @focus="() => updateMinuteValue('step')" min="1" :max="unitRange" />
                    秒执行一次
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="secondMode" value="custom" @click="() => cancleSelectMode('custom')" />
                  指定秒数(可多选)
                  <div class="numbers">
                    <div v-for="(row, index) in numberRows" :key="index" class="row">
                      <label v-for="number in row" :key="number" class="number"
                        @change="() => updateMinuteValue('custom')">
                        <input type="checkbox" :value="number" v-model="selectedNumbers" />
                        {{ number }}
                      </label>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </el-tab-pane>

          <!-- Minute Selection -->
          <el-tab-pane label="分钟" name="minute">

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
      </div>
      <div class="input-group">
        <button @click="generateCronExpression">生成 Cron 表达式</button>
      </div>
      <!-- CronResult Component -->
      <div class="cron-result">
        <h2>生成的 Cron 表达式</h2>
        <p>{{ cronExpression }}</p>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  data() {
    return {
      activeTab: 'second',
      secend: '*',
      minute: '*',
      hour: '*',
      day: '*',
      month: '*',
      weekday: '*',
      cronExpression: '',
      unitRange: 59,

      secondMode: 'every',
      minuteMode: 'every',

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
      const cron = `${this.secend} ${this.minute} ${this.hour} ${this.day} ${this.month} ${this.weekday}`;
      this.cronExpression = cron;
    },
    cancleSelectMode(modeVlue) {
      console.log('cancleSelectMode');
      this.selectedNumbers = [];
      this.updateMinuteValue(modeVlue);
      console.log(this.activeTab);
    },
    updateMinuteValue(modeVlue) {
      if (this.activeTab == 'second' || this.activeTab == 'minute') {
        var value;
        if (modeVlue == 'range') {
          value = `${this.minuteRangeStart}-${this.minuteRangeEnd}`;
        } else if (modeVlue == 'step') {
          value = `${this.minuteStepStart}/${this.minuteStepInterval}`;
        } else if (modeVlue == 'custom') {
          console.log(this.selectedNumbers);
          value = this.selectedNumbers.map(num => String(parseInt(num))).join(',');
        }
        if (this.activeTab == 'second') {
          this.secend = value;
          if (this.secondMode != modeVlue) {
            this.secondMode = modeVlue;
          }
        } else if (this.activeTab == 'minute') {
          this.minute = value;
          if (this.minuteMode != modeVlue) {
            this.minuteMode = modeVlue;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  color: #706f6f;
  padding: 20px;
  /* 设置内边距 */
  min-height: 80vh;
  /* 设置最小高度 */
  display: flex;
  /* 使用 flex 布局 */
  justify-content: center;
  /* 水平居中 */
}

.container {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 70vh;
  /* 设置总高度为视口高度 */
}

.tab {
  flex: 5;
  /* 70% 高度 */
}

.input-group {
  flex: 1;
  /* 10% 高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.cron-result {
  flex: 2;
  /* 20% 高度 */
  background: #f1f1f1;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  /* 如果内容超出可滚动 */
}

.left-align {
  text-align: left;
  margin-top: 1vh;
  display: block;
  /* 使其成为块级元素，确保左对齐 */
}

.numbers {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  /* 距离左右边框10px */
}

.row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.number {
  width: 50%;
  /* 设置每个数字占据 50% 宽度 */
  box-sizing: border-box;
  /* 确保宽度包括内边距和边框 */
  text-align: center;
  display: flex;
}
</style>
