<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="mapPointDetail" :rules="rules" ref="mapPointForm" label-width="120px">
      <el-form-item label="地图标记名称：" prop="name">
        <el-input v-model="mapPointDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="标记类型：" prop="pointType">
        <el-input v-model="mapPointDetail.pointType"></el-input>
      </el-form-item>
      <el-form-item label="坐标经度：" prop="longitude">
        <el-input v-model="mapPointDetail.longitude"></el-input>
      </el-form-item>
      <el-form-item label="坐标纬度：" prop="latitude">
        <el-input v-model="mapPointDetail.latitude"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="mapPointDetail.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('mapPointForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('mapPointForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createMapPoint,updateMapPoint,deleteMapPoint,getMapPointDetail} from '@/api/mapPoint';

  const defaultMapPointDetail= {
    id: 0,
    name: '',
    position: '',
    description: '',
    pointType: '',
    type: 'point'
  };
  export default {
    name: "MapPointDetail",
    components: { },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        mapPointDetail: Object.assign({}, defaultMapPointDetail),
        rules: {
        }
      };
    },
    created() {
      if (this.isEdit) {
        getMapPointDetail(this.$route.query.id).then(response => {
          this.mapPointDetail = response.data;
        });
      } else {
        this.mapPointDetail = Object.assign({}, defaultMapPointDetail);
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
              this.mapPointDetail.position = "["+this.mapPointDetail.latitude+","+this.mapPointDetail.longitude+"]";
              if (this.isEdit) {
                updateMapPoint(this.mapPointDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createMapPoint(this.mapPointDetail).then(response => {
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
