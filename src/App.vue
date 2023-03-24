<template>
  <div>
    <router-view :style="`width: ${width}px;height: ${height}px`" />

    <footer class='footer'> <a href="https://beian.miit.gov.cn/"> 苏ICP备20025058号-1 </a> </footer>
  </div>

</template>

<script>
import { computed } from 'vue'

export default {
  setup() {
    let width = computed(() => document.documentElement.clientWidth)
    let height = computed(() => document.documentElement.clientHeight)

    return { width, height }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* background-color: grey; */
  height: 100%;
  font-size: 14px;
  /* width: 1920px; */
}
* {
  margin: 0;
}
a {
  outline: none;
  color: #2d2e2f;
  text-decoration: none;
}

.footer {
  height: 40px;
  line-height: 40px;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  text-align: center;
  background-color: whitesmoke;
}
</style>

