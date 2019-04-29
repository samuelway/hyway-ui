<template>
  <d2-container>
    <!-- header 查询条件 -->
    <template slot="header">
    <el-button type="default" icon="el-icon-add" @click="dialogRoleFormVisible = true">添加角色</el-button>
    </template>
      <el-dialog title="添加角色" :visible.sync="dialogRoleFormVisible" width="40%"   :before-close="handleClose" modal>
      <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="角色名" prop="name" :rules="[
        { required: true, message: '菜单名称不能为空'}
      ]">
        <el-input type="name" v-model="form.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色code" prop="code" :rules="[
        { required: true, message: '角色code不能为空'}
      ]">
        <el-input type="code" v-model="form.roleCode"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.roleDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="dialogRolePermissionFormVisible" width="40%"   :before-close="handleClose" modal>
        <el-form ref="rpform" :model="rpform" label-width="80px" >
          <el-tree ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="checkedKeys" check-strictly
            :props="defaultProps" >
          </el-tree>
        <el-form-item>
          <el-button type="primary" @click="onSubmitRolePermission('rpform')">确认分配</el-button>
          <el-button @click="dialogRolePermissionFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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

      <el-table-column align="center" label="角色名" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色代码" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.roleCode }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色描述">
        <template slot-scope="scope">
          <span>{{ scope.row.roleDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="authPermission(scope.row)" type="text" size="small">分配权限</el-button>
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
  </d2-container>
</template>

<script>
import { fetchRoleResList,assignRoleermissions,delObj, fetchList } from '@/api/sys/role/role'
import { addObj,fetchTreeList } from '@/api/sys/resources/resources'
import { mapGetters } from 'vuex'

export default {
  name: 'table_log',
  data () {
    return {
      list: null,
      total: null,
      checkedKeys: [1],
      checkedExpKeys: [2],
      sys_role_add: false,
      dialogRoleFormVisible:false,
      dialogRolePermissionFormVisible:false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      form: {
          id: '',
          roleName: '',
          roleCode: '',
          roleDesc: ''
      },
      rpform:{
          roleId:'',
          roleName:'',
          menuIds:[]
      },
      roleReqForm:{
        roleId:''
      },
      rpData:[],
      data:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
      fetchTreeList(this.listQuery).then(response => {
        this.data = response
        this.listLoading = false
      })
    },
    getRoleTree(roleId){
      this.roleReqForm.roleId=roleId
      fetchRoleResList(this.roleReqForm).then(response => {
        this.checkedKeys = response
      })
    },
    authPermission(data){
     this.dialogRolePermissionFormVisible = true
     this.getRoleTree(data.roleId)
     this.rpform.roleId=data.roleId
     this.rpform.roleName=data.roleName
    },
    onSubmitRolePermission(formName){
      this.rpform.menuIds=this.$refs.tree.getCheckedKeys()
      console.log(this.rpform.menuIds)
      assignRoleermissions(this.rpform).then(response => {
        if(response){
                this.dialogRolePermissionFormVisible = false
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
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
            done()
            }).catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
