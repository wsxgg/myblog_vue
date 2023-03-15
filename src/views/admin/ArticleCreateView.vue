<template>
  <div style="height:96vh">
    <div class='edit-header-box'>
      <el-row class="edit-header-row">
        <el-col :span="2" style="text-align: center">
          <el-button type="danger" round @click="router.push(`/${author}`)"> 文章管理 </el-button>
        </el-col>
        <el-col :span="18" style="text-align: center">
          <el-input @blur="articleForm.title=$event.target.value.trim()" class='title-ipt' v-model="articleForm.title" placeholder="请输入标题" />
        </el-col>
        <el-col :span="4" style="text-align: center">
          <el-button round @click="saveDraftsAction"> 保存草靠 </el-button>
          <el-button type="danger" round @click="saveArticleDialog = true"> 保存文章 </el-button>
        </el-col>
      </el-row>

    </div>
    <!-- md编辑框 -->
    <md-editor v-model="articleForm.context" preview-theme="github" style="height: 850px" :table-shape="[8, 8]" showCodeRowNumber @onSave='saveArticleDialog = true' @onUploadImg="onUploadImg" />

  </div>

  <!-- 保存文章 弹框 -->
  <el-dialog v-model="saveArticleDialog" title="保存文章" width="40%">
    <div>
      <el-form :model="articleForm" label-width="120px">
        <el-form-item label="文章标题: ">
          <el-input v-model="articleForm.title" />
        </el-form-item>
        <el-form-item label="文章类别: ">
          <el-radio-group v-model="articleForm.type">
            <el-radio v-for="item in types" :key="item.id" :label="item.name" />
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
import { onMounted, reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import { create_article, get_draft, save_draft, get_author } from '@/http/apis'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import $http from '@/http/index'

export default {
  name: 'ArticleEditView',
  components: { MdEditor },
  props: ['author'],

  setup(props) {
    let saveArticleDialog = ref(false) // 保存文章弹框
    let articleForm = reactive({
      // 保存文章表单
      author: props.author,
      title: '',
      context: '',
      type: ''
    })

    // 保存文章操作
    const saveArticleAction = () => {
      create_article(articleForm).then(res => {
        console.log(res)
        if (res.status != 200) {
          ElMessage({
            message: res.msg,
            type: 'error'
          })
        } else {
          ElMessage({
            message: res.msg,
            type: 'success'
          })
          saveArticleDialog.value = false
          // 转到个人主页
          setTimeout(() => {
            router.push('/' + props.author)
          }, 1000)
        }
      })
    }
    // 保存至草稿
    const saveDraftsAction = () => {
      save_draft(articleForm.author, articleForm.title, articleForm.context).then(res => {
        console.log(res)
        if (res.status != 200) {
          ElMessage({
            message: res.msg,
            type: 'error'
          })
        } else {
          ElMessage({
            message: res.msg,
            type: 'success'
          })
        }
      })
    }
    // 获取草稿
    const getDraft = () => {
      get_draft(props.author).then(res => {
        if (res.status != 200) {
          // TODO 用户不存在， 暂时这么写
          ElMessage({
            message: res.msg,
            type: 'error'
          })
          // 转到个人主页
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }
        articleForm.title = res.title
        articleForm.context = res.context
      })
    }
    // 获取文章类型们
    let types = ref('')
    const getTypes = () => {
      get_author(props.author).then(res => {
        if (res.status == 200) {
          types.value = res.data.types
        } else {
          ElMessage.error('加载专栏列表失败: ' + res.msg)
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

    onMounted(() => {
      // 获取草稿
      getDraft()

      // 获取文章类型
      getTypes()
    })

    return { router, types, articleForm, saveArticleDialog, onUploadImg, saveArticleAction, saveDraftsAction }
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
