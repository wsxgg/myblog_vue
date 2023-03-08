!<template>
  <div class='user-body-left'>
    <div class='aside-block'>
      <div class='aside-box'>
        <div class="aside-box-title">
          TA的专栏
          <div v-if="if_owner" class="add-btn-box">
            <el-button type="info" link @click="AddTypeDialogVisable=true">
              <el-icon>
                <Plus />
              </el-icon> &nbsp;新增
            </el-button>
          </div>
        </div>
        <div class="aside-box-body">
          <div class="aside-box-body-content">
            <ul>
              <li v-for="item in columnList" :key="item.id">
                <a :href="`/${author}?type=${item.name}`" target="_blank" rel="noopener noreferrer" class="aside-box-body-a">
                  <div class="special-colum-bar"></div>
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class='aside-box'>
        <div class="aside-box-title"> 推荐文章 </div>
        <div class="aside-box-body">
          <div class="aside-box-body-content">
            <ul>
              <li v-for="item in recommendList" :key="item.id">
                <a :href="`/${item.author}/article/${item.id}`" target="_blank" rel="noopener noreferrer" class="aside-box-body-a">
                  <div class="special-colum-bar"></div>
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- 添加专栏表单 -->
  <el-dialog v-model="AddTypeDialogVisable" title="添加专栏" width="25%" :close-on-click-modal='false'>
    <el-divider style="margin-top: -10px" />
    <el-form :model="typeForm" label-width="100px">
      <el-form-item label="专栏名称: ">
        <el-input v-model="typeForm.name" />
      </el-form-item>
      <el-form-item label="专栏介绍: ">
        <el-input v-model="typeForm.production" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add_type_vue">提交</el-button>
        <el-button @click="AddTypeDialogVisable=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { get_author, get_recommend_list, add_type } from '@/http/apis'
import { onBeforeMount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

export default {
  name: 'LeftAsideComp',
  props: ['author'],

  setup(props) {
    let author = props.author
    let columnList = ref('')
    let recommendList = ref('')
    let if_owner = ref(false)

    // 判断是否是本人用户
    if (JSON.parse(localStorage.getItem('userinfo')) === null) {
      if_owner.value = false
    } else if (JSON.parse(localStorage.getItem('userinfo')).username === author) {
      if_owner.value = true
    } else {
      if_owner.value = false
    }

    let AddTypeDialogVisable = ref(false)
    let typeForm = reactive({
      name: '',
      production: ''
    })

    // 添加专栏
    const add_type_vue = () => {
      add_type(author, typeForm.name, typeForm.production).then(res => {
        if (res.status == 200) {
          ElMessage.success('创建专栏成功')
          AddTypeDialogVisable.value = false
          router.go(0)
        } else {
          ElMessage.error(res.msg)
        }
      })
    }

    onBeforeMount(async () => {
      // 获取作者信息
      get_author(author).then(res => {
        if (res.status == 200) {
          columnList.value = res.data.types
        } else {
          ElMessage.error('加载专栏列表失败: ' + res.msg)
        }
      })

      // 获取文章推荐
      get_recommend_list().then(res => {
        if (res.status == 200) {
          recommendList.value = res.data.items
        }
      })
    })

    return { author, if_owner, router, columnList, recommendList, typeForm, AddTypeDialogVisable, add_type_vue }
  }
}
</script>

<style scoped>
.user-body-left {
  width: 280px;
}
.aside-block {
  position: sticky;
  top: 50px;
  /* align-items: start; */
}
.aside-box {
  background-color: white;
  display: block;
  border-radius: 5px;
  margin-right: 6px;
  margin-bottom: 6px;
}
.aside-box-title {
  height: 48px;
  font-size: 16px;
  color: #222226;
  font-weight: 500;
  line-height: 48px;
  padding-left: 16px;
  border-bottom: 1px solid #e8e8ed;
}
.aside-box-body {
  padding: 16px;
}
.aside-box-body-content ul {
  border-left: 1px dashed #ccccd8;
  padding: 0;
  margin: 0;
  list-style-type: none;
  list-style: none;
  box-sizing: border-box;
  display: block;
}
.aside-box-body a {
  text-decoration: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #555666;
  font-size: 16px;
  line-height: 30px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.aside-box-body a:hover {
  color: red;
}
.special-colum-bar {
  width: 12px;
  height: 1px;
  border-bottom: 1px dashed #ccccd8;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-right: 8px;
}

.add-btn-box {
  float: right;
  /* display: inline-block; */
  padding-right: 10px;
}
</style>