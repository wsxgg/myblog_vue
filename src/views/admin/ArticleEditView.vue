<template>
  <div class='edit-header-box'>
    <el-row class="edit-header-row">
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
  <!-- md编辑框 -->
  <md-editor v-model="article.context" preview-theme="github" style="height: 800px" :table-shape="[8, 8]" showCodeRowNumber />
</template>

<script>
import { reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import { get_article } from '@/http/apis'

export default {
  name: 'ArticleEditView',
  components: { MdEditor },
  props: ['author', 'aid'],

  setup(props) {
    let article = get_article({
      author: props.author,
      aid: props.aid
    })
    console.log(article)
    return { article }
  }
}
</script>

<style>
.title-ipt {
  width: 100%;
}

.edit-header-box {
  height: 60px;
  background-color: rgb(250, 249, 249);
}

.edit-header-row {
  line-height: 40px;
  text-align: center;
  padding-top: 10px;
}
</style>
