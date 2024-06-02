<template>
  <el-container style="overflow:hidden;">
    <el-header height="70px">
      <el-row :gutter="10" style="padding:10px 0px 10px 0px;">
        <el-col :span="16" style="padding-left:20px;">
          <div class="header-info1">
            <span class="title">User Syllabus Platform</span>
          </div>
        </el-col>
        <el-col :span="8" style="text-align:right;">
          <div class="header-info1">
            <el-tag v-if="role==1" size="mini" effect="dark" style="margin-right:20px;">Teacher</el-tag>
            <el-tag v-else-if="role==2" effect="dark" size="mini" style="margin-right:20px;">Student</el-tag>
            <template v-if="username"><i class="el-icon-user-solid" style="font-size:12px;" /> <span class="user" style="font-weight: bold;">{{ username }}</span></template>
            <template v-if="email"><i class="el-icon-message" style="font-size:12px;" /> <span class="user">{{ email }}</span></template>
            <template v-if="mobile"><i class="el-icon-phone" style="font-size:12px;" /> <span class="user">{{ mobile }}</span></template>
            <template v-if="username"><el-button type="text" @click="handLogout">Logout</el-button></template>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="padding:20px;height: calc(100% - 70px)">
      <router-view />
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'Layout',
  computed: {
    ...mapGetters(['username', 'role', 'email', 'mobile'])
  },
  methods: {
    handLogout() {
      const _this = this
      store.dispatch('user/resetToken').then(() => {
        _this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    background-color: #F2F6FC;
    height:100%;
    .el-header {
      background-color: #ffffff;
      .header-info1 {
        line-height: 38px;
        font-size: 18px;
        .title {
          margin-left: 10px;
          font-weight: bold;
        }
        .user {
          margin-right:20px;
          font-size: 15px;
        }
      }
    }
  }
</style>

