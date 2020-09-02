<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Content">
        <el-input type="textarea" :rows='8' v-model="form.content" />
      </el-form-item>
      <el-form-item label="Type">
        <el-select
          v-model="form.type"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
    <!-- <MarkdownEditor v-model="content"/> -->
  </div>
</template>

<script>
import MarkdownEditor from '@/components/Markdown'
import { apiCreate } from '@/api/article.js'
export default {
  data() {
    return {
      content:'',
      typeOptions: [{
          value: '技术',
          label: '技术'
        }, {
          value: '生活',
          label: '生活'
        }, {
          value: '学习',
          label: '学习'
        }],
      form: {
        title: '',
        content: '',
        type: []
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.createHandle()
    },
    createHandle(){
      apiCreate(this.form).then((res)=>{
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch((e)=>{
        this.$message({
          message: e.message,
          type: 'error'
        })
      })
    }
  },
  components:{
    MarkdownEditor
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

