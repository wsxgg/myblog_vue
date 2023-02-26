<template>
  <div class="homepage-box">
    <h1>首页</h1>
    <br>
    <br>

    <h2>广告位招租</h2>

    <br>
    <br>

    <el-button @click="router.push('/register')"> 注册 </el-button>
    <el-button @click="router.push('/login')"> 登录 </el-button>
  </div>

</template>

<script>
import router from '@/router/index'

export default {
  name: 'HomePageView',

  setup() {
    return { router }
  }
}
</script>

<style scoped>
.homepage-box {
  text-align: center;
}
</style>