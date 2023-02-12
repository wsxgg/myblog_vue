<template>
  <div class='header'>
    <el-row>
      <el-col :span="4">
        <el-avatar shape="circle" :size="100" fit="cover" :src="url">
        </el-avatar>
      </el-col>
      <el-col :span="20">
        <div class="brief-infomation">
          庞眉书客感秋蓬, 谁知死草生华风。
          <br>
          我今垂翅附冥鸿, 他日不羞蛇作龙。
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import url from '../assets/a.jpeg'
export default {
  name: 'HeaderComp',

  setup() {
    // let url = ''
    return { url }
  }
}
</script>

<style scoped>
.header {
  padding-left: 0;
  background-color: rgb(219, 18, 112);
  height: 92%;
  width: 100%;
  line-height: 1.5;
  margin: auto auto;
}
.brief-infomation {
  text-align: left;
  margin-left: 20px;
}
</style>