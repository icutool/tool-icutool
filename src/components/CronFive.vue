<template>
    <div id="app">
        <div class="parent">
            <div>
                <label for="cron-input">表达式：</label>
                <input id="cron-input" v-model="cronExpression" placeholder="请输入Cron表达式" />
                <button @click="calculateSchedule">执行</button>
            </div>

            <div v-if="executionTimes.length">
                <h3>接下来7次的执行时间</h3>
                <ul>
                    <li v-for="(time, index) in executionTimes" :key="index">{{ time }}</li>
                </ul>
            </div>

            <div class="cronexpress">
                <h3>Cron表达式结构</h3>
                <pre><code>Crontab
*    *    *    *    *    
-    -    -    -    -    
|    |    |    |    |    
|    |    |    |    |    
|    |    |    |    +----- day of week (0 - 6) (some times Sunday=7)
|    |    |    +---------- month (1 - 12)
|    |    +--------------- day of month (1 - 31)
|    +-------------------- hour (0 - 23)
+------------------------- min (0 - 59)
</code></pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cronExpression: "", // 用户输入的Cron表达式
            executionTimes: [], // 计算出的执行时间
        };
    },
    methods: {
        calculateSchedule() {
            try {
                const cronParser = require("cron-parser"); // 安装依赖：npm install cron-parser
                const interval = cronParser.parseExpression(this.cronExpression);
                this.executionTimes = [];
                for (let i = 0; i < 7; i++) {
                    const date = new Date(interval.next().toString());
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    const formatTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
                    this.executionTimes.push(formatTime);
                }
                console.log(this.executionTimes);
            } catch (error) {
                alert("无效的Cron表达式，请检查后重试！");
            }
        },
    },
};
</script>

<style>
#app {
    font-family: Arial, sans-serif;
    padding: 20px;
}

ul {
    list-style-type: none; /* 去掉默认的列表样式 */
    padding: 0;           /* 移除默认内边距 */
    text-align: center;   /* 列表内容水平居中 */
}

li {
    text-align: center;   /* 列表项文字水平居中 */
    margin: 5px 0;        /* 每个列表项之间添加间距 */
}


pre {
    background: #f8f8f8;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: justify;
}

.parent {
    display: flex;
    flex-direction: column;
    /* 内容纵向排列 */
    align-items: center;
    /* 水平居中 */
    gap: 20px;
    /* 子项之间的间距 */
    padding-top: 30px;
    /* 距离顶部 30px */
    height: 70vh;
    /* 父容器高度占满视口 */
    justify-content: flex-start;
    /* 从顶部开始排列 */
}


.cronexpress {
    margin-top: 0;
    /* 不再需要额外的顶部间距 */
    width: 500px;
}
</style>