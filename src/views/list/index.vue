<template>
  <div class="app-container">
     <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="Title"
          width="300">
        </el-table-column>
        <el-table-column
          prop="title_en"
          label="Title_en"
          width="300">
        </el-table-column>
        <el-table-column
          prop="type"
          label="Type">
          <template slot-scope='scope'>
            <p v-for='(item, idx) in scope.row.type' :key='idx'>
              <el-tag effect="plain">{{item}}</el-tag>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          width='180'
          label="created time">
        </el-table-column>
        <el-table-column
          prop="updated_at"
          width='180'
          label="updated time">
        </el-table-column>
        <el-table-column
          prop="Operation"
          width='130'
          label="Operation">
          <template slot-scope="scope">
            <el-button type="primary" @click='editHandle(scope.row.id)'>Edit</el-button><br/>
            <el-button type="danger" @click='deleHandle(scope.row.id)'>Delete</el-button><br/>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/Markdown'
import { apiGetList, apiDelete } from '@/api/article.js'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      tableData:[]
    }
  },
  created(){
    this.getData();
    console.log(dayjs)
    console.log(dayjs().format())
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    },
    getData(){
      apiGetList().then((res)=>{
        console.log(res.data)
        this.tableData = res.data;
      })
    },
    editHandle(id){
      this.$router.push({
        path:'/form/index',
        query:{
          id
        }
      })
    },
    deleHandle(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiDelete({
            id
          }).then((res)=> {
            this.getData();
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        })
    },
    previewHandle(id){
      window.open(`http://8.210.115.7/detail?id=${id}`)
    },
    timeTrans(_time){
      return dayjs(_time).format('YYYY-MM-DD hh:mm:ss:ms')
    }
  },
  components:{
    
  }
}
</script>

<style scoped lang='scss'>
  .el-button{
    margin-bottom:10px;
  }
  .el-button--danger{
    margin-bottom:0;
  }
</style>

