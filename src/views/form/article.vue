<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Title_en">
        <el-input v-model="form.title_en" />
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
      <el-form-item label="Visible">
        <el-switch
          v-model="form.visible"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
    <!-- <MarkdownEditor v-model="content"/> -->
  </div>
</template>

<script>
import MarkdownEditor from '@/components/Markdown'
import { apiCreate, apiGetSingle, apiUpdate } from '@/api/article.js'
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
        title_en: '',
        content: '',
        type: [],
        visible: true
      }
    }
  },
  created(){
    if(this.$route.query.id){
      this.getData();
    }
  },
  methods: {
    onSubmit() {
      if(this.$route.query.id){
        this.updateHandle()
      }else{
        this.createHandle()
      }
    },
    createHandle(){
      apiCreate({
        ...this.form,
        visible: this.form.visible ? 1 : 0
        }).then((res)=>{
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$router.push({
          path:'/list/article'
        })
      }).catch((e)=>{
        this.$message({
          message: e.message,
          type: 'error'
        })
      })
    },
    getData(){
      apiGetSingle({
        id:this.$route.query.id
      }).then((res)=>{
        this.form = res.data;
        this.form.visible = res.data.visible === 1 ? true : false
      })
    },
    updateHandle(){
      apiUpdate({
        ...this.form,
        visible: this.form.visible ? 1 : 0,
        id: this.$route.query.id
      }).then((res)=> {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$router.go(-1);
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

