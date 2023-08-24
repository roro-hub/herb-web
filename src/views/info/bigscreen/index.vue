<template>
  <div class="bigscreen-container">
    <el-descriptions title="大屏信息配置" :column="1" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="handleUpdateInfo()">
          编辑
        </el-button>
      </template>
      <el-descriptions-item label="市场介绍">
        {{ bigscreenDetail.configDataJson.marketContent }}
      </el-descriptions-item>
      <el-descriptions-item label="草堂名称">
        {{ bigscreenDetail.configDataJson.cottageName }}
      </el-descriptions-item>
      <el-descriptions-item label="草堂介绍">
        {{ bigscreenDetail.configDataJson.cottageContent }}
      </el-descriptions-item>
      <el-form
          :model="bigscreenDetailCopy"
          ref="bigscreenForm"
          label-width="150px"
          size="small"
        >
        <el-form-item label="草堂图片：">
          <multi-upload v-model="selectPics"></multi-upload>
        </el-form-item>
      </el-form>
      <el-descriptions-item label="服务清单买家">
        {{ bigscreenDetail.configDataJson.serviceBuyer }}
      </el-descriptions-item>
      <el-descriptions-item label="服务清单卖家">
        {{ bigscreenDetail.configDataJson.serviceSeller }}
      </el-descriptions-item>
      <el-descriptions-item label="土壤信息">
        {{ bigscreenDetail.configDataJson.soilContent }}
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog
      :title="'编辑大屏信息配置'"
      :visible.sync="dialogVisible"
      width="60%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  updateInfo
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
          marketContent: "",
          cottageName: "",
          cottageContent: "",
          cottageImages: [],
          serviceBuyer: "",
          serviceSeller: "",
          soilContent: ""
        }
      },
      bigscreenDetail: {
        id: null,
        name: "bigscreenMap",
        configDataJson: {
          marketContent: "",
          cottageName: "",
          cottageContent: "",
          cottageImages: [],
          serviceBuyer: "",
          serviceSeller: "",
          soilContent: ""
        }
      }
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
          this.bigscreenDetailCopy.configDataJson.cottageImages === undefined ||
          this.bigscreenDetailCopy.configDataJson.cottageImages == null ||
          this.bigscreenDetailCopy.configDataJson.cottageImages === ""
        ) {
          return pics;
        }
        let imageList = this.bigscreenDetailCopy.configDataJson.cottageImages.split(",");
        for (let i = 0; i < imageList.length; i++) {
          pics.push(imageList[i]);
        }
        return pics;
      },
      set: function (newValue) {
        if (newValue == null || newValue.length === 0) {
          this.bigscreenDetailCopy.configDataJson.cottageImages = null;
        } else {
          this.bigscreenDetailCopy.configDataJson.cottageImages = "";
          if (newValue.length > 1) {
            for (let i = 0; i < newValue.length; i++) {
              this.bigscreenDetailCopy.configDataJson.cottageImages += newValue[i];
              if (i !== newValue.length - 1) {
                this.bigscreenDetailCopy.configDataJson.cottageImages += ",";
              }
            }
          } else {
            this.bigscreenDetailCopy.configDataJson.cottageImages = newValue[0];
          }
        }
      },
    },
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.types = "market,soil,serve_list_buyer,serve_list_seller,cottage";
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data;
        let that = this;
        for (let i in list) {
          if (list[i].type == "market") {
            that.bigscreenDetail.configDataJson.marketContent = list[i].content;
          } else if (list[i].type == "cottage") {
            that.bigscreenDetail.configDataJson.cottageName = list[i].name;
            that.bigscreenDetail.configDataJson.cottageContent = list[i].content;
          } else if (list[i].type == "cottage") {
            that.bigscreenDetail.configDataJson.cottageName = list[i].name;
            that.bigscreenDetail.configDataJson.cottageContent = list[i].content;
            that.bigscreenDetail.configDataJson.cottageImages = list[i].images;
          } else if (list[i].type == "serve_list_buyer") {
            that.bigscreenDetail.configDataJson.serviceBuyer = list[i].content;
          } else if (list[i].type == "serve_list_seller") {
            that.bigscreenDetail.configDataJson.serviceSeller = list[i].content;
          } else if (list[i].type == "soil") {
            that.bigscreenDetail.configDataJson.soilContent = list[i].content;
          }
        }
        console.info(that.bigscreenDetail);
      },
    )},
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


