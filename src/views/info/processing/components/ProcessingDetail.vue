<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="processingDetail" :rules="rules" ref="processingForm" label-width="120px">
      <el-form-item label="药材名称：" prop="herbName">
        <el-select v-model="processingDetail.herbId" placeholder="请选择药材">
          <el-option
            v-for="item in selectHerbList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加工工艺标题：" prop="name">
        <el-input v-model="processingDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input
          :autosize="{ minRows: 6 }"
          v-model="processingDetail.content"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="工艺环节图片：">
        <multi-upload v-model="selectPics"></multi-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('processingForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('processingForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {createProcessing,updateProcessing,getProcessingDetail} from '@/api/processing';
  import {fetchList} from "@/api/herb";
  import MultiUpload from "@/components/Upload/multiUpload";

  const defaultProcessingDetail= {
    id: 0,
    name: null,
    herbId: null,
    herbName: null,
    content: null,
    images: null,
    type: 'processing'
  };
  export default {
    name: "processingDetail",
    components: { MultiUpload },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        processingDetail: Object.assign({}, defaultProcessingDetail),
        selectProcessingList: [],
        selectHerbList: [],
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
        getProcessingDetail(this.$route.query.id).then(response => {
          this.processingDetail = response.data;
        });
      } else {
        this.processingDetail = Object.assign({}, defaultProcessingDetail);
      }
      this.getSelectHerbList();
    },
    computed:{
      selectPics: {
        get: function () {
          let pics = [];
          if (
            this.processingDetail.images === undefined ||
            this.processingDetail.images == null ||
            this.processingDetail.images === ""
          ) {
            return pics;
          }
          let imageList = this.processingDetail.images.split(",");
          for (let i = 0; i < imageList.length; i++) {
            pics.push(imageList[i]);
          }
          return pics;
        },
        set: function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.processingDetail.images = null;
          } else {
            this.processingDetail.images = "";
            if (newValue.length > 1) {
              for (let i = 0; i < newValue.length; i++) {
                this.processingDetail.images += newValue[i];
                if (i !== newValue.length - 1) {
                  this.processingDetail.images += ",";
                }
              }
            } else {
              this.processingDetail.images = newValue[0];
            }
          }
        },
      }
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
              if (this.processingDetail.herbId) {
                for (let item of this.selectHerbList) {
                  if (this.processingDetail.herbId == item['id']) {
                    this.processingDetail.herbName = item['name'];
                  }
                }
              }
              if (this.isEdit) {
                updateProcessing(this.processingDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createProcessing(this.processingDetail).then(response => {
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
