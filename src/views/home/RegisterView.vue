<template>
  <div class="register-box">
    <div class='register-div' @keydown.enter.prevent="registerFunc">

      <el-form label-position="right" label-width="90px" ref="ruleFormRef" :rules="rules" :model="registerForm" class="register-form">
        <div class="register-title"> 注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册 </div>
        <el-form-item label="&nbsp;昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称&nbsp;: " prop="nickname" class="register-label">
          <el-input v-model="registerForm.nickname" />
        </el-form-item>
        <el-form-item label="&nbsp;账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;: " prop="username" class="register-label">
          <el-input v-model="registerForm.username" class="register-input" />
          <!-- <el-input v-model="formLabelAlign.access_code" class="register-input" /> -->
        </el-form-item>
        <el-form-item label="&nbsp;密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码&nbsp;: " prop="password" class="register-label">
          <el-input v-model="registerForm.password" type="password" class="register-input" show-password />
          <!-- <el-input v-model="formLabelAlign.access_code" class="register-input" /> -->
        </el-form-item>
        <el-form-item label="重复密码: " prop="repassword" class="register-label">
          <el-input v-model="registerForm.repassword" type="repassword" class="register-input" show-password />
          <!-- <el-input v-model="formLabelAlign.access_code" class="register-input" /> -->
        </el-form-item>
        <el-form-item label="&nbsp;邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件&nbsp;: " prop="email" class="register-label">
          <el-input v-model="registerForm.email" />
        </el-form-item>
        <el-form-item label="&nbsp;介&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绍&nbsp;: " prop="production" class="register-label">
          <el-input v-model="registerForm.production" type="textarea" maxlength=255 />
        </el-form-item>
        <el-button round class="register-btn" @click="registerFunc(ruleFormRef)"> 注册 </el-button>
      </el-form>
    </div>
  </div>

</template>

<script lang='ts'>
import { ref, reactive } from 'vue'
import { register } from '@/http/apis'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import type { FormInstance, FormRules } from 'element-plus'

export default {
  name: 'registerView',

  setup() {
    let registerForm = reactive({
      nickname: '',
      username: '',
      password: '',
      repassword: '',
      email: '',
      production: ''
    })

    const ruleFormRef = ref<FormInstance>()

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (registerForm.password == '') {
          return callback(new Error('请输入密码'))
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    let RegEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const validateMail = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (!RegEmail.test(value)) {
          return callback(new Error('邮箱格式错误'))
        }
        callback()
      }
    }

    const rules = reactive<FormRules>({
      nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, validator: validatePass, trigger: 'blur' }],
      repassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      email: [{ required: true, validator: validateMail, trigger: 'blur' }]
    })

    const registerFunc = async (form: FormInstance | undefined) => {
      if (!form) return
      await form.validate((valid, fields) => {
        if (valid) {
          register(registerForm).then(res => {
            if (res.status == 200) {
              router.push('/login')
            } else {
              ElMessage.error(res.msg)
              registerForm.password = ''
              registerForm.repassword = ''
            }
          })
        } else {
          ElMessage.error('请按照要求填写表单')
        }
      })
    }

    return { registerForm, ruleFormRef, rules, registerFunc }
  }
}
</script>

<style scoped>
.register-box {
  background: url('@/assets/advertisement.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}

.register-div {
  /* opacity: 0.95; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 375px;
  text-align: center;
  background-color: aliceblue;
  border-radius: 10px;
}

.register-title {
  margin-bottom: 20px;
}

.register-form {
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