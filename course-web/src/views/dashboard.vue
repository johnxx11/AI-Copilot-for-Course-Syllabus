<template>
  <el-container>
    <el-aside width="700px" style="height:100%;background-color: white;padding:10px;">
      <div class="title"><b>Calendar</b></div>
      <el-calendar style="width:100%;height:320px;" />
      <div style="height: calc(100% - 340px)">
        <div class="title">
          <b>Syllabus Table</b>
          <el-link type="primary" :underline="false" style="float:right;" @click="uploadSyllabus">Syllabus Upload</el-link>
        </div>
        <div style="height: calc(100% - 60px);width:100%;">
          <el-table v-loading="loading" :data="userSyllabusList" height="100%" size="small">
            <el-table-column prop="id" label="Id" width="50" />
            <el-table-column prop="date" label="Date" width="120" show-overflow-tooltip />
            <el-table-column prop="syllabusName" label="Syllabus Name" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="showSyllabusDetail(scope.row.id)">{{ scope.row.syllabusName||'Syllabus name not found' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="Upload time" width="120">
              <template slot-scope="scope">
                {{scope.row.createTime.substring(0,16)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          style="height:50px;"
          :page-size="pageInfo.size"
          :total="pageInfo.total"
          :current-page="pageInfo.current"
          :page-sizes="[10,20,30,40,50]"
          layout="prev, pager, next, jumper, sizes"
          background
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </div>
    </el-aside>
    <el-main style="background-color: white;margin-left: 10px;overflow-y: hidden;">
      <div class="title"><b>Syllabus Result</b></div>
      <el-empty v-if="!detailData" description="No analysis results available at the moment." />
      <detail v-else :detail="detailData" />
    </el-main>
  </el-container>
</template>

<script>

import { detail, page } from '@/api/userSyllabus'
import Detail from './detail'

export default {
  name: 'Dashboard',
  components: {
    Detail
  },
  data() {
    return {
      loading: false,
      pageInfo: {
        current: 1,
        size: 10,
        total: 0,
        condition: {}
      },
      userSyllabusList: [],
      detailData: null
    }
  },
  created() {
    this.getUserSyllabusList()
  },
  methods: {
    getUserSyllabusList() {
      this.loading = true
      page(this.pageInfo).then(result => {
        this.pageInfo.total = result.data.total
        this.pageInfo.current = result.data.current
        this.userSyllabusList = result.data.list
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    showSyllabusDetail(id) {
      detail(id).then(result => {
        this.detailData = result.data
      })
    },
    uploadSyllabus() {
      this.$router.push({ path: '/upload' })
    },
    currentChange(num) {
      // 切换分页
      this.pageInfo.current = num
      this.getUserSyllabusList()
    },
    sizeChange(num) {
      this.page.size = num
      this.getUserSyllabusList()
    }
  }
}
</script>

<style lang="scss">
  .el-calendar-table .el-calendar-day{
    width: 100%;
    height: 30px;
    text-align: center;
  }
</style>
<style lang="scss" scoped>
  .el-container {
    background-color: #F2F6FC;
    height:100%;

    .el-aside {
      .title {
        width:100%;
        height:20px;
        padding-right:20px;
      }
    }
  }

</style>
