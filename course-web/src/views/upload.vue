<template>
  <el-main style="background-color: white;margin-left: 10px;height:100%;position: relative;">
    <template v-if="detailData">
      <detail :detail="detailData" />
    </template>
    <div style="text-align:center;" v-else>
      <div class="title"><b>Upload Your Syllabus</b></div>
      <el-upload v-loading="loading" style="margin-top:30px;" drag :http-request="handleUpload" :show-file-list="false">
        <i class="el-icon-upload" />
        <div class="el-upload__text">Drag and drop the file here, or <em>click</em> to upload.</div>
        <div slot="tip" class="el-upload__tip">Only PDF or DOCX files are accepted.</div>
      </el-upload>
    </div>
    <router-link to="/dashboard" style="position: absolute;top:10px;right:10px;font-size:14px;"><span style="color:#409eff;">My Dashboard</span></router-link>
  </el-main>
</template>

<script>

import { upload } from '@/api/userSyllabus'
import Detail from './detail'
export default {
  components: {
    Detail
  },
  data() {
    return {
      loading: false,
      detailData: null
    }
  },
  created() {
  },
  methods: {
    handleUpload(data) {
      const file = data.file
      const formData = new FormData()
      formData.append('file', file)
      this.loading = true
      upload(formData).then(result => {
        this.loading = false
        this.detailData = result.data
      }).catch(ex => {
        this.loading = false
        console.error(ex)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
