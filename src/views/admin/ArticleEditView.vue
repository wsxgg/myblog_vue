<template >
  <div style="height:96vh">
    <div class='edit-header-box'>
      <el-row class="edit-header-row">
        <el-col :span="2" style="text-align: center">
          <el-button type="danger" round> 文章管理 </el-button>
        </el-col>
        <el-col :span="18" style="text-align: center">
          <el-input @blur="title=$event.target.value.trim()" class='title-ipt' v-model="article.title" placeholder="请输入标题" />
        </el-col>
        <el-col :span="4" style="text-align: center">
          <el-button round> 取消编辑 </el-button>
          <el-button type="danger" round @click="saveArticleDialog = true"> 保存文章 </el-button>
        </el-col>
      </el-row>

    </div>
    <!-- md编辑框 -->
    <!-- <md-editor v-model="article.context" preview-theme="github" style="height: 850px" :table-shape="[8, 8]" showCodeRowNumber @onSave='saveArticleDialog = true' @onUploadImg="onUploadImg" /> -->
    <md-editor v-model="article.context" preview-theme="github" style="height: 850px" :table-shape="[8, 8]" showCodeRowNumber @onSave='saveArticleDialog = true' @onUploadImg="onUploadImg" />

  </div>
  <!-- 保存文章 弹框 -->
  <el-dialog v-model="saveArticleDialog" title="保存文章" width="40%">
    <div>
      <el-form :model="article" label-width="120px">
        <el-form-item label="文章标题: ">
          <el-input v-model="article.title" />
        </el-form-item>
        <el-form-item label="文章类别: ">
          <el-radio-group v-model="article.type">
            <el-radio v-for="item in userinfo.types" :key="item.id" :label="item.name" />
          </el-radio-group>
        </el-form-item>

      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="saveArticleDialog = false">取消</el-button>
        <el-button type="primary" @click="saveArticleAction">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, onBeforeMount } from 'vue'
import MdEditor from 'md-editor-v3'
import { get_article, update_article } from '@/http/apis'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import $http from '@/http/index'

export default {
  name: 'ArticleEditView',
  components: { MdEditor },
  props: ['author', 'aid'],

  setup(props) {
    let article = ref('')

    let userinfo = JSON.parse(localStorage.getItem('userinfo'))

    // 保存文章
    let saveArticleDialog = ref(false)
    const saveArticleAction = () => {
      update_article(article.value.id, article.value.author, article.value.title, article.value.context, article.value.type).then(res => {
        if (res.status != 200) {
          ElMessage.error(res.msg)
        } else {
          ElMessage.success(res.msg)
          saveArticleDialog.value = false
          // 转到个人主页
          setTimeout(() => {
            router.push('/' + props.author)
          }, 1000)
        }
      })
    }

    // md-editor-v3 上传图片
    const onUploadImg = async (files, callback) => {
      // console.log(files)
      const res = await Promise.all(
        files.map(file => {
          return new Promise((rev, rej) => {
            const form = new FormData()
            form.append('img', file)
            console.log(form)

            $http
              .post('/img/upload', form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(res => rev(res))
              .catch(error => rej(error))
          })
        })
      )
      console.log(res)

      callback(res.map(item => item.data.url))
    }

    onBeforeMount(() => {
      // 获取编辑文章
      get_article(props.author, props.aid).then(res => {
        console.log(res)
        if (res.status === 200) {
          article.value = res.data
        } else {
          ElMessage.error(res.msg)
          router.go(-1)
        }
      })
    })

    return { article, userinfo, saveArticleDialog, saveArticleAction, onUploadImg }
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
