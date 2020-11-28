<!--
 * @Author: tian.gao
 * @Date: 2020-11-24 16:59:40
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-28 13:22:58
 * @Description:
-->
<template>

  <div class="trusts">
    <el-button style="float:left;margin:10px" type="primary" @click="dialogVisible=true">新增</el-button>
    <el-button style="float:left;margin:10px" type="primary" @click="unlogin">退出</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="code"
        label="基金代码"
        width="100">
      </el-table-column>
      <el-table-column
        prop="upperLimit"
        label="涨幅超过"
        width="100">
      </el-table-column>
      <el-table-column
        prop="downLimit"
        label="跌幅超过"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mail"
        label="邮箱">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="400px">
      <el-form
        ref="trustsFormRef"
        :model="trustsForm"
        :rules="trustsFormRules"
        label-width="0px"
        class="trusts_form"
      >
        <!-- id -->
        <el-form-item prop="code">
          基金id
          <el-input v-model="trustsForm.code" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="upperLimit">
          涨幅超过
          <el-input v-model.number="trustsForm.upperLimit" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="downLimit">
          跌幅超过
          <el-input v-model.number="trustsForm.downLimit" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          邮箱
          <el-input v-model="trustsForm.mail" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="success" @click="register">新增</el-button>
          <el-button type="success" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
</el-dialog>
  </div>
</template>

<script>
import { createTrusts, getTrusts, deleteTrusts } from '@/api/app.js'
export default {
  name: 'Trusts',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data () {
    return {
      tableData: [],
      dialogVisible: false,
      trustsForm: {
        code: '',
        upperLimit: '',
        downLimit: '',
        mail: ''
      },
      trustsFormRules: {
        code: [
          { required: true, message: '请输入基金id', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ],
        upperLimit: [
          { type: 'number', min: 0, message: '必须为数字值,且为正数', trigger: 'blur' }
        ],
        downLimit: [
          { type: 'number', min: 0, message: '必须为数字值,且为正数', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
  },

  watch: {
  },

  mounted () {
    this.trustsall()
  },
  methods: {
    handleDelete (row) {
      const param = { ...row, uid: window.sessionStorage.getItem('token') }
      deleteTrusts(param).then(({ data }) => {
        if (data.state === 'ok') {
          this.$message.success('删除成功')
          this.trustsall()
        }
      })
    },
    register () {
      this.$refs.trustsFormRef.validate(async valid => {
        if (!valid) return
        const param = { ...this.trustsForm, uid: window.sessionStorage.getItem('token') }
        createTrusts(param).then(({ data }) => {
          if (data.state === 'ok') {
            this.$refs.trustsFormRef.resetFields()
            this.$message.success('创建成功')
            this.trustsall()
          }
        })
      })
    },
    search () {

    },
    trustsall () {
      getTrusts({ uid: window.sessionStorage.getItem('token') }).then(({ data }) => {
        this.tableData = data
      })
    },
    unlogin () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.trusts{
  width: 670px;
  margin: auto;
}
</style>
