<template>
  <div class='user-header'>
    <el-row style="height: 100%">
      <el-col :span="4" style="padding-left:30px;">
        <el-avatar shape="circle" :size="100" fit="cover" :src="author_info.img" class="avatar">
        </el-avatar>
      </el-col>
      <el-col :span="16">
        <div class="brief-infomation">
          <span> {{ author_info.nickname }} </span>

          <span> {{ author_info.production }} </span>

        </div>

      </el-col>
      <el-col :span="4">
        <div v-if="if_owner">
          <el-button type="info" round class='publish-but' @click="show_dialog">
            编辑资料
          </el-button>
        </div>

      </el-col>
    </el-row>
  </div>

  <!-- 编辑资料表单 -->
  <el-dialog v-model="ChangeInfoDialogVisable" :title="`${author_info.nickname} -- 资料修改`" width="30%" :close-on-click-modal='false'>
    <el-divider style="margin-top: -10px" />
    <el-form :model="author_info_tmp" label-width="120px">
      <el-form-item label="昵称: ">
        <el-input v-model="author_info_tmp.nickname" />
      </el-form-item>
      <el-form-item label="介绍: ">
        <el-input v-model="author_info_tmp.production" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="change_author_vue">提交</el-button>
        <el-button @click="ChangeInfoDialogVisable=false; ">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import url from '../assets/a.jpeg'
import router from '@/router/index'
import { get_author, change_author } from '@/http/apis.ts'
import { ElMessage } from 'element-plus'

export default {
  name: 'HeaderComp',
  props: ['author'],

  setup(props) {
    let author = props.author
    let author_info = reactive({
      nickname: '',
      production: '',
      img: url
    })
    let author_info_tmp = reactive({
      nickname: '',
      production: '',
      img: url
    })

    // 判断是否是本人用户
    let if_owner = ref(false)
    if (JSON.parse(localStorage.getItem('userinfo')) === null) {
      if_owner.value = false
    } else if (JSON.parse(localStorage.getItem('userinfo')).username === author) {
      if_owner.value = true
    } else {
      if_owner.value = false
    }

    let ChangeInfoDialogVisable = ref(false)

    const show_dialog = () => {
      console.log(author_info_tmp)
      ChangeInfoDialogVisable.value = true
      for (let key in author_info) {
        author_info_tmp[key] = author_info[key]
      }
    }

    // 提交信息修改
    const change_author_vue = () => {
      change_author(author, author_info_tmp.nickname, author_info_tmp.production, author_info_tmp.img).then(res => {
        if (res.status == 200) {
          ElMessage.success('修改成功')
          ChangeInfoDialogVisable.value = false
          router.go(0)
        } else {
          ElMessage.error(res.msg)
        }
      })
    }

    onMounted(() => {
      get_author(author).then(res => {
        if (res.status == 200) {
          author_info.nickname = res.data.nickname
          author_info.production = res.data.production
        } else {
          ElMessage.error('加载个人信息失败: ' + res.msg)
        }
      })
    })
    return { url, if_owner, author, router, author_info, author_info_tmp, ChangeInfoDialogVisable, show_dialog, change_author_vue }
  }
}
</script>

<style scoped>
.user-header {
  padding-left: 0;
  background-color: white;
  height: 160px;
  width: 1320px;
  line-height: 1.5;
  margin: 0 auto 10px;
  border-radius: 5px;
}
.brief-infomation {
  text-align: left;
  margin-left: 30px;
}
.brief-infomation span {
  display: block;
  margin-top: 10px;
}

.avatar {
  margin-top: -15px;
  border: 4px solid white;
}

.publish-but {
  margin-top: 110px;
  margin-left: 80px;
  width: 100px;
}
</style>