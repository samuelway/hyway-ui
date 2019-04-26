<template>
  <d2-container>
    <!-- header 查询条件 -->
    <template slot="header">
      <el-form
        :inline="true"
        :model="listQuery"
        size="mini"
        style="margin-bottom: -18px;">
          <el-form-item label="日志类型" prop="type">
            <el-select v-model="listQuery.type" filterable placeholder="请选择" clearable>
              <el-option label="登录日志" value="Login"></el-option>
              <el-option label="操作日志" value="Operation"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="default" icon="el-icon-search" @click="handleFilter">搜 索</el-button>
          </el-form-item>
           <el-form-item>
              <el-button type="primary" icon="el-icon-refresh" >刷新缓存</el-button>
          </el-form-item>
      </el-form>
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

      <el-table-column align="center" label="字典标志" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.dictCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="字典标志描述" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.dictCodeDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="字典类型">
        <template slot-scope="scope">
          <span>{{ scope.row.dictType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="字典类型描述">
        <template slot-scope="scope">
          <span>{{ scope.row.dictTypeDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.dictsort}}</span>
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
  </d2-container>
</template>

<script>
import { delObj, fetchList } from '@/api/sys/dict/dict'
import { mapGetters } from 'vuex'

export default {
  name: 'table_log',
  data () {
    return {
      list: null,
      total: null,
      sys_dict_add: false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
