<template>
  <div style="height: 40px; margin-top: 5px">
    <el-row style="line-height: 40px; text-align: center">
      <el-col :span="2" style="text-align: center">
        <el-button type="danger" round> 文章管理 </el-button>
      </el-col>
      <el-col :span="18" style="text-align: center">
        <el-input @blur="title=$event.target.value.trim()" class='title-ipt' v-model="title" placeholder="请输入标题" />
      </el-col>
      <el-col :span="4" style="text-align: center">
        <el-button round> 保存草靠 </el-button>
        <el-button type="danger" round> 保存文章 </el-button>
      </el-col>
    </el-row>

    <div>

    </div>

    <!-- <el-page-header :icon="ArrowLeft">
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </el-page-header> -->

  </div>
  <br>
  <md-editor v-model="text" preview-theme="github" style="height: 800px" :table-shape="[8, 8]" showCodeRowNumber />
  <el-button> 保存 </el-button>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'

export default {
  name: 'HomeView',
  components: { MdEditor },

  setup() {
    let text = ref(`
\`\`\` python
a = 10
print('hello world')
\`\`\`
    `)
    let title = ref('')
    return { text, title }
  }
}
</script>

<style>
.title-ipt {
  width: 100%;
}
</style>
