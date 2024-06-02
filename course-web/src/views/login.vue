<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">User Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="icon-container">
          <i class="el-icon-user-solid" />
        </span>
        <el-input v-model="loginForm.username" placeholder="Username or Email" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="icon-container">
          <i class="el-icon-lock" />
        </span>
        <el-input v-model="loginForm.password" type="password" placeholder="password" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-row>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      </el-row>
      <el-row style="text-align: center;">
        <span style="color:gray;">Don't have an account? </span> <router-link to="/register"><span style="color:#409eff;">Sign up</span></router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
        username: [
          { required: true, message: 'Please enter your username or email', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/dashboard' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #ecf5ff;
    border-radius: 5px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: rgb(76,62,89);
      height: 47px;
      -webkit-box-shadow: 0 0 0 1000px #ecf5ff inset;
    }
  }
}
</style>

<style lang="scss" scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-size:100% 100%;
  background-color: #f5f7fa;
  overflow: hidden;

  .login-form {
    background-color:#ffffff;
    position: relative;
    width: 520px;
    height: 620px;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .icon-container{
      padding-left: 10px;
    }
    .el-input {
      display: inline-block;
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
