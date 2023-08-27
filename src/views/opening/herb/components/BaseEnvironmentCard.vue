<template>
  <div id="base-environment-card">
    <div class="card-title">
        {{ baseEnvironmentTitle }}
    </div>
    <div class="card-content">
      <div class="werther-title">{{ wertherTitle }}</div>
      <div class="werther-content">
        <div class="werther-item">
          <img class="image" :src="require('../../../../assets/herb_images/温度图标.png')" />
          <div class="werther-info">
            <div class="werther-info-item">温度</div>
            <div class="werther-info-item">30℃</div>
          </div>
        </div>
        <div class="werther-item">
          <img class="image" :src="require('../../../../assets/herb_images/湿度图标.png')" />
          <div class="werther-info">
            <div class="werther-info-item">湿度</div>
            <div class="werther-info-item">18.8</div>
          </div>
        </div>
        <div class="werther-item">
          <img class="image" :src="require('../../../../assets/herb_images/风向图标.png')" />
          <div class="werther-info">
            <div class="werther-info-item">风向</div>
            <div class="werther-info-item">东南风</div>
          </div>
        </div>
        <div class="werther-item">
          <img class="image" :src="require('../../../../assets/herb_images/风力图标.png')" />
          <div class="werther-info">
            <div class="werther-info-item">风力</div>
            <div class="werther-info-item">3-4级</div>
          </div>
        </div>
      </div>
      <div class="soil">
        <img class="image" :src="soilImage ? soilImage : require('../../../../assets/herb_images/土壤.png')" />
        <div class="soil-info">
          <div class="soil-title">{{ soilName }}</div>
          <div class="soil-content">{{ soilContent }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "BaseEnvironmentCard",
    props: {
      baseEnvironmentTitle: {
        type: String,
        default: "基地环境",
      },
      soilName: {
        type: String,
        default: "土壤介绍",
      },
      soilContent: {
        type: String,
        default: "土壤介绍内容",
      },
      soilImage: {
        type: String,
        default: null,
      },
    },
    watch: {
    },
    data() {
      return {
        wertherTitle: '小气候监测',
      };
    },
    created() {
    },
    methods: {
    },
  };
</script>
  
<style lang="less">
  #base-environment-card {
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

      .werther-title {
        height: 32px;
        width: 329px;
        background-image: url(../../../../assets/herb_images/天气框.png);
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
      }

      .werther-content {
        height: 38%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        padding: 0 10px;
        .werther-item {
          width: 24%;
          display: flex;
          .image {
            height: 100%;
            width: 40%;
          }
          .werther-info {
            // height: 100%;
            width: 60%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .werther-info-item {
              height: 45%;
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

      .soil {
        height: 50%;
        width: 100%;
        margin-top: 10px;
        padding: 0 10px;
        display: flex;
        color: #A2CDFF;
        .image {
          height: 100%;
          width: 30%;
          border: 2px solid #44B5EA;
        }
        .soil-info {
          width: 60%;
          margin-left: 20px;
          .soil-title {
            margin-bottom: 4px;
          }
        }
      }
    }
  }
  </style>
  