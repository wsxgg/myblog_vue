<template>
  <div class="common-layout">
    <img src="../../assets/title.gif" alt="" class="header-img" style="width:100%;padding-top:20px">
    <div class='container'>

      <HeaderComp></HeaderComp>

      <div class="user-body">
        <LeftAsideComp></LeftAsideComp>

        <div class="article-box">
          <div class="article-title">
            <h1> {{ article.title }} </h1>
          </div>
          <el-divider calss="divider" style="width:90%;margin: 24px auto" border-style="dashed" />
          <div class="article-context">
            <md-editor v-model="article.context" preview-theme="github" showCodeRowNumber previewOnly />
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

export default {
  name: 'HomeView',
  components: { HeaderComp, LeftAsideComp, MdEditor },
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

<style scoped>
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
  /* width: 300px; */
}

.article-title {
  padding-top: 15px;
  text-align: center;
}

.article-context {
  width: 80%;
  margin: auto;
}
</style>