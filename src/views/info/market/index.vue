<template>
  <div class="bigscreen-container">
    <el-descriptions title="市场基础信息" :column="1" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="handleUpdateInfo()">
          编辑
        </el-button>
      </template>
      <el-descriptions-item label="市场介绍">
        {{ infoDetail.configDataJson.market }}
      </el-descriptions-item>
      <el-descriptions-item label="草堂信息">
        {{ infoDetail.configDataJson.market }}
      </el-descriptions-item>
      <el-descriptions-item label="土壤信息">
        {{ infoDetail.configDataJson.soil }}
      </el-descriptions-item>
      <el-descriptions-item label="右四图表数据">
        
      </el-descriptions-item>
      <el-descriptions-item label="中间底部图片">
        <div v-for="image of centerBottomImageList" :key="image" >
          <img class="image" :src="image" />
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog
      :title="'编辑大屏配置'"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form
          :model="bigscreenDetailCopy"
          ref="bigscreenForm"
          label-width="150px"
          size="small"
        >
        <el-form-item label="中间底部图片：">
          <multi-upload v-model="selectPics"></multi-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  createBigscreen,
  updateBigscreen,
  updateBigscreenByName,
  deleteBigscreen,
  getBigscreenDetail,
} from "@/api/bigscreen";
import MultiUpload from "@/components/Upload/multiUpload";
import lodash from "lodash";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
export default {
  name: "bigscreenMap",
  components: {MultiUpload},
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      listQuery: Object.assign({}, defaultListQuery),
      bigscreenDetailCopy: {
        id: null,
        name: "bigscreenMap",
        configDataJson: {
          mainTitle: "",
          leftTitle2: "",
          leftTitle3: "",
          leftTitle4: "",
          rightTitle1: "",
          rightTitle2: "",
          rightTitle3: "",
          rightTitle4: "",
          rightTable4: [],
          centerBottomImages: "",
        },
      },
      bigscreenDetail: {
        id: null,
        name: "bigscreenMap",
        configDataJson: {
          mainTitle: "",
          leftTitle2: "",
          leftTitle3: "",
          leftTitle4: "",
          rightTitle1: "",
          rightTitle2: "",
          rightTitle3: "",
          rightTitle4: "",
          rightTable4: [],
          centerBottomImages: "",
        },
      },
      centerBottomImageList: [],
    };
  },
  created() {
    this.getList();
  },
  filters: {},
  computed: {
    selectPics: {
      get: function () {
        let pics = [];
        if (
          this.bigscreenDetailCopy.configDataJson.centerBottomImages === undefined ||
          this.bigscreenDetailCopy.configDataJson.centerBottomImages == null ||
          this.bigscreenDetailCopy.configDataJson.centerBottomImages === ""
        ) {
          return pics;
        }
        let imageList = this.bigscreenDetailCopy.configDataJson.centerBottomImages.split(",");
        for (let i = 0; i < imageList.length; i++) {
          pics.push(imageList[i]);
        }
        return pics;
      },
      set: function (newValue) {
        if (newValue == null || newValue.length === 0) {
          this.bigscreenDetailCopy.configDataJson.centerBottomImages = null;
        } else {
          this.bigscreenDetailCopy.configDataJson.centerBottomImages = "";
          if (newValue.length > 1) {
            for (let i = 0; i < newValue.length; i++) {
              this.bigscreenDetailCopy.configDataJson.centerBottomImages += newValue[i];
              if (i !== newValue.length - 1) {
                this.bigscreenDetailCopy.configDataJson.centerBottomImages += ",";
              }
            }
          } else {
            this.bigscreenDetailCopy.configDataJson.centerBottomImages = newValue[0];
          }
        }
      },
    },
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.name = "bigscreenMap";
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data.list;
        if (list.length > 0) {
          this.bigscreenDetail = list[0];
          this.centerBottomImageList = this.bigscreenDetail.configDataJson.centerBottomImages.split(",");
        }
      });
    },
    handleViewOpeningPage(index, row) {
      let url = "/#/opening/bigscreenMap";
      window.open(url, "_blank");
    },
    handleUpdateInfo() {
      this.bigscreenDetailCopy = lodash.cloneDeep(this.bigscreenDetail)
      this.checkTableDataEmpty();
      this.dialogVisible = true;
    },
    handleDialogConfirm() {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateBigscreenByName("bigscreenMap", this.bigscreenDetailCopy).then(
          (response) => {
            this.$message({
              message: "修改成功",
              type: "success",
              duration: 1000,
            });
            this.dialogVisible = false;
            this.getList();
          }
        );
      });
    },
    handleAddColumn() {
      let data = {
        testItem: '',
        testMethod: '',
        testValue: '',
        standardValue: '',
        singleConclusion: '',
      }
      this.bigscreenDetailCopy.configDataJson.rightTable4.push(data);
    },
    handleDeleteColumn(index, row) {
      this.bigscreenDetailCopy.configDataJson.rightTable4.splice(index, 1);
      this.checkTableDataEmpty();
    },
    checkTableDataEmpty() {
      if (this.bigscreenDetailCopy.configDataJson.rightTable4.length == 0) {
        let data = {
          testItem: '',
          testMethod: '',
          testValue: '',
          standardValue: '',
          singleConclusion: '',
        }
        this.bigscreenDetailCopy.configDataJson.rightTable4.push(data);
      }
    }
  },
};
</script>
<style scoped>
.bigscreen-container {
  padding: 40px 60px;
}
.el-descriptions__title {
  font-size: 22px !important;
}
.form-width {
  width: 400px;
}
.icon-class {
  font-size: 22px;
}
.image {
  float: left;
  margin-right: 10px;
  height: 150px;
  width: 150px;
}
</style>


