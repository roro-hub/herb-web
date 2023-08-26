<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="herbTypeDetail" :rules="rules" ref="herbTypeForm" label-width="120px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="herbTypeDetail.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('herbTypeForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('herbTypeForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createHerbType,updateHerbType,deleteHerbType,getHerbTypeDetail} from '@/api/herbType';
  import SingleUpload from "@/components/Upload/singleUpload";

  const defaultHerbTypeDetail= {
    id: 0,
    name: null,
  };
  export default {
    name: "HerbTypeDetail",
    components: { SingleUpload },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        herbTypeDetail: Object.assign({}, defaultHerbTypeDetail),
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      if (this.isEdit) {
        getHerbTypeDetail(this.$route.query.id).then(response => {
          this.herbTypeDetail = response.data;
        });
      } else {
        this.herbTypeDetail = Object.assign({}, defaultHerbTypeDetail);
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
                updateHerbType(this.$route.query.id, this.herbTypeDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createHerbType(this.herbTypeDetail).then(response => {
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
