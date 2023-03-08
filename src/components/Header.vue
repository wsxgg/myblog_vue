<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <div class="logo"><a href="/" style="text-decoration: none;"><img src="" alt="">这里是logo,但还没想好</a></div>
      </el-col>
      <el-col :span="16">
        <div class="todo">
          <span v-view="if_login"> Hi~ 欢迎尊贵的用户 {{ userinfo.nickname }} 进入博客 </span>
          <span v-if="!if_login"> 游客账户，还未登录哦~ </span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="status">
          <div v-if="if_login">
            <div>
              <el-button type="info" link @click="router.push(`/${userinfo.username}`)"><span>{{ userinfo.username }}</span></el-button>
            </div>
            <div>
              <el-button type="primary" link @click="localStorage.clear(), router.go(0)">登出</el-button>
            </div>
            <div>
              <el-button type="danger" round class='publish-but' @click="router.push(`/${userinfo.username}/article/create`)">
                <el-icon>
                  <Plus />
                </el-icon>
                发 布
              </el-button>
            </div>

          </div>
          <div v-if="!if_login">
            <el-button type="primary" link @click="router.push('/register')">注册</el-button>
            <el-button type="primary" link @click="router.push('/login')">登录</el-button>
          </div>

        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { ref } from 'vue'
import router from '@/router/index'

export default {
  name: 'Header',

  setup() {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let if_login = ref(false)

    if (userinfo != null) {
      if_login.value = true
    } else {
      if_login.value = false
      userinfo = {
        username: '',
        nickname: ''
      }
    }

    return { router, userinfo, if_login, localStorage }
  }
}
</script>

<style scoped>
.header {
  z-index: 100;
  height: 48px;
  line-height: 48px;
  position: -webkit-sticky;

  position: sticky;
  top: 0;
  background-color: whitesmoke;
}
.header span {
  font-size: 10px;
}

.logo {
  text-align: center;
  height: 48px;
}

.todo {
  text-align: center;
}

.status div * {
  display: inline-block;
  margin-right: 10px;
}
</style>