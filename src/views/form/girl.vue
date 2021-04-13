<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Nickname" required>
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="Born_year">
        <el-input v-model="form.born_year" />
      </el-form-item>
      <el-form-item label="Job">
         <el-input v-model="form.job" />
      </el-form-item>
      <el-form-item label="Native_place">
         <el-input v-model="form.native_place" />
      </el-form-item>
      <el-form-item label="Work_place">
         <el-input v-model="form.work_place" />
      </el-form-item>
      <el-form-item label="Specialty">
         <el-input v-model="form.specialty" />
      </el-form-item>
      <el-form-item label="Ohter">
         <el-input type='textarea' rows='5' v-model="form.other" />
      </el-form-item>
      <el-form-item label="Ref">
         <el-input v-model="form.ref" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/Markdown'
import { apiCreate, apiGetSingle, apiUpdate } from '@/api/girl.js'
export default {
  data() {
    return {
      form: {
        nickname: '',
        born_year: '',
        job: '',
        native_place: '',
        work_place: '',
        specialty: '',
        ohter: '',
        ref: ''
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
      }).then((res)=>{
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$router.push({
          path:'/list/girl'
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

