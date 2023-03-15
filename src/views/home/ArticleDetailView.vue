<template>
  <Header></Header>
  <div class="article-detail-box">
    <img src="../../assets/title.gif" alt="" class="header-img" style="width:100%;padding-top:20px">
    <div class='container'>

      <HeaderComp :author='author'></HeaderComp>

      <div class="user-body">
        <LeftAsideComp :author='author'></LeftAsideComp>

        <div class="article-box">
          <div class="article-header-box">
            <div class='article-title-box'>
              <h1> {{ article.title }} </h1>
            </div>

            <div class='article-info-box'>
              <div class="article-bar-top">
                <!-- <img src="" alt=""> -->
                <div class="bar-content">
                  <a class='follow-nickName' :href="`/${article.author}`" target="_blank" rel="noopener noreferrer">{{ article.nickname }}</a>
                  <el-icon class='article-time-img'>
                    <Clock />
                  </el-icon>
                  <span>于 {{formatDate(article.ctime)}} 发布</span>
                </div>
              </div>
              <div class="blog-tags-box">
                <div class="tags-box">
                  <span>专栏分类：</span>
                  <a class="tag-link" :href="`/${article.author}?type=${article.type}`" target="_blank" rel="noopener noreferrer">{{ article.type }}</a>
                </div>
              </div>
              <div v-if="if_owner" class="operating">
                <a :href="`/${article.author}/article/edit/${article.id}`" target="_blank" rel="noopener noreferrer"> 编辑 </a>
                <el-divider direction="vertical" />
                <a href="http://" @click.prevent="DeleteArticleDialogVisable=true"> 删除 </a>
              </div>

            </div>
          </div>
          <el-divider calss="divider" border-style="dashed" />
          <div class="article-context">
            <md-editor v-model="article.context" preview-theme="github" showCodeRowNumber previewOnly class='md-box' />
          </div>

        </div>
      </div>
      <el-footer></el-footer>
    </div>
  </div>

  <!-- 确认删除 弹框 -->
  <el-dialog v-model="DeleteArticleDialogVisable" title="删除确认" width="30%">
    <div class='delete-dialog-context-box'>
      <el-icon color='red'>
        <WarnTriangleFilled />
      </el-icon>
      <span> 确定要删除文章 "{{ article.title }}" 吗？</span>

    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DeleteArticleDialogVisable = false">取消</el-button>
        <el-button @click="delete_article_vue">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import MdEditor from 'md-editor-v3'
import Header from '@/components/Header.vue'
import HeaderComp from '@/components/HeaderComp.vue'
import LeftAsideComp from '@/components/LeftAsideComp.vue'
import { get_article, delete_article } from '@/http/apis'
import { formatDate } from '@/utils/common'
import { ElMessage } from 'element-plus'
import router from '@/router/index.ts'

export default {
  name: 'HomeView',
  components: { HeaderComp, LeftAsideComp, MdEditor, Header },
  props: ['author', 'aid'],

  setup(props) {
    let article = ref('')
    let author = props.author

    // 判断是否是本人用户
    let if_owner = ref(false)
    if (JSON.parse(localStorage.getItem('userinfo')) === null) {
      if_owner.value = false
    } else if (JSON.parse(localStorage.getItem('userinfo')).username === author) {
      if_owner.value = true
    } else {
      if_owner.value = false
    }

    // 删除文章
    let DeleteArticleDialogVisable = ref(false)
    const delete_article_vue = () => {
      delete_article(article.value.author, article.value.id).then(res => {
        console.log(res)
        if (res.status === 200) {
          ElMessage.success('删除成功')
          router.push(`/${article.value.author}`)
        } else {
          ElMessage.error(res.msg)
        }
      })
    }

    onMounted(() => {
      get_article(props.author, props.aid).then(res => {
        if (res.status == 200) {
          article.value = res.data
        } else {
          ElMessage.error(res.msg)
          // 转到上一级页面
          setTimeout(() => {
            router.go(-1)
          }, 1000)
        }
      })
    })

    return { article, author, if_owner, DeleteArticleDialogVisable, formatDate, delete_article_vue }
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
  position: relative;
  padding: 0 24px 16px;
  background: #fff;
  border-radius: 4px;
  flex: 1;
  margin-left: 2px;
  width: 1020px;
}

.article-header-box {
  padding-top: 15px;
}

.article-title-box {
  margin-bottom: 8px;
}
.article-title-box h1 {
  font-size: 28px;
  word-wrap: break-word;
  color: #222226;
  font-weight: 600;
  margin: 0;
  word-break: break-all;
}

.article-info-box {
  position: relative;
  background: #f8f8f8;
  border-radius: 4px;
}

.bar-content {
  align-items: center;
  padding-left: 32px;
  display: flex;
  -webkit-box-align: center;
  line-height: 32px;
  color: #999aaa;
}

.follow-nickName {
  margin-right: 20px;
}

.article-time-img {
  margin-right: 6px;
}

.blog-tags-box {
  align-items: center;
  padding-left: 32px;
  display: flex;
  -webkit-box-align: center;
  line-height: 32px;
  color: #999aaa;
}

.tag-link {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 8px;
  padding: 3px 6px;
  font-size: 12px;
  background-color: #fff;
  color: #5094d5;
  border: 1px solid #eaeaef;
  height: 24px;
  line-height: 17px;
  border-radius: 2px;
  display: inline-block;
}

.operating {
  position: absolute;
  top: 0;
  right: 12px;
  line-height: 32px;
}
.operating a {
  color: #999aaa;
}

.article-context {
  width: 95%;
  margin: auto;
}

.delete-dialog-context-box {
  display: flex;
  align-items: center;
  line-height: 32px;
  font-size: 16px;
}
.delete-dialog-context-box span {
  margin-left: 6px;
}
</style>