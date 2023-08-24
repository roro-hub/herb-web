<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="managerDetail" :rules="rules" ref="managerForm" label-width="120px">
      <el-form-item label="管理员名称：" prop="name">
        <el-input v-model="managerDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="managerDetail.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="managerDetail.email"></el-input>
      </el-form-item>
      <el-form-item label="管理员图片：">
        <single-upload v-model="managerDetail.image"></single-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('managerForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('managerForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createManager,updateManager,deleteManager,getManagerDetail} from '@/api/manager';
  import SingleUpload from "@/components/Upload/singleUpload";

  const defaultManagerDetail= {
    id: 0,
    name: '',
    phone: '',
    email: '',
    image: ''
  };
  export default {
    name: "ManagerDetail",
    components: { SingleUpload },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        managerDetail: Object.assign({}, defaultManagerDetail),
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
        getManagerDetail(this.$route.query.id).then(response => {
          this.managerDetail = response.data;
        });
      } else {
        this.managerDetail = Object.assign({}, defaultManagerDetail);
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
                updateManager(this.$route.query.id, this.managerDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createManager(this.managerDetail).then(response => {
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
