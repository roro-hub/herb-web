<template>
  <el-select v-model="salesId" clearable @change="sendSales()">
    <el-option
      v-for="item of list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
import { fetchList } from "@/api/sales";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000000,
};
export default {
  name: "salesSelect",
  components: {},
  props: {
    salesSelectedId: {
      type: Number,
      default: null,
    },
    salesSelectedName: {
      type: String,
      default: null,
    },
    checkDeviceFlag: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      salesSelected: null,
      esalesId: null,
      salesSelectedInfo: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
    };
  },
  created() {
    this.salesId = this.salesSelectedId;
    this.getList();
  },
  watch: {
    salesSelectedId(newV, oldV) {
      this.salesId = newV;
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
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
      fetchList(this.listQuery).then((response) => {
        let list = response.data.list;
        let salesSelectedInfo = {};
        let newList = [];
        for (let item of list) {
          if (this.salesSelectedName && this.salesSelectedName == item.name) {
            this.salesId = item.id;
          }
          if (this.checkDeviceFlag) {
            newList.push(item)
          } else {
            if (item.name != '采集设备') {
              newList.push(item)
            }
          }
          salesSelectedInfo[item.id.toString()] = item;
        }
        console.log(this.checkDeviceFlag)
        console.log(newList)
        this.list = newList;
        this.salesSelectedInfo = salesSelectedInfo;
        this.total = response.data.total;
      });
    },
    sendsales() {
      //1.子组件通过子定义事件的方式将sales信息传给父组件
      this.salesSelected = this.salesSelectedInfo[this.salesId.toString()];
      this.$emit("equipment-cate", this.salesSelected);
    },
  },
};
</script>

<style scoped>
</style>