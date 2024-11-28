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
          <template slot="title">网络工具</template>
          <el-menu-item index="/encoding">编码/加密</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="navbar-right">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="register">注册</el-button>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
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
  methods: {
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
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
</style>
