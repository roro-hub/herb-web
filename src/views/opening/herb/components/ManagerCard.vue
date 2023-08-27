<template>
  <div id="manager-card">
    <div class="card-title">
        {{ managerTitle }}
    </div>
    <div class="card-content">
      <div v-for="item of managerList" :key="item"
        class="manager-item">
        <img class="image" :src="item.image ? item.image : require('../../../../assets/herb_images/位图@3x.png')"/>
        <div class="manager-info">
          <div class="manager-info-item">{{ item.name }}</div>
          <div class="manager-info-item">{{ item.phone }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { fetchList } from "@/api/manager";

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 4,
    name: null,
  };
  export default {
    name: "ManagerCard",
    props: {
      managerTitle: {
        type: String,
        default: "市场管理员",
      },
    },
    watch: {
    },
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        managerList: [{
          'id': 1,
          'name': '管理员',
          'phone': '11111111111',
          'image': null,
        }, {
          'id': 2,
          'name': '管理员',
          'phone': '11111111111',
          'image': null,
        }, {
          'id': 3,
          'name': '管理员',
          'phone': '11111111111',
          'image': null,
        }, {
          'id': 4,
          'name': '管理员',
          'phone': '11111111111',
          'image': null,
        }],
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        fetchList(this.listQuery).then((response) => {
          if (response.data.list && response.data.list.length > 0) {
            this.managerList = response.data.list;
          } 
        });
      },
    },
  };
</script>
  
<style lang="less">
  #manager-card {
    position: relative;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    .card-title {
      height: 40px;
      font-size: 18px;
      display: flex;
      align-items: center;
      background-image: url(../../../../assets/herb_images/标题@3x.png);
      background-size: 100% 100%;
      padding-left: 50px;
      font-weight: 700;
    }
  
    .card-content {
      margin: 10px 0 10px 10px;
      padding: 0 10px;
      height: calc(~"100% - 50px");
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      background-image: url(../../../../assets/herb_images/矩形@3x.png);
      background-size: 100% 100%;
      .manager-item {
        width: 45%;
        height: 45%;
        display: flex;
        .image {
          height: 100%;
          width: 32%;
          border: 1px solid #44B5EA;
        }
        .manager-info {
          height: 100%;
          width: 64%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
          .manager-info-item {
            background-image: url(../../../../assets/herb_images/矩形2@2x.png);
            background-size: 100% 100%;
            height: 45%;
            width: 90%;
            padding-left: 10px;
            color: #A2CDFF;
            font-weight: 700;
            display: flex;
            /* justify-content: center; */
            align-items: center;
          }
        }
      }
    }
  }
  </style>
  