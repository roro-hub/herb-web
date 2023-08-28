<template>
  <div id="herb-processing-card">
    <div class="card-title">
        {{ HerbProcessingTitle }}
        <div class="card-button">
          <div class="card-title-item">加工工艺</div>
          <div class="card-title-item" @click="handleViewProcessingWorkshop()">加工车间</div>
        </div>
    </div>
    <div class="card-content">
      <div class="herb">
        <div v-for="herb of herbList" :key="herb.id"
          :class="herb.name == herbSelected ? 'herb-item-selected' : 'herb-item'"
          @click="handleChangeHerb(herb.id, herb.name)">
          {{ herb.name }}
        </div>
      </div>
      <div class="herb-processing">
        <div v-for="processing of processingList" :key="processing.id">
            <div class="image-item">
              <img class="image" :src="processing.image ? processing.image : require('../../../../assets/herb_images/药材加工.png')" />
              <div class="image-bottom">{{ processing.name }}</div>
            </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="processing-workshop-dialog" 
      :title="'加工车间'"
      :visible.sync="dialogVisible"
      width="823px" height="365px" append-to-body>
      <div class="workshop-monitor">
        <div class="image-item">
          <img class="image" :src="image4 ? image4 : require('../../../../assets/herb_images/中药加工车间.png')" />
          <div class="image-bottom">{{ imageName }}</div>
        </div>
      </div>
      <div class="workshop-monitor">
        <div class="image-item">
          <img class="image" :src="image4 ? image4 : require('../../../../assets/herb_images/中药加工车间.png')" />
          <div class="image-bottom">{{ imageName }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import { fetchHerbList } from "@/api/herb";
import { fetchProcessingList } from "@/api/processing";

  export default {
    name: "HerbProcessingCard",
    props: {
      HerbProcessingTitle: {
        type: String,
        default: "中药加工",
      },
    },
    watch: {
    },
    data() {
      return {
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        processingName1: '工艺环节1',
        processingName2: '工艺环节2',
        processingName3: '工艺环节3',
        dialogVisible: false,
        imageName: '加工车间',
        herbId: null,
        herbName: null,
        herbSelected: null,
        herbList: [],
        processingList: [],
      };
    },
    created() {
      this.getHerbList();
    },
    methods: {
      handleViewProcessingWorkshop() {
        this.dialogVisible = true;
      },
      getHerbList() {
        fetchHerbList({ pageSize: 1000, pageNum: 1 }).then((response) => {
          this.herbList = response.data.list;
          if (this.herbList.length > 0) {
            this.herbSelected = this.herbList[0].name;
          }
        });
      },
      handleChangeHerb(herbId, herbName) {
        let herbQuery = {
          'herbId': herbId,
          'herbName': herbName,
          'pageNum': 1,
          'pageSize': 1   
        }
        fetchProcessingList(herbQuery).then((response) => {
          this.processingList = response.data.list;
        });
      }
    },
  };
</script>
  
<style lang="less">
  #herb-processing-card {
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
      .card-button {
        display: flex;
        justify-content: flex-end;
        width: 80%;
        .card-title-item {
          margin-left: 20px;
          width: 100px;
          height: 30px;
          background-image: url(../../../../assets/herb_images/加工矩形.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
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
      .herb {
        height: 30%;
        width: 100%;
        display: flex;
        // flex-wrap: wrap;
        // justify-content: space-evenly;
        .herb-item{
          width: 30%;
          height: 90%;
          background-image: url(../../../../assets/herb_images/药材.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }
        .herb-item-selected {
          width: 30%;
          height: 90%;
          background-image: url(../../../../assets/herb_images/药材选中.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }
      }
      .herb-processing {
        height: 65%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .image-item {
            width: 32%;
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
  }

  .processing-workshop-dialog {
    .el-dialog {
      background: #000;
      background-image: url('../../../../assets/herb_images/加工车间弹框背景.png');
      background-size: 100% 100%;
      // height: 80%;
    }
    .el-dialog__title {
      color: #fff;
    }

    .el-dialog__body {
      height: 330px;
      padding: 30px 20px 20px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .workshop-monitor {
        width: 350px;
        height: 258px;
        margin: 0 20px;
        background-image: url(../../../../assets/herb_images/加工车间框.png);
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 44px 30px 16px 30px;
        .image-item {
          width: 100%;
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
              height: 30px;
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
  }
  </style>
  