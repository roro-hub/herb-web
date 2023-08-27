<template>
  <div id="base-monitor-card">
    <div class="card-title">
        {{ baseMonitorTitle }}
    </div>
    <div class="card-content">
       <div class="base-monitor-images">
          <div class="image-item">
              <img class="image" 
              @click="handleViewBaseMonitor()"
              :src="image1 ? image1 : require('../../../../assets/herb_images/大棚.png')" />
          </div>
          <div class="image-item">
              <img class="image" 
              @click="handleViewBaseMonitor()"
              :src="image2 ? image2 : require('../../../../assets/herb_images/大棚.png')" />
          </div>
          <div class="image-item">
              <img class="image" 
              @click="handleViewBaseMonitor()"
              :src="image3 ? image3 : require('../../../../assets/herb_images/大棚.png')" />
          </div>
        </div>
    </div>
    <el-dialog
      class="base-monitor-dialog" 
      :title="'基地监控'"
      :visible.sync="dialogVisible"
      top="5vh"
      width="1443px" height="925px" append-to-body>
      <div class="base-monitor" v-for = "i of 17" :key="i">
        <div class="image-item">
          <img class="image" :src="image4 ? image4 : require('../../../../assets/herb_images/大棚.png')" />
          <div class="image-bottom">{{ imageName }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
  export default {
    name: "BaseMonitorCard",
    props: {
      baseMonitorTitle: {
        type: String,
        default: "基地监控",
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
        dialogVisible: false,
        imageName: '基地监控',
      };
    },
    created() {
    },
    methods: {
      handleViewBaseMonitor() {
        this.dialogVisible = true;
      }
    },
  };
</script>
  
<style lang="less">
  #base-monitor-card {
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
      .base-monitor-images {
        height: 100%;
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
        }
      }
    }
  }

  .base-monitor-dialog {
    .el-dialog {
      background: #000;
      background-image: url('../../../../assets/herb_images/基地监控弹框背景.png');
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
      height: 890px;
      padding: 30px 20px 20px 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      .base-monitor {
        width: 250px;
        height: 188px;
        margin: 0 15px;
        background-image: url(../../../../assets/herb_images/加工车间框.png);
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 34px 20px 16px 20px;
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
  