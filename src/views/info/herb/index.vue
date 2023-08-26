<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="名称：">
            <el-input
              v-model="listQuery.name"
              class="input-width"
              placeholder="药材名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型：" prop="herbType">
            <el-select v-model="listQuery.herbType" placeholder="请选择类型">
              <el-option
                v-for="item in selectHerbTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        v-if="showUpperLevel"
        class="btn-add"
        style="margin-left: 10px;"
        @click="handleShowUpperLevel()"
        size="mini">
        返回上一级
      </el-button>
      <el-button
        class="btn-add"
        @click="handleAddHerb()"
        size="mini"
      >
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="infoEquipmentCateable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="名称" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{ scope.row.herbTypeName }}</template>
        </el-table-column>
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column label="图片" width="100" align="center">
          <template slot-scope="scope">
            <img style="height: 80px;width: 80px" :src="scope.row.images">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateHerb(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteHerb(scope.$index, scope.row)"
                >删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList, deleteHerb } from "@/api/herb";
import { fetchHerbTypeList } from "@/api/herbType";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
};
export default {
  name: "infoHerbList",
  components: {},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      showUpperLevel: false,
      selectHerbTypeList: []
    };
  },
  created() {
    this.showUpperLevel = this.$route.query.showUpperLevel == 1 ? true : false;
    this.getList();
    this.getSelectHerbTypeList();
  },
  filters: {},
  methods: {
    getSelectHerbTypeList() {
      fetchHerbTypeList({ pageSize: 1000, pageNum: 1 }).then((response) => {
        this.selectHerbTypeList = response.data.list;
      });
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddHerb() {
      this.$router.push({ path: "/info/addHerb" });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleShowUpperLevel() {
      this.$router.back();
    },
    handleUpdateHerb(index, row) {
      this.$router.push({
        path: "/info/updateHerb",
        query: { id: row.id },
      });
    },
    handleDeleteHerb(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteHerb(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


