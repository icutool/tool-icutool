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
export default {
  data() {
    return {
      inputTime: "",
      formItems: [
        { label: "本地时间", value: "" },
        { label: "UTC时间", value: "" },
        { label: "JS时间", value: "" },
        { label: "ISO 8601", value: "" },
        { label: "RFC 2822", value: "" },
        { label: "Timestamp（毫秒）", value: "" },
        { label: "Unix timestamp（秒）", value: "" },
        { label: "Timestamp HEX", value: "" }
      ]
    };
  },
  methods: {
    copyToClipboard(value) {
      navigator.clipboard.writeText(value).then(() => {
        this.$message.success("复制成功");
      });
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
