<template>
  <div class="bigscreen-container">
    <el-descriptions title="大屏信息配置" :column="1" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="handleViewOpeningPage()"
          >查看大屏页面</el-button
        >
        <el-button type="primary" size="small" @click="handleUpdateInfo()">
          编辑
        </el-button>
      </template>
      <el-descriptions-item label="产量(万斤)">
        {{ bigscreenDetail.configDataJson.yield }}
      </el-descriptions-item>
      <el-descriptions-item label="面积(亩)">
        {{ bigscreenDetail.configDataJson.area }}
      </el-descriptions-item>
      <el-descriptions-item label="产值(万元)">
        {{ bigscreenDetail.configDataJson.output }}
      </el-descriptions-item>
      <el-descriptions-item label="市场介绍">
        {{ bigscreenDetail.configDataJson.marketContent }}
      </el-descriptions-item>
      <el-descriptions-item label="草堂名称">
        {{ bigscreenDetail.configDataJson.cottageName }}
      </el-descriptions-item>
      <el-descriptions-item label="草堂介绍">
        {{ bigscreenDetail.configDataJson.cottageContent }}
      </el-descriptions-item>
      <el-descriptions-item label="草堂图片">
        <div v-for="(image, i) in cottageImageList" :key="'image_' + i" >
          <img class="image" :src="image" />
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="服务清单买家承诺">
        {{ bigscreenDetail.configDataJson.serviceBuyer }}
      </el-descriptions-item>
      <el-descriptions-item label="服务清单卖家承诺">
        {{ bigscreenDetail.configDataJson.serviceSeller }}
      </el-descriptions-item>
      <el-descriptions-item label="土壤名称">
        {{ bigscreenDetail.configDataJson.soilName }}
      </el-descriptions-item>
      <el-descriptions-item label="土壤介绍">
        {{ bigscreenDetail.configDataJson.soilContent }}
      </el-descriptions-item>
      <el-descriptions-item label="土壤图片">
        <img class="image" :src="bigscreenDetail.configDataJson.soilImage" />
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog
      :title="'编辑大屏信息配置'"
      :visible.sync="dialogVisible"
      width="60%">
      <el-form
        :model="bigscreenDetailCopy"
        ref="bigscreenForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="产量(万斤)：">
          <el-input-number
            class="form-width"
            v-model="bigscreenDetailCopy.configDataJson.yield"
            :min="0"
            :max="100000000000000000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="面积(亩)：">
          <el-input-number
            class="form-width"
            v-model="bigscreenDetailCopy.configDataJson.area"
            :min="0"
            :max="100000000000000000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="产值(万元)：">
          <el-input-number
            class="form-width"
            v-model="bigscreenDetailCopy.configDataJson.output"
            :min="0"
            :max="100000000000000000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="市场介绍：">
          <el-input
            class="form-width"
            :autosize="{ minRows: 4 }"
            v-model="bigscreenDetailCopy.configDataJson.marketContent"
            type="textarea"
            placeholder="请输入市场介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="草堂名称：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.cottageName"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="草堂介绍：">
          <el-input
            class="form-width"
            :autosize="{ minRows: 4 }"
            v-model="bigscreenDetailCopy.configDataJson.cottageContent"
            type="textarea"
            placeholder="请输入草堂介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="草堂图片：">
          <multi-upload v-model="selectPics"></multi-upload>
        </el-form-item>
        <el-form-item label="服务清单买家承诺：">
          <el-input
            class="form-width"
            :autosize="{ minRows: 4 }"
            v-model="bigscreenDetailCopy.configDataJson.serviceBuyer"
            type="textarea"
            placeholder="请输入服务清单买家承诺"
          ></el-input>
        </el-form-item>
        <el-form-item label="服务清单卖家承诺：">
          <el-input
            class="form-width"
            :autosize="{ minRows: 4 }"
            v-model="bigscreenDetailCopy.configDataJson.serviceSeller"
            type="textarea"
            placeholder="请输入服务清单卖家承诺"
          ></el-input>
        </el-form-item>
        <el-form-item label="土壤名称：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.soilName"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="土壤介绍：">
          <el-input
            class="form-width"
            :autosize="{ minRows: 4 }"
            v-model="bigscreenDetailCopy.configDataJson.soilContent"
            type="textarea"
            placeholder="请输入土壤介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="土壤图片：">
          <single-upload v-model="bigscreenDetailCopy.configDataJson.soilImage"></single-upload>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small" :loading="confirmLoading">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  addInfo,
  updateInfo
} from "@/api/bigscreen";
import MultiUpload from "@/components/Upload/multiUpload";
import SingleUpload from "@/components/Upload/singleUpload";
import lodash from "lodash";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
const TYPES = "market,soil,serve_list_buyer,serve_list_seller,cottage,yield,area,output";
export default {
  name: "bigscreenMap",
  components: {MultiUpload, SingleUpload},
  data() {
    return {
      dialogVisible: false,
      confirmLoading: false,
      listLoading: false,
      listQuery: Object.assign({}, defaultListQuery),
      infoList: [],
      bigscreenDetailCopy: {
        id: null,
        name: "bigscreenMap",
        configDataJson: {
          yield: null,
          area: null,
          output: null,
          marketContent: "",
          cottageName: "",
          cottageContent: "",
          cottageImages: null,
          serviceBuyer: "",
          serviceSeller: "",
          soilName: "",
          soilContent: "",
          soilImage: null,
        }
      },
      bigscreenDetail: {
        id: null,
        name: "bigscreenMap",
        configDataJson: {
          yield: null,
          area: null,
          output: null,
          marketContent: "",
          cottageName: "",
          cottageContent: "",
          cottageImages: null,
          serviceBuyer: "",
          serviceSeller: "",
          soilName: "",
          soilContent: "",
          soilImage: null,
        }
      },
      cottageImageList: [],
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
      this.listQuery.types = TYPES;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data;
        let that = this;
        this.infoList = list;
        for (let i in list) {
          if (list[i].type == "market") {
            that.bigscreenDetail.configDataJson.marketContent = list[i].content;
          } else if (list[i].type == "cottage") {
            that.bigscreenDetail.configDataJson.cottageName = list[i].name;
            that.bigscreenDetail.configDataJson.cottageContent = list[i].content;
            that.bigscreenDetail.configDataJson.cottageImages = list[i].images;
            if (list[i].images) {
              that.cottageImageList = list[i].images.split(",");
            }
          } else if (list[i].type == "serve_list_buyer") {
            that.bigscreenDetail.configDataJson.serviceBuyer = list[i].content;
          } else if (list[i].type == "serve_list_seller") {
            that.bigscreenDetail.configDataJson.serviceSeller = list[i].content;
          } else if (list[i].type == "soil") {
            that.bigscreenDetail.configDataJson.soilName = list[i].name;
            that.bigscreenDetail.configDataJson.soilContent = list[i].content;
            that.bigscreenDetail.configDataJson.soilImage = list[i].images;
          } else if (list[i].type == "yield") {
            that.bigscreenDetail.configDataJson.yield = list[i].content;
          } else if (list[i].type == "area") {
            that.bigscreenDetail.configDataJson.area = list[i].content;
          } else if (list[i].type == "output") {
            that.bigscreenDetail.configDataJson.output = list[i].content;
          }
        }
        console.info(that.bigscreenDetail);
      },
    )},
    handleViewOpeningPage(index, row) {
      let url = "/#/opening/herb";
      window.open(url, "_blank");
    },
    handleUpdateInfo() {
      this.bigscreenDetailCopy = lodash.cloneDeep(this.bigscreenDetail)
      this.dialogVisible = true;
    },
    handleDialogConfirm() {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.confirmLoading = true;
        let dbDatas = this.getDbDatas();
        let addInfoList = dbDatas[0]
        let updateInfoList = dbDatas[1]

        if (addInfoList) {
          for (let item of addInfoList) {
            addInfo(item).then(
              (response) => {
              }
            );
          }
        }
        if (updateInfoList) {
          for (let item of updateInfoList) {
            updateInfo(item).then(
              (response) => {
              }
            );
          }
        }
        setTimeout(() => {
          this.dialogVisible = false;
          this.confirmLoading = false;
          this.getList();
        }, 1000)
      });
    },
    getDbDatas() {
      let addInfoList = [];
      let updateInfoList = [];
      let typeList = TYPES.split(",");
      let existTypeList = [];
      for (let item of this.infoList) {
        existTypeList.push(item.type)
        let updateFlag = false;
        if (item.type == "market") {
          if (this.bigscreenDetailCopy.configDataJson.marketContent != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.marketContent;
            updateFlag = true
          }
        } else if (item.type == "cottage") {
          if (this.bigscreenDetailCopy.configDataJson.cottageName != item.name) {
            item.name = this.bigscreenDetailCopy.configDataJson.cottageName;
            updateFlag = true;
          }
          if (this.bigscreenDetailCopy.configDataJson.cottageContent != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.cottageContent;
            updateFlag = true;
          }
          if (this.bigscreenDetailCopy.configDataJson.cottageImages != item.images) {
            item.images = this.bigscreenDetailCopy.configDataJson.cottageImages;
            updateFlag = true;
          }
        } else if (item.type == "serve_list_buyer") {
          if (this.bigscreenDetailCopy.configDataJson.serviceBuyer != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.serviceBuyer;
            updateFlag = true;
          }
        } else if (item.type == "serve_list_seller") {
          if (this.bigscreenDetailCopy.configDataJson.serviceSeller != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.serviceSeller;
            updateFlag = true;
          }
        } else if (item.type == "soil") {
          if (this.bigscreenDetailCopy.configDataJson.soilName != item.name) {
            item.name = this.bigscreenDetailCopy.configDataJson.soilName;
            updateFlag = true;
          }
          if (this.bigscreenDetailCopy.configDataJson.soilContent != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.soilContent;
            updateFlag = true;
          }
          if (this.bigscreenDetailCopy.configDataJson.soilImage != item.images) {
            item.images = this.bigscreenDetailCopy.configDataJson.soilImage;
            updateFlag = true;
          }
        } else if (item.type == "yield") {
          if (this.bigscreenDetailCopy.configDataJson.yield != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.yield;
            updateFlag = true;
          }
        } else if (item.type == "area") {
          if (this.bigscreenDetailCopy.configDataJson.area != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.area;
            updateFlag = true;
          }
        } else if (item.type == "output") {
          if (this.bigscreenDetailCopy.configDataJson.output != item.content) {
            item.content = this.bigscreenDetailCopy.configDataJson.output;
            updateFlag = true;
          }
        }
        if (updateFlag) {
          updateInfoList.push(item)
        }
      }
      // let minus = typeList.filter(x => !existTypeList.has(x));
      let minus = typeList.filter(function(v){ return existTypeList.indexOf(v) == -1 })
      for (let type of minus) {
        let item = {
          "name": null,
          "content": null,
          "images": null,
          "type": type,
        }
        if (type == 'market') {
          item.content = this.bigscreenDetailCopy.configDataJson.marketContent;
        } else if (type == 'cottage') {
          item.name = this.bigscreenDetailCopy.configDataJson.cottageName;
          item.content = this.bigscreenDetailCopy.configDataJson.cottageContent;
          item.images = this.bigscreenDetailCopy.configDataJson.cottageImages;
        } else if (type == 'serve_list_buyer') {
          item.content = this.bigscreenDetailCopy.configDataJson.serviceBuyer;
        } else if (type == 'serve_list_seller') {
          item.content = this.bigscreenDetailCopy.configDataJson.serviceSeller;
        } else if (type == 'soil') {
          item.name = this.bigscreenDetailCopy.configDataJson.soilName;
          item.content = this.bigscreenDetailCopy.configDataJson.soilContent;
          item.images = this.bigscreenDetailCopy.configDataJson.soilImage;
        } else if (type == 'yield') {
          item.content = this.bigscreenDetailCopy.configDataJson.yield;
        } else if (type == 'area') {
          item.content = this.bigscreenDetailCopy.configDataJson.area;
        } else if (type == 'output') {
          item.content = this.bigscreenDetailCopy.configDataJson.output;
        }
        addInfoList.push(item)
      }
      return [addInfoList, updateInfoList]
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


