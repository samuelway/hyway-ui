<template>
  <d2-container>
    <!-- header 查询条件 -->
    <template slot="header">
     <el-button type="default" icon="el-icon-add" @click="dialogFormVisible = true">添加部门</el-button>
    </template>
  <el-dialog title="添加部门" :visible.sync="dialogFormVisible" width="40%"
  :before-close="handleClose" modal>
    <el-form ref="form" :model="form" label-width="80px" >
    <el-form-item label="部门名称" prop="name" :rules="[
      { required: true, message: '部门名称不能为空'}
    ]">
      <el-input type="name" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="上级部门">
      <SelectTree 
      :props="props"
      :options="optionData"
      :value="valueId"
      :clearable="isClearable"
      :accordion="isAccordion"
      @getValue="getValue($event)"/>
    </el-form-item>
     <el-form-item label="排序">
      <el-input v-model="form.orderNum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
       <el-button @click="dialogFormVisible = false">取 消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </d2-container>
</template>

<script>
import { addObj,fetchTreeList } from '@/api/sys/dept/dept'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/tree/treeSelect.vue';

export default {
  name: "el-tree-select",
  components: {
    SelectTree
  },
  data () {
    return {
      listLoading: true,
      listQuery: {
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
      dialogFormVisible: false,
      dialogTitle: '部门新增',
      form: {
          id: '',
          name: '',
          parentId: '',
          orderNum: ''
      },
      data:[],
      defaultProps: {
          children: 'children',
          label: 'label'
      },
      tableKey: 0
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    optionData(){
      let cloneData = JSON.parse(JSON.stringify(this.data))      // 对源数据深度克隆
      return  cloneData.filter(father=>{                      // 循环所有项，并添加children属性
          let branchArr = cloneData.filter(child=>father.id == child.parentId);       // 返回每一项的子级数组
          branchArr.length>0 ? father.children=branchArr : ''   //给父级添加一个children属性，并赋值
          return father.parentId==0;      //返回第一层
      });
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      this.listQuery.orderByField = 'create_time'
      this.listQuery.isAsc = false
      fetchTreeList(this.listQuery).then(response => {
        this.data = response
        this.options = response
        this.listLoading = false
      })
    },handleNodeClick(data) {
        this.dialogTitle='部门修改'
        this.dialogFormVisible = true
        this.form=data  
    },onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            addObj(this.form).then(response => {
              if(response){
                this.dialogFormVisible = false
                this.$notify({
                  title: '添加成功',
                  message: '部门添加成功',
                  type: 'success'
                });
                this.getList()
              }else{
                this.$notify.error({
                  title: '添加错误',
                  message: '部门添加错误',
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
    },getValue(value){
      this.valueId = value
      this.form.parentId=this.valueId
    }
  },
}
</script>
<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
