<template>
  <div class="form-container">
    <label class="form-label">请输入需要转换的时间</label>
    <div class="input-group">
      <el-input class="form-control" type="text" v-model="inputTime"
        placeholder="支持Timestamp/Unix timestamp/ISO/RFC/UTC等多种时间格式" />
    </div>
    <div class="input-group" v-for="(item, index) in formItems" :key="index">
      <label class="input-group-text">{{ item.label }}</label>
      <el-input class="form-control" v-model="item.value" readonly />
      <a href="javascript:;" class="input-group-text btn-copy" @click="copyToClipboard(item.value)">复制</a>
    </div>
  </div>
</template>

<script>
import TimeConverter from '@/utils/timeConverter';
export default {
  metaInfo() {
    return {
      title: '时间戳转换 - icutool编程工具',
      meta: [
        { name: 'description', content: 'icutool提供专业的时间格式转换工具，支持时间戳与标准时间、UTC时间互相转换，快速解决开发中的时间处理问题。' },
        { name: 'keywords', content: '时间戳转换, 时间格式转换, UTC时间, 标准时间, 编程工具, 程序员工具, icutool' },
        { name: 'author', content: 'icutool' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: '时间格式互相转换 - icutool编程工具' },
        { property: 'og:description', content: '使用icutool的时间格式转换工具，轻松实现时间戳、标准时间、UTC时间之间的互转，提升开发效率。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href }
      ]
    };
  },
  data() {
    return {
      inputTime: "",
      formItems: [
        { label: "本地时间", value: "" },
        { label: "UTC时间", value: "" },
        { label: "ISO 8601", value: "" },
        { label: "RFC 2822", value: "" },
        { label: "Timestamp（毫秒）", value: "" },
        { label: "Unix timestamp（秒）", value: "" },
        { label: "Timestamp HEX", value: "" }
      ]
    };
  },
  watch: {
    inputTime(newTime) {
      this.formItems = [
        { label: "本地时间", value: "" },
        { label: "UTC时间", value: "" },
        { label: "ISO 8601", value: "" },
        { label: "RFC 2822", value: "" },
        { label: "Timestamp（毫秒）", value: "" },
        { label: "Unix timestamp（秒）", value: "" },
        { label: "Timestamp HEX", value: "" }
      ]
      let type = this.determineTimestampType(newTime);
      let timeInput;
      switch (type) {
        case '10Timestamp':
          timeInput = newTime + '000';
          break;
        case '13Timestamp':
          timeInput = newTime;
          break;
        case 'date':
          timeInput = new Date(newTime).getTime();
          break;
        default:
          console.log('未知格式,尝试使用Date处理');
          timeInput = new Date(newTime).getTime();
          break;
      }
      if (isNaN(timeInput)) {
        return;
      }
      console.log(timeInput);
      const converter = new TimeConverter(timeInput);
      this.formItems = converter.toAllFormats();
    }
  },
  methods: {
    copyToClipboard(value) {
      navigator.clipboard.writeText(value).then(() => {
        this.$message.success("复制成功");
      });
    },

    determineTimestampType(input) {
      // 检查输入是否为有效的字符串
      if (typeof input !== 'string' || input.trim() === '') {
        return 'error';
      }

      // 1. 判断是否为 10 位时间戳
      if (/^\d{10}$/.test(input)) {
        return '10Timestamp';
      }

      // 2. 判断是否为 13 位时间戳
      if (/^\d{13}$/.test(input)) {
        return '13Timestamp';
      }

      // 3. 判断是否为日期时间字符串（比如 "yyyy-MM-dd" 或 "yyyy-MM-dd HH:mm:ss"）
      // 正则表达式匹配日期时间格式
      const datePattern1 = /^\d{4}-\d{2}-\d{2}$/; // yyyy-MM-dd
      const datePattern2 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // yyyy-MM-dd HH:mm:ss
      const datePattern3 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/; //2024-11-18T09:48:05.492
      const datePattern4 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; //2024-11-18T09:48:05.492z
      const datePattern5 = new RegExp(
        `^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\\s
                            (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s
                            \\d{1,2}\\s
                            \\d{2}:\\d{2}:\\d{2}\\s
                            (CST|EST|PST|GMT|UTC|[A-Z]{3})\\s
                            \\d{4}$`
      );
      if (datePattern1.test(input) || datePattern2.test(input) || datePattern3.test(input) || datePattern4.test(input) || datePattern5.test(input)) {
        // 尝试将字符串转换为 Date 对象并判断是否合法
        const date = new Date(input);
        if (!isNaN(date.getTime())) {
          return 'date';
        }
      }

      // 如果不符合以上任何一种，返回 "Unknown"
      return 'error';
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  /* 去除下划线 */
}

label,
a {
  border-radius: 5px;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
}

.input-group {
  display: flex;
  align-items: center;
  margin: 8px 0;
  width: 800px;
}

.input-group-text {
  padding: 10px;
  background-color: #e9ecef;
  border: 1px solid #dcdfe6;
  color: #606266;
  font-size: 14px;
}

.form-control {
  flex: 1;
  margin: 0;
}

.btn-copy {
  cursor: pointer;
  color: #606266;
}
</style>
