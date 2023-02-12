<template>
  <div style="height: 40px; margin-top: 5px">
    <el-row style="line-height: 40px; text-align: center">
      <el-col :span="2" style="text-align: center">
        <el-button type="danger" round> 文章管理 </el-button>
      </el-col>
      <el-col :span="18" style="text-align: center">
        <el-input @blur="title=$event.target.value.trim()" class='title-ipt' v-model="article.title" placeholder="请输入标题" />
      </el-col>
      <el-col :span="4" style="text-align: center">
        <el-button round> 保存草靠 </el-button>
        <el-button type="danger" round> 保存文章 </el-button>
      </el-col>
    </el-row>

    <div>

    </div>

  </div>
  <br>
  <!-- md编辑框 -->
  <md-editor v-model="article.content" preview-theme="github" style="height: 800px" :table-shape="[8, 8]" showCodeRowNumber />
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'

export default {
  name: 'HomeView',
  components: { MdEditor },

  setup() {
    let article = reactive({
      title: '这是title',
      content: `
\`\`\` python
a = 10
print('hello world')
\`\`\`
    `
    })

    return { article }
  }
}
</script>

<style>
.title-ipt {
  width: 100%;
}
</style>
