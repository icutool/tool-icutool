<template>
    <div id="app">
        <div class="container">
            <div class="input-section">
                <label for="cron-input">表达式：</label>
                <input id="cron-input" v-model="cronExpression" placeholder="请输入Cron表达式" />
                <button class="execute-button" @click="calculateSchedule">执行</button>
            </div>

            <h3>点击执行显示接下来 7 次的执行时间</h3>
            <div v-if="executionTimes.length" class="results-section">
                <ul>
                    <li v-for="(time, index) in executionTimes" :key="index">{{ time }}</li>
                </ul>
            </div>

            <div class="cron-express-section">
                <h3>Cron 表达式结构</h3>
                <pre><code>Crontab 五位和六位cron表达式的区别是秒的区别,五位没有秒,而六位有秒
*    *    *    *    *    *    
-    -    -    -    -    -    
|    |    |    |    |    |    
|    |    |    |    |    |    
|    |    |    |    |    +----- 星期几 day of week (0 - 7) (6和7都表示周日)
|    |    |    |    +---------- 月份 month (1 - 12)
|    |    |    +--------------- 天数 day of month (1 - 31)
|    |    +-------------------- 小时 hour (0 - 23)
|    +------------------------- 分钟 min (0 - 59)
+------------------------------ 秒(可选) sec (0 - 59)
</code></pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    metaInfo() {
        return {
            title: 'Cron表达式解析 - icutool编程工具',
            meta: [
                { name: 'description', content: '使用icutool的Cron表达式解析器，轻松生成和解析定时任务表达式，专为程序员打造的实用工具。' },
                { name: 'keywords', content: 'Cron表达式, Cron解析, Cron生成器, 定时任务表达式, 程序员工具, icutool' },
                { name: 'author', content: 'icutool' },
                { name: 'robots', content: 'index, follow' },
                { property: 'og:title', content: 'Cron表达式解析 - icutool编程工具' },
                { property: 'og:description', content: '使用icutool的Cron表达式解析器，快速生成和解析Cron表达式，提升开发效率，适合程序员日常使用。' },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: window.location.href }
            ]
        };
    },
    data() {
        return {
            cronExpression: "", // 用户输入的Cron表达式
            executionTimes: [], // 计算出的执行时间
        };
    },
    methods: {
        calculateSchedule() {
            if (!this.cronExpression) {
                this.$message.warning("请输入Cron表达式！")
                return;
            }
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
                this.$message.error("无效的Cron表达式，请检查后重试！")
                this.cronExpression = ""
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
    min-height: 80vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
}

.container {
    width: 100%;
    max-width: 600px;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
    background: #f7f7f7;
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
