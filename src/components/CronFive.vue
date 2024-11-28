<template>
    <div id="app">
        <div class="container">
            <div class="input-section">
                <label for="cron-input">表达式：</label>
                <input id="cron-input" v-model="cronExpression" placeholder="请输入Cron表达式" />
                <button class="execute-button" @click="calculateSchedule">执行</button>
            </div>

            <div v-if="executionTimes.length" class="results-section">
                <h3>接下来 7 次的执行时间</h3>
                <ul>
                    <li v-for="(time, index) in executionTimes" :key="index">{{ time }}</li>
                </ul>
            </div>

            <div class="cron-express-section">
                <h3>Cron 表达式结构</h3>
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
            } catch (error) {
                alert("无效的Cron表达式，请检查后重试！");
            }
        },
    },
};
</script>

<style scoped>
#app {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 100%;
    max-width: 600px;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 30px; /* 将容器距离顶部设置为 30px */
}

.input-section {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

pre {
    background: #f8f8f8;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: justify;
}

.execute-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.execute-button:hover {
    background-color: #0056b3;
}

.results-section h3 {
    margin-bottom: 10px;
    color: #007bff;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    background: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 5px 0;
    padding: 8px 12px;
    font-size: 14px;
}

.cron-express-section {
    margin-top: 20px;
}

.cron-express-section pre {
    background: #f1f1f1;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
    overflow-x: auto;
}

h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

label {
    font-weight: bold;
}
</style>
