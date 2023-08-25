<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="salesDetail" :rules="rules" ref="salesForm" label-width="120px">
      <el-form-item label="管理员名称：" prop="name">
        <el-input v-model="salesDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="salesDetail.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="salesDetail.email"></el-input>
      </el-form-item>
      <el-form-item label="管理员图片：">
        <single-upload v-model="salesDetail.image"></single-upload>
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
  import {fetchList,createSales,updateSales,deleteSales,getSalesDetail} from '@/api/sales';
  import SingleUpload from "@/components/Upload/singleUpload";

  const defaultSalesDetail= {
    id: 0,
    name: '',
    phone: '',
    email: '',
    image: ''
  };
  export default {
    name: "SalesDetail",
    components: { SingleUpload },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        salesDetail: Object.assign({}, defaultSalesDetail),
        rules: {
          name: [
            {required: true, message: '请输入管理员名称', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ],
          telephone: [
            {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
          ],
        }
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
    },
    computed:{
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateSales(this.$route.query.id, this.salesDetail).then(response => {
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
