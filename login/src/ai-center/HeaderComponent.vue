<template>
  <div class="head clearfix">
    <div class="home">
      <router-link to="/administrator">管理员界面</router-link>
    </div>
    <div class="menu menu1 pulll_left">
      <ul>
        <li><router-link to="/main_information">主要信息</router-link></li>
        <li><router-link to="/underwater_system">水下系统</router-link></li>
      </ul>
    </div>
    <h1 class="pulll_left">海洋牧场监测可视化系统</h1>
    <div class="menu menu2 pulll_left">
      <ul>
        <li><router-link to="/data_center">数据中心</router-link></li>
        <li><router-link to="/ai_center">智能中心</router-link></li>
      </ul>
    </div>
    <div class="time" id="showTime">{{ currentTime }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: ''
    };
  },
  mounted() {
    this.startTime();
  },
  methods: {
    startTime() {
      const updateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        this.currentTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        requestAnimationFrame(updateTime); // 递归调用，保证更新时机与浏览器的重绘时机同步
      };
      updateTime();
    }
  }
};
</script>

<style scoped>
/* 样式代码保持不变 */
</style>
