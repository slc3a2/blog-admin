<template>
  <div class="app-container">
     <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          fixed
          width='50'
          label="ID">
          <template slot-scope='scope'>
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="Nickname"
          fixed
          width='120'>
        </el-table-column>
        <el-table-column
          prop="born_year"
          label="Born_year"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="job"
          label="Job"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="native_place"
          label="Native_place"
          width='120'>
        </el-table-column>
        <el-table-column
          prop="work_place"
          label="Work_place"
          width='120'>
        </el-table-column>
        <el-table-column
          prop="specialty"
          label="Specialty"
          width='120'>
        </el-table-column>
        <el-table-column
          prop="other"
          label="Other"
          width='200'>
          <template slot-scope='scope'>
            <el-tooltip class="item" effect="dark" :content="scope.row.other" placement="top">
              <p class='wrap'>{{scope.row.other}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="ref"
          width='120'
          label="Ref">
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
          fixed='right'
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
import { apiGetList, apiDelete } from '@/api/girl.js'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      tableData:[]
    }
  },
  created(){
    this.getData();
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    },
    getData(){
      apiGetList().then((res)=>{
        this.tableData = res.data;
      })
    },
    editHandle(id){
      this.$router.push({
        path:'/form/girl',
        query:{
          id
        }
      })
    },
    deleHandle(id){
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
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
  .wrap{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>

