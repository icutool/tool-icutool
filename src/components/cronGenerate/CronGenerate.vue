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
                    <input type="number" v-model.number="secondRangeStart" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="unitRange" placeholder="起始秒" />
                    到
                    <input type="number" v-model.number="secondRangeEnd" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="unitRange" placeholder="结束秒" />
                    秒 (每秒执行)
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="secondMode" value="step" @click="() => cancleSelectMode('step')" /> 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="secondStepStart" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="0" :max="unitRange" />
                    秒开始, 每
                    <input type="number" v-model.number="secondStepInterval" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="unitRange" />
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
                        @change="() => updateTimeValue('custom')">
                        <input type="checkbox" :value="number" v-model="secondSelectedNumbers" />
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
            <div>
              <div>
                <label class="left-align">
                  <input type="radio" v-model="minuteMode" value='every' @click="() => cancleSelectMode('every')" />
                  每分钟执行
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="minuteMode" value="range" @click="() => cancleSelectMode('range')" />
                  周期性执行 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="minuteRangeStart" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="unitRange" placeholder="起始分" />
                    到
                    <input type="number" v-model.number="minuteRangeEnd" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="unitRange" placeholder="结束分" />
                    分钟 (每分钟执行)
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="minuteMode" value="step" @click="() => cancleSelectMode('step')" /> 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="minuteStepStart" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="0" :max="unitRange" />
                    分钟开始, 每
                    <input type="number" v-model.number="minuteStepInterval" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="unitRange" />
                    分钟执行一次
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="minuteMode" value="custom" @click="() => cancleSelectMode('custom')" />
                  指定分钟数(可多选)
                  <div class="numbers">
                    <div v-for="(row, index) in numberRows" :key="index" class="row">
                      <label v-for="number in row" :key="number" class="number"
                        @change="() => updateTimeValue('custom')">
                        <input type="checkbox" :value="number" v-model="minuteSelectedNumbers" />
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
            <div>
              <div>
                <label class="left-align">
                  <input type="radio" v-model="hourMode" value='every' @click="() => cancleSelectMode('every')" />
                  每小时执行
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="hourMode" value="range" @click="() => cancleSelectMode('range')" />
                  周期性执行 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="hourRangeStart" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="hourUnitRange" placeholder="起始时" />
                    到
                    <input type="number" v-model.number="hourRangeEnd" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="hourUnitRange" placeholder="结束时" />
                    小时 (每小时执行)
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="hourMode" value="step" @click="() => cancleSelectMode('step')" /> 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="hourStepStart" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="0" :max="hourUnitRange" />
                    时开始, 每
                    <input type="number" v-model.number="hourStepInterval" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="hourUnitRange" />
                    小时执行一次
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="hourMode" value="custom" @click="() => cancleSelectMode('custom')" />
                  指定小时数(可多选)
                  <div class="numbers">
                    <div v-for="(row, index) in hourNumberRows" :key="index" class="row">
                      <label v-for="number in row" :key="number" class="number"
                        @change="() => updateTimeValue('custom')">
                        <input type="checkbox" :value="number" v-model="hourSelectedNumbers" />
                        {{ number }}
                      </label>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </el-tab-pane>

          <!-- Day Selection -->
          <el-tab-pane label="日" name="day">
            <div>
              <div>
                <label class="left-align">
                  <input type="radio" v-model="dayMode" value='every' @click="() => cancleSelectMode('every')" />
                  每日执行
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="dayMode" value='?' @click="() => cancleSelectMode('?')" />
                  不指定
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="dayMode" value="range" @click="() => cancleSelectMode('range')" />
                  周期性执行 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="dayRangeStart" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="1" :max="31" placeholder="起始日" />
                    到
                    <input type="number" v-model.number="dayRangeEnd" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="1" :max="31" placeholder="结束日" />
                    日
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="dayMode" value="step" @click="() => cancleSelectMode('step')" /> 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="dayStepStart" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="31" />
                    日开始, 每
                    <input type="number" v-model.number="dayStepInterval" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="31" />
                    天执行一次
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="dayMode" value="custom" @click="() => cancleSelectMode('custom')" />
                  指定日期(可多选)
                  <div class="numbers">
                    <div v-for="(row, index) in dayNumberRows" :key="index" class="row">
                      <label v-for="number in row" :key="number" class="number"
                        @change="() => updateTimeValue('custom')">
                        <input type="checkbox" :value="number" v-model="daySelectedNumbers" />
                        {{ number }}
                      </label>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </el-tab-pane>

          <!-- Month Selection -->
          <el-tab-pane label="月份" name="month">
            <div>
              <div>
                <label class="left-align">
                  <input type="radio" v-model="monthMode" value='every' @click="() => cancleSelectMode('every')" />
                  每月执行
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="monthMode" value="range" @click="() => cancleSelectMode('range')" />
                  周期性执行 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="monthRangeStart" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="1" :max="12" placeholder="起始月" />
                    到
                    <input type="number" v-model.number="monthRangeEnd" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="1" :max="12" placeholder="结束月" />
                    月
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="monthMode" value="step" @click="() => cancleSelectMode('step')" /> 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="monthStepStart" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="12" />
                    月开始, 每
                    <input type="number" v-model.number="monthStepInterval" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="12" />
                    月执行一次
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="monthMode" value="custom" @click="() => cancleSelectMode('custom')" />
                  指定月份(可多选)
                  <div class="numbers">
                    <div v-for="(row, index) in monthNumberRows" :key="index" class="row">
                      <label v-for="number in row" :key="number" class="number"
                        @change="() => updateTimeValue('custom')">
                        <input type="checkbox" :value="number" v-model="monthSelectedNumbers" />
                        {{ number }}
                      </label>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </el-tab-pane>

          <!-- Weekday of Week Selection -->
          <el-tab-pane label="星期" name="weekday">
            <div>
              <div>
                <label class="left-align">
                  <input type="radio" v-model="weekdayMode" value='every' @click="() => cancleSelectMode('every')" />
                  每周执行
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="weekdayMode" value="range" @click="() => cancleSelectMode('range')" />
                  周期性执行 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="weekdayRangeStart" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="6" placeholder="起始星期" />
                    到
                    <input type="number" v-model.number="weekdayRangeEnd" @input="() => updateTimeValue('range')"
                      @focus="() => updateTimeValue('range')" min="0" :max="6" placeholder="结束星期" />
                    (0 代表周日)
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="weekdayMode" value="step" @click="() => cancleSelectMode('step')" /> 从
                  <div style="display: inline-block;">
                    <input type="number" v-model.number="weekdayStepStart" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="0" :max="6" />
                    开始, 每
                    <input type="number" v-model.number="weekdayStepInterval" @input="() => updateTimeValue('step')"
                      @focus="() => updateTimeValue('step')" min="1" :max="6" />
                    天执行一次
                  </div>
                </label>
              </div>

              <div>
                <label class="left-align">
                  <input type="radio" v-model="weekdayMode" value="custom" @click="() => cancleSelectMode('custom')" />
                  指定星期(可多选)
                  <div class="numbers">
                    <div v-for="(row, index) in weekdayNumberRows" :key="index" class="row">
                      <label v-for="number in row" :key="number" class="number"
                        @change="() => updateTimeValue('custom')">
                        <input type="checkbox" :value="number" v-model="weekdaySelectedNumbers" />
                        {{ number }}
                      </label>
                    </div>
                  </div>
                </label>
              </div>
            </div>
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
      activeTab: 'day',
      secend: '*',
      minute: '*',
      hour: '*',
      day: '*',
      month: '*',
      weekday: '*',
      cronExpression: '',
      unitRange: 59,
      hourUnitRange: 23,

      secondMode: 'every',
      minuteMode: 'every',
      hourMode: 'every',
      dayMode: 'every',
      monthMode: 'every',
      weekdayMode: 'every',

      secondRangeStart: 0,
      minuteRangeStart: 0,
      hourRangeStart: 0,
      dayRangeStart: 1,
      monthRangeStart: 1,
      weekdayRangeStart: 0,

      secondRangeEnd: 59,
      minuteRangeEnd: 59,
      hourRangeEnd: 23,
      dayRangeEnd: 31,
      monthRangeEnd: 12,
      weekdayRangeEnd: 6,

      secondStepStart: 0,
      minuteStepStart: 0,
      hourStepStart: 0,
      dayStepStart: 1,
      monthStepStart: 1,
      weekdayStepStart: 0,

      minuteStepInterval: 1,
      secondStepInterval: 1,
      hourStepInterval: 1,
      dayStepInterval: 1,
      monthStepInterval: 1,
      weekdayStepInterval: 1,

      secondSelectedNumbers: [],
      minuteSelectedNumbers: [],
      hourSelectedNumbers: [],
      daySelectedNumbers: [],
      monthSelectedNumbers: [],
      weekdaySelectedNumbers: [],
      numberRows: [
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'],
        ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
        ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
        ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39'],
        ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
        ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      ],
      hourNumberRows: [
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ],
      dayNumberRows: [
        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
        ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      ],
      weekdayNumberRows: [
        ['01', '02', '03', '04', '05', '06'],
      ],
      monthNumberRows: [
        ['01', '02', '03', '04', '05', '06'],
        ['07', '08', '09', '10', '11', '12'],
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
      if (this.activeTab == 'second') {
        this.secondSelectedNumbers = [];
      } else if (this.activeTab == 'minute') {
        this.minuteSelectedNumbers = [];
      } else if (this.activeTab == 'hour') {
        this.hourSelectedNumbers = [];
      } else if (this.activeTab == 'day') {
        this.daySelectedNumbers = [];
      }
      this.updateTimeValue(modeVlue);
    },
    updateTimeValue(modeVlue) {
      var value;
      console.log(modeVlue)
      if (modeVlue == 'range') {
        if (this.activeTab == 'second') {
          value = `${this.secondRangeStart}-${this.secondRangeEnd}`;
        } else if (this.activeTab == 'minute') {
          value = `${this.minuteRangeStart}-${this.minuteRangeEnd}`;
        } else if (this.activeTab == 'hour') {
          value = `${this.hourRangeStart}-${this.hourRangeEnd}`;
        } else if (this.activeTab == 'day') {
          value = `${this.dayRangeStart}-${this.dayRangeEnd}`;
        }
      } else if (modeVlue == 'step') {
        if (this.activeTab == 'second') {
          value = `${this.secondStepStart}-${this.secondStepInterval}`;
        } else if (this.activeTab == 'minute') {
          value = `${this.minuteStepStart}/${this.minuteStepInterval}`;
        } else if (this.activeTab == 'hour') {
          value = `${this.hourStepStart}-${this.hourStepInterval}`;
        } else if (this.activeTab == 'day') {
          value = `${this.dayStepStart}-${this.dayStepInterval}`;
        }
      } else if (modeVlue == 'custom') {
        if (this.activeTab == 'second') {
          value = this.secondSelectedNumbers.map(num => String(parseInt(num))).join(',');
        } else if (this.activeTab == 'minute') {
          value = this.minuteSelectedNumbers.map(num => String(parseInt(num))).join(',');
        } else if (this.activeTab == 'hour') {
          value = this.hourSelectedNumbers.map(num => String(parseInt(num))).join(',');
        } else if (this.activeTab == 'day') {
          value = this.daySelectedNumbers.map(num => String(parseInt(num))).join(',');
        }
      } else if (modeVlue == '?') {
        value = '?'
      } else if (modeVlue == 'every') {
        value = '*'
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
      } else if (this.activeTab == 'hour') {
        this.hour = value;
        if (this.hourMode != modeVlue) {
          this.hourMode = modeVlue;
        }
      } else if (this.activeTab == 'day') {
        this.day = value;
        if (this.dayMode != modeVlue) {
          this.dayMode = modeVlue;
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
