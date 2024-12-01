<template>
    <div id="app">
        <!-- CronForm Component -->
        <div class="container">
            <div class="tab">
                <h2>选择 Cron 表达式的时间规则</h2>
                <el-tabs v-model="activeTab" value='second' type="card" class="custom-tabs">
                    <!-- second Selection -->
                    <el-tab-pane label="秒钟" name="second">

                    </el-tab-pane>

                    <!-- Minute Selection -->
                    <el-tab-pane label="分钟" name="minute">

                    </el-tab-pane>

                    <!-- Hour Selection -->
                    <el-tab-pane label="小时" name="hour">

                    </el-tab-pane>

                    <!-- Day Selection -->
                    <el-tab-pane label="日" name="day">

                    </el-tab-pane>

                    <!-- Month Selection -->
                    <el-tab-pane label="月份" name="month">

                    </el-tab-pane>

                    <!-- Weekday of Week Selection -->
                    <el-tab-pane label="星期" name="weekday">

                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="input-group">
                <button class='execute-button' @click="generateCronExpression">生成 Cron 表达式</button>
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
            activeTab: 'weekday',
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
                ['23', '24', '25', '26', '27', '28', '29', '30', '31'],
            ],
            weekdayNumberRows: [
                ['0', '1', '2', '3', '4', '5', '6'],
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
            } else if (this.activeTab == 'month') {
                this.monthSelectedNumbers = [];
            } else if (this.activeTab == 'weekday') {
                this.weekdayNumberRows = [];
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
                } else if (this.activeTab == 'month') {
                    value = `${this.monthRangeStart}-${this.monthRangeEnd}`;
                } else if (this.activeTab == 'weekday') {
                    value = `${this.weekdayRangeStart}-${this.weekdayRangeEnd}`;
                }
            } else if (modeVlue == 'step') {
                if (this.activeTab == 'second') {
                    value = `${this.secondStepStart}/${this.secondStepInterval}`;
                } else if (this.activeTab == 'minute') {
                    value = `${this.minuteStepStart}/${this.minuteStepInterval}`;
                } else if (this.activeTab == 'hour') {
                    value = `${this.hourStepStart}/${this.hourStepInterval}`;
                } else if (this.activeTab == 'day') {
                    value = `${this.dayStepStart}/${this.dayStepInterval}`;
                } else if (this.activeTab == 'month') {
                    value = `${this.monthStepStart}/${this.monthStepInterval}`;
                } else if (this.activeTab == 'weekday') {
                    value = `${this.weekdayStepStart}/${this.weekdayStepInterval}`;
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
                } else if (this.activeTab == 'month') {
                    value = this.monthSelectedNumbers.map(num => String(parseInt(num))).join(',');
                } else if (this.activeTab == 'weekday') {
                    value = this.weekdaySelectedNumbers.map(num => String(parseInt(num))).join(',');
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
            } else if (this.activeTab == 'month') {
                this.month = value;
                if (this.monthMode != modeVlue) {
                    this.monthMode = modeVlue;
                }
            } else if (this.activeTab == 'weekday') {
                this.weekday = value;
                if (this.weekdayMode != modeVlue) {
                    this.weekdayMode = modeVlue;
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

.execute-button {
    background-color: #0a7234;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

</style>