<template>
  <div id="app">
    <header class="navbar">
      <div class="navbar-left">
        <img src="./assets/logo.png" alt="Logo" class="logo" /> <!-- 添加logo -->
        <span class="site-title">icutool编程工具</span>
      </div>
      <el-menu :default-active="$route.path" router mode="horizontal" class="menu">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/timestamp-converter">时间戳转换</el-menu-item>
        <el-menu-item index="/ip">IP信息查询</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Cron表达式</template>
          <el-menu-item index="/cron">解析</el-menu-item>
          <el-menu-item index="/cronGenerate">生成</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">文本工具</template>
          <el-menu-item index="/yaml">yaml转换properties</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">网络工具</template>
          <el-menu-item index="/encoding">编码/加密</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="navbar-right">
        <button class="execute-button login-button" @click="login">登录</button>
        <button class="execute-button register-button" @click="register">注册</button>

      </div>
    </header>
    <router-view></router-view>
    <!-- 右下角反馈图标 -->
    <div class="feedback-container">
      <div class="feedback-icon" @click="showDialog = true">
        <i class="el-icon-message"></i>
      </div>
      <div class="tooltip">反馈</div>
    </div>

    <!-- 反馈弹窗 -->
    <el-dialog :visible.sync="showDialog" title="提交反馈" width="400px">
      <el-radio-group v-model="feedbackType">
        <el-radio label="0">BUG</el-radio>
        <el-radio label="1">建议</el-radio>
        <el-radio label="2">其他</el-radio>
      </el-radio-group>
      <el-input v-model="email" type="email" placeholder="联系邮箱📮" rows="1" @blur="validateEmail"></el-input>
      <el-input v-model="feedback" type="textarea" placeholder="请输入您的反馈" rows="6"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFeedback">取消</el-button>
        <el-button type="primary" @click="submitFeedback">提交</el-button>
      </span>
    </el-dialog>
    <footer class="footer">
      <div class="footer-content">
        <a href="https://beian.miit.gov.cn/" target="_blank">Copyright © 2019-2024 PB科技 皖ICP备19019230号-3</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { feedback } from "@/api/request";
export default {
  name: 'App',
  metaInfo() {
    return {
      title: 'icutool编程工具 - 时间戳转换、IP查询与编码工具',
      meta: [
        { name: 'description', content: 'icutool提供时间戳转换、IP地址查询、编解码工具，专为程序员打造。使用我们的网站，快速进行编程相关任务的工具查询。' },
        { name: 'keywords', content: '时间戳转换, IP查询, 编解码工具, 程序员工具, 网络工具, 编程工具' },
        { name: 'author', content: 'icutool' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'icutool编程工具 - 时间戳转换、IP查询与编码工具' },
        { property: 'og:description', content: 'icutool提供时间戳转换、IP地址查询、编解码工具，专为程序员打造。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href }
      ]
    };
  },
  data() {
    return {
      showDialog: false,  // 控制弹窗显示
      feedback: '',  // 存储反馈内容
      feedbackType: '0',
      email: '',
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (this.email && !emailRegex.test(this.email)) {
        this.$message.warning('请输入有效的邮箱地址');
        this.email = '';
      }
    },
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
    },
    submitFeedback() {
      if (this.feedback.trim() === '') {
        this.$message.warning('请输入反馈内容');
        return;
      }
      // 这里可以发送请求到后台保存反馈
      console.log('提交反馈:', this.feedback);
      feedback({ feedbackText: this.feedback, feedbackType: this.feedbackType, productType: 'tools', email: this.email }).then(res => {
        if (res.data.code == 200) {
          this.$message.success('反馈成功，感谢您的支持！');
          this.feedback = '';
          this.email = '';
        } else {
          console.log(res.msg);
          this.$message.error(res.data.message || "提交反馈失败,可直接联系QQ:599653466");
        }
      }).catch(error => {
        console.log(error.msg || error.message);
        this.$message.error("网络异常，请稍后再试！");
      });
      this.showDialog = false;
    },
    // 取消反馈
    cancelFeedback() {
      this.showDialog = false;
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}

.navbar {
  display: flex;
  /*将元素设置为弹性盒子模型显示，这样可以更容易地控制子元素的排列和对齐*/
  justify-content: space-between;
  /*在水平方向上均匀分布子元素，第一个子元素紧贴容器的开始位置，最后一个子元素紧贴容器的结束位置，中间的子元素平均分配剩余的空间。*/
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.site-title {
  font-size: 20px;
  font-weight: bold;
  color: #1c1717;
}

.menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.el-menu--horizontal {
  background-color: transparent;
}

.el-menu-item,
.el-submenu__title {
  color: #fff;
}

.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #555;
  color: #fff;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.el-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  /* 使文字看起来更清晰 */
  text-align: center;
  line-height: 0%;
  /* 确保文本行高合适 */
  padding: 0 15px;
  /* 控制按钮内边距 */
}

.execute-button {
  background-color: #409eff;
  color: #fff;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.execute-button:first-child {
  margin-right: 10px;
  /* 只为第一个按钮添加右边距 */
}

.login-button {
  background-color: #409eff;
  /* 蓝色背景 */
  border: 1px solid #409eff;
  /* 灰色边框 */
}

.register-button {
  background-color: #ffffff;
  /* 绿色背景 */
  color: #000;
  border: 1px solid #ccc;
  /* 灰色边框 */
}

.footer {
  position: fixed;
  /* 固定在页面底部 */
  bottom: 10px;
  /* 距离底部10px */
  left: 0;
  width: 100%;
  /* 确保宽度拉满页面 */
  text-align: center;
  /* 可选：居中对齐内容 */
  padding: 10px;
  /* 可选：内边距 */
}

.footer-content a {
  text-decoration: none;
  color: #000;
  font-size: 8%;
  font-weight: 500;
  /* 使文字看起来更清晰 */
  text-align: center;
  line-height: 0%;
  /* 确保文本行高合适 */
  padding: 0 15px;
  /* 控制按钮内边距 */
}

.feedback-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

.feedback-icon {
  background-color: #32CD32;
  color: white;
  border-radius: 50%;
  /* 使按钮成为圆形 */
  font-size: 24px;
  width: 60px;
  /* 设置固定的宽度 */
  height: 60px;
  /* 设置固定的高度，与宽度相等，确保按钮是圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  position: relative;
}

.tooltip {
  display: none;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 10000;
}

.feedback-container:hover .tooltip {
  display: block;
}

.dialog-footer {
  display: flex;
  /* 使用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  gap: 10px;
  /* 设置按钮之间的间距 */
  padding: 10px 0;
  /* 添加适当的内边距 */
}

.dialog-footer .el-button {
  display: flex;
  /* 使用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  padding: 0 15px;
  /* 调整按钮内边距，保持内容居中 */
}
</style>
