<template>
  <d2-container>
    <!-- header 查询条件 -->
    <div slot="header" flex="main:justify">
       <el-button type="primary" icon="el-icon-refresh" @click="dialogFormVisible = true">添加路由</el-button>
       <el-button type="primary" icon="el-icon-refresh" @click="refreshRoute">刷新缓存</el-button>
       <el-button type="primary" icon="el-icon-refresh" @click="refreshRemoteRoute">刷新网关缓存</el-button>
    </div>
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

      <el-table-column align="center" label="路由ID" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.routeId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务转发地址" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.forwardUri }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="路由排序">
        <template slot-scope="scope">
          <span>{{ scope.row.routeOrder }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="路由拦截器">
        <template slot-scope="scope">
          <span>{{ scope.row.routeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="路由断言">
        <template slot-scope="scope">
          <span>{{ scope.row.routePredicates}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否启用">
        <template slot-scope="scope">
          <span>{{ scope.row.routeEnable}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否删除">
        <template slot-scope="scope">
          <span>{{ scope.row.deleteState}}</span>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
    <el-dialog title="添加路由" :visible.sync="dialogFormVisible" width="40%"  :before-close="handleClose" modal>
    <el-form ref="form" :model="form" label-width="80px" >
    <el-form-item label="路由ID" prop="routeId" :rules="[
      { required: true, message: '路由ID不能为空'}
    ]">
      <el-input type="routeId" v-model="form.routeId"></el-input>
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
import { refreshRemote,refresh,delObj, fetchList } from '@/api/sys/route/route'
import { mapGetters } from 'vuex'

export default {
  name: 'table_log',
  data () {
    return {
      list: null,
      total: null,
      dialogFormVisible:false,
      value:new Date(),
      sys_resources_add: false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      form:{routeId:''},
      tableKey: 0
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
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    refreshRoute(){

    },
    refreshRemoteRoute(){

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
    },onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            addObj(this.form).then(response => {
              if(response){
                this.dialogFormVisible = false
                this.$notify({
                  title: '添加成功',
                  message: '菜单添加成功',
                  type: 'success'
                });
                this.getList()
              }else{
                this.$notify.error({
                  title: '添加错误',
                  message: '菜单添加错误',
                  type: 'success'
                });
              }
            })
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
