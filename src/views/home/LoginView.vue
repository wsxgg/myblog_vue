<template>\
  <div style="height:94vh">
    <div class="login-box">
      <div class='login-div' @keydown.enter.prevent="loginFunc">

        <el-form label-width="50px" :model="loginForm" style="max-width: 460px" class="login-form">
          <div class="login-title"> 登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录 </div>
          <el-form-item label="账 号: " class="login-label">
            <el-input v-model="loginForm.username" class="login-input" />
            <!-- <el-input v-model="formLabelAlign.access_code" class="login-input" /> -->
          </el-form-item>
          <el-form-item label="密 码: " class="login-label">
            <el-input v-model="loginForm.password" type="password" class="login-input" show-password />
            <!-- <el-input v-model="formLabelAlign.access_code" class="login-input" /> -->
          </el-form-item>
          <el-button type="primary" round class="login-btn" @click="loginFunc"> 登陆 </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { login } from '@/http/apis'
import { ElMessage } from 'element-plus'
import router from '@/router/index'

export default {
  name: 'LoginView',

  setup() {
    let loginForm = reactive({
      username: '',
      password: ''
    })

    const loginFunc = () => {
      login(loginForm.username, loginForm.password).then(res => {
        console.log(res)
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
          router.push(`/${res.data.userinfo.username}`)
        } else {
          ElMessage.error(res.msg)
          loginForm.password = ''
        }
      })
    }

    return { loginForm, loginFunc }
  }
}
</script>

<style scoped>
.login-box {
  background: url('@/assets/advertisement.png');
  /* background: url("~@/assets/摸鱼办壁纸.jpg");  */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}

.login-div {
  /* opacity: 0.95; */
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 375px;
  text-align: center;
  background-color: aliceblue;
  border-radius: 10px;
}

.login-title {
  margin-bottom: 20px;
}

.login-form {
  flex: 0 1 400px;
  justify-content: center;
  padding: 1rem;
  pointer-events: auto;
  border-radius: 4px;
  outline: none;
  box-shadow: -1px 4px 10px rgb(0 0 0 / 25%);
  margin: auto;
  box-sizing: border-box;
}
</style>