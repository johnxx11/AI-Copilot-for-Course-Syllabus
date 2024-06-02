<template>
  <div style="height:100%;">
    <div style="height:90px;">
      <el-descriptions title="Base Info" :column="4">
        <el-descriptions-item label="Syllabus Name">{{ detail.syllabusName }}</el-descriptions-item>
        <el-descriptions-item label="Date">{{ detail.date }}</el-descriptions-item>
        <el-descriptions-item label="Original File" :span="2">
          <el-link type="primary" :underline="false" :href="'/api/file/download/'+detail.file" target="_blank"> {{ detail.fileName }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="height: calc(100% - 90px);">
      <div class="el-descriptions__title">Main Info</div>
      <div class="summary">
        <vue-markdown :source="detail.result" />
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Detail', components: {
    VueMarkdown
  },
  props: {
    detail: Object
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
      userSyllabusList: []
    }
  }
}

</script>

<style lang="scss" scoped>
  .summary{
    background-color: #f5f7fa;
    border: 1px solid #c0c4cc;
    margin-top:10px;
    padding:20px;
    height: calc(100% - 30px);
    overflow-y: auto;
    border-radius:3px;
  }
</style>
