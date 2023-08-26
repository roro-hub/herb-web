<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="yieldDetail" :rules="rules" ref="yieldForm" label-width="120px">
      <el-form-item label="药材名称：" prop="name">
        <el-select v-model="yieldDetail.herbId" placeholder="请选择药材">
          <el-option
            v-for="item in selectHerbList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销量" prop="quantity">
        <el-input v-model="yieldDetail.quantity"></el-input>
      </el-form-item>
      <el-form-item label="销售时间：" prop="saleTime">
        <el-date-picker
          class="input-width"
          v-model="yieldDetail.recordMonth"
          value-format="yyyy-MM"
          type="month"
          placeholder="请选择月份"
          align="right"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('yieldForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('yieldForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {createYield,updateYield,getYieldDetail} from '@/api/yield';
  import {fetchList} from "@/api/herb";

  const defaultYieldDetail= {
    id: 0,
    name: null,
    herbId: null,
    quantity: null,
    recordMonth: null,
    type: 'yield'
  };
  export default {
    name: "yieldDetail",
    components: {},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        yieldDetail: Object.assign({}, defaultYieldDetail),
        selectHerbList: [],
        rules: {}
      };
    },
    created() {
      if (this.isEdit) {
        getYieldDetail(this.$route.query.id).then(response => {
          this.yieldDetail = response.data;
        });
      } else {
        this.yieldDetail = Object.assign({}, defaultYieldDetail);
      }
      this.getSelectHerbList();
    },
    computed:{
    },
    methods: {
      getSelectHerbList() {
        fetchList({ pageSize: 1000, pageNum: 1 }).then((response) => {
          this.selectHerbList = response.data.list;
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.yieldDetail.herbId) {
                for (let item of this.selectHerbList) {
                  if (this.yieldDetail.herbId == item['id']) {
                    this.yieldDetail.name = item['name'];
                  }
                }
              }
              if (this.isEdit) {
                updateYield(this.yieldDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createYield(this.yieldDetail).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      back() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
</style>
