<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="salesDetail" :rules="rules" ref="salesForm" label-width="120px">
      <el-form-item label="药材名称：" prop="name">
        <el-select v-model="salesDetail.herbId" placeholder="请选择药材">
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
        <el-input v-model="salesDetail.quantity"></el-input>
      </el-form-item>
      <el-form-item label="销售时间：" prop="saleTime">
        <el-date-picker
          class="input-width"
          v-model="salesDetail.recordMonth"
          value-format="yyyy-MM"
          type="month"
          placeholder="请选择月份"
          align="right"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('salesForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('salesForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {createSales,updateSales,getSalesDetail} from '@/api/sales';
  import {fetchList} from "@/api/herb";

  const defaultSalesDetail= {
    id: 0,
    name: null,
    herbId: null,
    quantity: null,
    recordMonth: null,
    type: 'sales'
  };
  export default {
    name: "salesDetail",
    components: {},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        salesDetail: Object.assign({}, defaultSalesDetail),
        selectHerbList: [],
        rules: {}
      };
    },
    created() {
      if (this.isEdit) {
        getSalesDetail(this.$route.query.id).then(response => {
          this.salesDetail = response.data;
        });
      } else {
        this.salesDetail = Object.assign({}, defaultSalesDetail);
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
              if (this.salesDetail.herbId) {
                for (let item of this.selectHerbList) {
                  if (this.salesDetail.herbId == item['id']) {
                    this.salesDetail.name = item['name'];
                  }
                }
              }
              if (this.isEdit) {
                updateSales(this.salesDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createSales(this.salesDetail).then(response => {
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
