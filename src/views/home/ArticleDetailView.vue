<template>
  <div class="article-detail-box">
    <img src="../../assets/title.gif" alt="" class="header-img" style="width:100%;padding-top:20px">
    <div class='container'>

      <HeaderComp :author='author'></HeaderComp>

      <div class="user-body">
        <LeftAsideComp></LeftAsideComp>

        <div class="article-box">
          <div class="article-title">
            <h1> {{ article.title }} </h1>
            <div class='article-subtitle'><span>作者: {{ article.author }} &nbsp;&nbsp;</span><span>创作时间: {{formatDate(article.ctime)}}</span></div>
          </div>
          <el-divider calss="divider" style="width:95%;margin: 24px auto" border-style="dashed" />
          <div class="article-context">
            <md-editor v-model="article.context" preview-theme="github" showCodeRowNumber previewOnly class='md-box' />
          </div>

        </div>
      </div>
      <el-footer></el-footer>
    </div>
  </div>

</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import MdEditor from 'md-editor-v3'
import HeaderComp from '@/components/HeaderComp.vue'
import LeftAsideComp from '@/components/LeftAsideComp.vue'
import { get_article } from '@/http/apis'
import { formatDate } from '@/utils/common'
import { ElMessage } from 'element-plus'
import router from '@/router/index.ts'

export default {
  name: 'HomeView',
  components: { HeaderComp, LeftAsideComp, MdEditor },
  props: ['author', 'aid'],

  setup(props) {
    let article = ref('')
    let author = props.author

    onMounted(() => {
      get_article(props.author, props.aid).then(res => {
        if (res.status == 200) {
          article.value = res.data
        } else {
          console.log(res)
          ElMessage.error(res.msg)
          // 转到个人主页
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }
      })
    })

    return { article, author, formatDate }
  }
}
</script>

<style scoped>
.article-detail-box {
  background-image: url('@/assets/bg.gif');
}

.user-body {
  width: 1320px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  min-height: 700px;
  padding-bottom: 32px;
  margin: 10px auto 0;
}

.article-box {
  background-color: white;
  border-radius: 4px;
  margin-left: 6px;
  flex: 1;
  width: 0;
}

.article-title {
  padding-top: 15px;
  text-align: center;
}

.article-subtitle {
  font-size: 10px;
  padding-top: 6px;
}

.article-context {
  width: 95%;
  margin: auto;
}
</style>