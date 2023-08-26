<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="herbDetail" :rules="rules" ref="herbForm" label-width="120px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="herbDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="类型：" prop="herbType">
        <el-input v-model="herbDetail.herbType"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input v-model="herbDetail.content"></el-input>
      </el-form-item>
      <el-form-item label="图片：">
        <single-upload v-model="herbDetail.images"></single-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('herbForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('herbForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createHerb,updateHerb,deleteHerb,getHerbDetail} from '@/api/herb';
  import SingleUpload from "@/components/Upload/singleUpload";

  const defaultHerbDetail= {
    id: 0,
    name: null,
    herbType: null,
    content: null,
    images: null
  };
  export default {
    name: "HerbDetail",
    components: { SingleUpload },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        herbDetail: Object.assign({}, defaultHerbDetail),
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
        getHerbDetail(this.$route.query.id).then(response => {
          this.herbDetail = response.data;
        });
      } else {
        this.herbDetail = Object.assign({}, defaultHerbDetail);
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
                updateHerb(this.$route.query.id, this.herbDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createHerb(this.herbDetail).then(response => {
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
