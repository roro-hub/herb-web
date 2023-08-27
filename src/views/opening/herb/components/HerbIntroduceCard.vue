<template>
  <div id="herb-introduce-card">
    <div class="card-title">
        {{ herbIntroduceTitle }}
    </div>
    <div class="card-content">
      <div class="herb-type">
        <div v-for="(herbType, i) of herbTypeList" :key="herbType + i"
          :class="herbType == herbTypeSelected ? 'herb-type-item-selected' : 'herb-type-item'"
          @click="handleChangeHerbType(herbType)"
          >
          {{ herbType }}
        </div>
        <div class="herb-type-item" @click="handleViewDiet()">
          药膳
        </div>
      </div>
      <div class="herb">
        <div v-for="(herb, i) of herbList" :key="herb + i"
          :class="herb == herbSelected ? 'herb-item-selected' : 'herb-item'"
          :style="getHerbItemWidth()"
          @click="handleChangeHerb(herb)"
          >
          {{ herb }}
        </div>
      </div>
      <div class="herb-info">
        <img class="image" 
          :src="herbSelectedImage ? herbSelectedImage : require('../../../../assets/herb_images/药膳.png')"
        />
        <div class="herb-content">{{ herbSelectedContent }}</div>
      </div>
    </div>
    <el-dialog
      class="diet-dialog" 
      :title="'药膳'"
      top="5vh"
      :visible.sync="dialogVisible"
      width="1015px" height="965px" append-to-body>
      <div class="diet-tab-group">
        <div class="diet-tab-selected">药膳1</div>
        <div class="diet-tab">药膳2</div>
        <div class="diet-tab">药膳3</div>
        <div class="diet-tab">药膳4</div>
        <div class="diet-tab">药膳5</div>
        <div class="diet-tab">药膳6</div>
      </div>
      <div class="diet-info">
        <div class="diet-title">{{ dietTitle }}</div>
        <div class="diet-content">{{ dietContent }}</div>
        <div class="diet-images">
            <div class="image-item">
                <img class="image" :src="image1 ? image1 : require('../../../../assets/herb_images/药膳.png')" />
                <div class="image-bottom">{{ imageName }}</div>
            </div>
            <div class="image-item">
                <img class="image" :src="image1 ? image1 : require('../../../../assets/herb_images/药膳.png')" />
                <div class="image-bottom">{{ imageName }}</div>
            </div>
            <div class="image-item">
                <img class="image" :src="image1 ? image1 : require('../../../../assets/herb_images/药膳.png')" />
                <div class="image-bottom">{{ imageName }}</div>
            </div>
        </div>
      </div>
      <div class="diet-video">
        <img class="diet-video-item" :src="require('../../../../assets/herb_images/药膳.png')"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchHerbTypeList } from "@/api/herbType";
import { fetchHerbList } from "@/api/herb";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1000,
  herbType: null,
};
export default {
    name: "HerbIntroduceCard",
    props: {
      herbIntroduceTitle: {
        type: String,
        default: "中药科普",
      },
    },
    watch: {
    },
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        herbTypeList: ['居六味', '新浙八味', '老浙八味'],
        herbTypeDbs: [],
        herbTypeSelected: '居六味',
        herbList: [],
        herbDbs: [],
        herbSelected: null,
        herbSelectedImage: null,
        herbSelectedContent: '功能主治：白术具有健脾益气、祛湿利水、安胎的功效，可用于治疗脾虚腹胀、食欲不振、水肿、胎动不安等病症。',
        dialogVisible: false,
        dietTitle: '药膳烹饪方法',
        dietContent: '药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法药膳烹饪方法',
        image1: null,
        imageName: '药膳照片',
      };
    },
    created() {
      this.getHerbTypeList();
    },
    methods: {
      getHerbTypeList() {
        fetchHerbTypeList(this.listQuery).then((response) => {
          if (response.data.list && response.data.list.length > 0) {
            this.herbTypeDbs = response.data.list;
            this.herbTypeList = [];
            this.herbTypeSelected = response.data.list[0]['name'];
            for (let item of response.data.list) {
              this.herbTypeList.push(item.name);
            }
            this.getHerbList();
          }
        });
      },
      handleChangeHerbType(herbType) {
        this.herbTypeSelected = herbType;
        this.getHerbList();
      },
      getHerbList() {
        let herbTypeId = null;
        if (this.herbTypeSelected) {
          for (let item of this.herbTypeDbs) {
            if (item.name == this.herbTypeSelected) {
              herbTypeId = item.id;
            }
          }
        }
        if (herbTypeId) {
          this.listQuery.herbType = herbTypeId;
          fetchHerbList(this.listQuery).then((response) => {
            if (response.data.list && response.data.list.length > 0) {
              this.herbList = [];
              this.herbDbs = response.data.list;
              this.herbSelected = response.data.list[0]['name'];
              this.herbSelectedImage = response.data.list[0]['images'];
              this.herbSelectedContent = response.data.list[0]['content'];
              for (let item of response.data.list) {
                this.herbList.push(item.name);
              }
              this.getHerbItemWidth();
            }
          });
        }
      },
      getHerbItemWidth() {
        let width = '30%'
        if (this.herbList && this.herbList.length > 0) {
          if (this.herbList.length <= 6) {
            width = '30%';
          } else if (this.herbList.length <= 8) {
            width = '22%';
          } else {
            width = '17%';
          }
        }
        return {'width': width}
      },
      handleChangeHerb(herb) {
        this.herbSelected = herb;
        for (let item of this.herbDbs) {
          if (item['name'] == this.herbSelected) {
            this.herbSelectedImage = item['images'];
            this.herbSelectedContent = item['content'];
          }
        }
      },
      handleViewDiet() {
        this.dialogVisible = true;
      },
    },
  };
</script>
  
<style lang="less">
  #herb-introduce-card {
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
      padding-bottom: 10px;
      height: calc(~"100% - 50px");
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      background-image: url(../../../../assets/herb_images/矩形@3x.png);
      background-size: 100% 100%;
      .herb-type {
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 10px;
        .herb-type-item {
          width: 24%;
          height: 100%;
          background-image: url(../../../../assets/herb_images/药材类型.png);
          background-size: 100% 140%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }
        .herb-type-item-selected {
          width: 24%;
          height: 100%;
          background-image: url(../../../../assets/herb_images/药材类型选中.png);
          background-size: 100% 140%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }
      }
      .herb {
        height: 40%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .herb-item{
          width: 30%;
          height: 45%;
          background-image: url(../../../../assets/herb_images/药材.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }
        .herb-item-selected {
          width: 30%;
          height: 45%;
          background-image: url(../../../../assets/herb_images/药材选中.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }
      }
      .herb-info {
        height: 40%;
        width: 100%;
        margin-top: 10px;
        padding: 0 10px;
        display: flex;
        .image {
          height: 100%;
          width: 30%;
          border: 2px solid #44B5EA;
        }
        .herb-content {
          width: 60%;
          margin-left: 20px;
          color: #A2CDFF;
        }
      }
    }
  }
  .diet-dialog {
    .el-dialog {
      background: #000;
      background-image: url('../../../../assets/herb_images/药膳弹框背景.png');
      background-size: 100% 100%;
      // height: 80%;
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__header {
        padding: 20px 20px 10px 30px;
    }

    .el-dialog__body {
      height: 930px;
      padding: 30px 40px 20px 40px;
      .diet-tab-group {
        width: 100%;
        height: 40px;
        display: flex;
        margin-bottom: 20px;
        justify-content: space-around;
        .diet-tab {
          width: 120px;
          height: 36px;
          margin: 0 10px;
          background-image: url(../../../../assets/herb_images/价格框.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          color:#71BDFF;
          font-size: 10px;
        }
        .diet-tab-selected {
          width: 120px;
          height: 30px;
          margin: 0 10px;
          background-image: url(../../../../assets/herb_images/价格框选中.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          color:#71BDFF;
          font-size: 10px;
        }
      }
      .diet-info {
        width: 100%;
        height: 460px;
        padding: 0 26px;
        border: 1px solid #7AE0FF;
        .diet-title {
          color: #A2CDFF;
          margin: 20px 0;
          height: 30px;
          font-size: 18px;
        }
        .diet-content {
          color: #A2CDFF;
          height: 230px;
          font-size: 16px;
        }
        .diet-images {
          height: 140px;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          .image-item {
            margin: 0 20px 0 0;
            width: 180px;
            display: flex;
            flex-direction: column;
            position: relative;
            .image {
                height: 100%;
                border: 2px solid #44B5EA;
            }
            .image-bottom {
                background-image: url(../../../../assets/herb_images/矩形@2x.png);
                background-size: 100% 100%;
                height: 25px;
                position: absolute;
                width: 100%;
                bottom: 0;
                color: #A2CDFF;
                justify-content: center;
                align-items: center;
                display: flex;
            }
          }
        }
      }
      .diet-video {
        width: 100%;
        height: 320px;
        border: 1px solid #7AE0FF;
        margin: 20px 0;
        padding: 16px 26px;
        .diet-video-item {
          width: 100%;
          height: 100%;
          border: 1px solid #7AE0FF;
        }
      }
    }
  }
  </style>
  