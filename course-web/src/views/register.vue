<template>
  <div class="regist-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registRules" class="regist-form" label-width="80px">
      <div class="title-container">
        <h3 class="title">User Registration</h3>
      </div>

      <el-form-item label="Username" prop="username">
        <el-input v-model="registerForm.username" placeholder="username" />
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input v-model="registerForm.email" placeholder="email" />
      </el-form-item>

      <el-form-item label="Phone" prop="mobile">
        <el-input v-model="registerForm.mobile" placeholder="phone" />
      </el-form-item>

      <el-form-item label="Identity">
        <el-radio-group v-model="registerForm.role">
          <el-radio :label="1">Teacher</el-radio>
          <el-radio :label="2">Student</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="password" name="password" />
      </el-form-item>

      <el-row>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">Submit</el-button>
      </el-row>
      <el-row style="text-align: center;">
        <span style="color:gray;">Already have an account? </span> <router-link to="/login"><span style="color:#409eff;">Login</span></router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/sysUser'
import store from '../store'

export default {
  name: 'Login',
  data() {
    return {
      registerForm: {
        username: null,
        email: null,
        mobile: null,
        role: 1,
        password: null
      },
      registRules: {
        username: [
          { required: true, message: 'Please enter your username', trigger: 'blur' },
          { min: 6, max: 20, message: 'Username must be between 6 and 20 characters', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: 'Please enter your mobile number', trigger: 'blur' },
          { pattern: /^[1-9\-]+$/, message: 'Please enter a valid mobile number', trigger: ['blur', 'change'] }
        ],
        role: [
          { required: true, message: 'Please chose your identity', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { min: 6, max: 20, message: 'Password must be between 6 and 20 characters', trigger: ['blur', 'change'] }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          const _this = this
          register(this.registerForm).then(result => {
            this.$message({
              message: 'Registration successful, you will be redirected to the login page shortly.',
              type: 'success'
            })
            store.dispatch('user/resetToken').then(() => {
              setTimeout(function() {
                _this.$router.push({ path: '/login' })
              }, 2000)
            })
            this.loading = false
          }).catch(ex => {
            this.loading = false
            console.error(ex)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .regist-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    background-color: #f5f7fa;
    overflow: hidden;

    .regist-form {
      background-color:#ffffff;
      position: relative;
      width: 520px;
      height: 620px;
      max-width: 100%;
      padding: 30px 35px 0;
      margin: 0 auto;
      overflow: hidden;
      .el-input {
        height: 47px;
        width: 85%;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: rgb(76,62,89);
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

  }
</style>
