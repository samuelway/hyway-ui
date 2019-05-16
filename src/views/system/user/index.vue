<template>
  <d2-container>
    <!-- header 查询条件 -->
    <template slot="header">
      <el-form
        :inline="true"
        :model="listQuery"
        size="mini"
        style="margin-bottom: -18px;">
          <el-form-item label="用户名" >
              <el-input v-model="listQuery.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="default" icon="el-icon-search" @click="handleFilter">搜 索</el-button>
          </el-form-item>
      </el-form>
      <el-button type="default" icon="el-icon-add" @click="dialogFormVisible = true">添加菜单</el-button>
    </template>
    <el-table
            :key='tableKey'
            :data="list"
            v-loading="listLoading"
            element-loading-text="拼命加载中..."
            highlight-current-row
            stripe
            style="width: 100%">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{ getSerialNumber(scope.$index) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="uuid" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.uuid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text"  @click="handleEditUser(scope.row)"  size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- footer 分页条 -->
    <template slot="footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[10,20,30,50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin: -10px;">
        </el-pagination>
    </template>
  <!-- :before-close="handleClose" -->
 <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%"  modal> 
  <el-form ref="form" :model="form" label-width="80px" > 
      <el-form-item label="用户名" prop="name" :rules="[{ required: true, message: '用户名不能为空'}]"> 
        <el-input type="name" AUTOCOMPLETE="off" v-model="form.name"></el-input> 
      </el-form-item> 
      <el-form-item label="密码"  :rules="[{ required: true, message: '密码不能为空'}]"> 
        <el-input type="password" :visible.sync="dialogFormpwdVisible" AUTOCOMPLETE="off" v-model="form.password"></el-input> 
      </el-form-item> 
      <el-form-item label="手机"> 
        <el-input v-model="form.phone"></el-input> 
      </el-form-item>
      <el-form-item label="头像"> 
        <el-select v-model="form.avatar" placeholder="请选择请求方式"> 
            <el-option label="POST" value="POST"></el-option> 
            <el-option label="GET" value="GET"></el-option>
        </el-select> 
    </el-form-item> 
    <el-form-item label="所属部门"> 
          
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
       <el-button @click="dialogFormVisible = false">取 消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>

  </d2-container>
</template>

<script>
import { addObj,getObj,delObj,updateObj, fetchList } from '@/api/sys/user/user'
import { mapGetters } from 'vuex'



export default {
  name: 'table_log',
  data () {
    return {
      list: null,
      total: null,
      sys_user_add: false,
      dialogFormVisible: false,
      dialogFormpwdVisible:true,
      form: {
          id: '',
          username: '',
          password: '',
          phone: '',
          avatar: '',
          label: '',
          dept_id: ''
      },
      isClearable:true,     // 可清空（可选）
      isAccordion:true,     // 可收起（可选）
      valueId:0,            // 初始ID（可选）
      props:{               // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children',
        // disabled:true
      },
      dialogTitle: '用户新增',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        username: ''
      },
      tableKey: 0,
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  created () {
    this.getList()
  },
  methods: {
    getSerialNumber (index) {
      return index + 1 + (this.listQuery.page - 1) * this.listQuery.limit
    },
    getList () {
      this.listLoading = true
      this.listQuery.orderByField = 'create_time'
      this.listQuery.isAsc = false
      fetchList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      })
    },
    handleEditUser(row){
        this.dialogTitle='用户修改' 
        this.dialogFormVisible = true
        this.dialogFormpwdVisible=false
        getObj(row.userId).then(response => {
          this.form.password=''
          this.form=response
          console.log(response)
        })
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDelete (row) {
      delObj(row.id).then(response => {
        this.dialogFormVisible = false
        this.getList()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },handleNodeClick(data) {
        this.dialogTitle='用户修改'
        this.dialogFormVisible = true
        this.form=data
        this.form.permission=data.authority
    },onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.form.id!=''){
              updateObj(this.form).then(response => {
                  if(response){
                    this.dialogFormVisible = false
                    this.$notify({
                      title: '修改成功',
                      message: '用户修改成功',
                      type: 'success'
                    });
                    this.getList()
                  }else{
                    this.$notify.error({
                      title: '修改错误',
                      message: '用户修改错误',
                      type: 'success'
                    });
                  }
                })
            }else{
              addObj(this.form).then(response => {
                if(response){
                  this.dialogFormVisible = false
                  this.$notify({
                    title: '添加成功',
                    message: '用户添加成功',
                    type: 'success'
                  });
                  this.getList()
                }else{
                  this.$notify.error({
                    title: '添加错误',
                    message: '用户添加错误',
                    type: 'success'
                  });
                }
              })
            }
          } else {
            
            return false;
          }
        });
    },handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
