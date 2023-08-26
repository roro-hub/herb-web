<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="dietDetail" :rules="rules" ref="dietForm" label-width="120px">
      <el-form-item label="药膳名称：" prop="name">
        <el-input v-model="dietDetail.herbName"></el-input>
      </el-form-item>
      <el-form-item label="药膳标题：" prop="name">
        <el-input v-model="dietDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input
          :autosize="{ minRows: 6 }"
          v-model="dietDetail.content"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="药膳图片：">
        <multi-upload v-model="selectPics"></multi-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('dietForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('dietForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {createDiet,updateDiet,getDietDetail} from '@/api/diet';
  import MultiUpload from "@/components/Upload/multiUpload";

  const defaultDietDetail= {
    id: 0,
    name: null,
    herbName: null,
    content: null,
    images: null,
    video: null,
    type: 'diet'
  };
  export default {
    name: "dietDetail",
    components: { MultiUpload },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dietDetail: Object.assign({}, defaultDietDetail),
        selectDietList: [],
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ],
        },
      };
    },
    created() {
      if (this.isEdit) {
        getDietDetail(this.$route.query.id).then(response => {
          this.dietDetail = response.data;
        });
      } else {
        this.dietDetail = Object.assign({}, defaultDietDetail);
      }
    },
    computed:{
      selectPics: {
        get: function () {
          let pics = [];
          if (
            this.dietDetail.images === undefined ||
            this.dietDetail.images == null ||
            this.dietDetail.images === ""
          ) {
            return pics;
          }
          let imageList = this.dietDetail.images.split(",");
          for (let i = 0; i < imageList.length; i++) {
            pics.push(imageList[i]);
          }
          return pics;
        },
        set: function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.dietDetail.images = null;
          } else {
            this.dietDetail.images = "";
            if (newValue.length > 1) {
              for (let i = 0; i < newValue.length; i++) {
                this.dietDetail.images += newValue[i];
                if (i !== newValue.length - 1) {
                  this.dietDetail.images += ",";
                }
              }
            } else {
              this.dietDetail.images = newValue[0];
            }
          }
        },
      }
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
                updateDiet(this.dietDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createDiet(this.dietDetail).then(response => {
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
