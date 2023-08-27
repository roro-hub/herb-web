<template>
  <div id="market-card">
    <div class="card-title">
        {{ marketTitle }}
    </div>
    <div class="card-content">
        <div class="market-content">{{ marketContent }}</div>
        <div class="cottage-name">{{ cottageName }}</div>
        <div class="cottage-content">{{ cottageContent }}</div>
        <div class="cottage-images">
            <div class="image-item">
                <img class="image" :src="image1 ? image1 : require('../../../../assets/herb_images/荣誉证书.png')" />
                <div class="image-bottom">{{ cottageName }}荣誉</div>
            </div>
            <div class="image-item">
                <img class="image" :src="image2 ? image2 : require('../../../../assets/herb_images/荣誉证书.png')" />
                <div class="image-bottom">{{ cottageName }}荣誉</div>
            </div>
            <div class="image-item">
                <img class="image" :src="image3 ? image3 : require('../../../../assets/herb_images/荣誉证书.png')" />
                <div class="image-bottom">{{ cottageName }}荣誉</div>
            </div>
        </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "MarketCard",
    props: {
      marketTitle: {
        type: String,
        default: "市场介绍",
      },
      marketContent: {
        type: String,
        default: "市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍市场介绍",
      },
      cottageName: {
        type: String,
        default: "大陈草堂",
      },
      cottageContent: {
        type: String,
        default: "大陈草堂介绍大陈草堂介绍大陈草堂介绍大陈草堂介绍大陈草堂介绍大陈草堂介绍大陈草堂介绍大陈草堂介绍大陈草堂介绍大陈草堂介绍",
      },
      cottageImages: {
        type: String,
        default: null,
      },
    },
    watch: {
    },
    data() {
      return {
        image1: null,
        image2: null,
        image3: null,
      };
    },
    created() {
      if (this.cottageImages) {
        let cottageImageList = this.cottageImages.split(',');
        this.image1 = cottageImageList[0];
        if (cottageImageList.length > 1) {
          this.image2 = cottageImageList[1];
        } 
        if (cottageImageList.length > 2) {
          this.image3 = cottageImageList[2];
        } 
      }
    },
    watch:{
      cottageImages(val, valOld) {
        if (this.cottageImages) {
          let cottageImageList = this.cottageImages.split(',');
          this.image1 = cottageImageList[0];
          if (cottageImageList.length > 1) {
            this.image2 = cottageImageList[1];
          } 
          if (cottageImageList.length > 2) {
            this.image3 = cottageImageList[2];
          } 
        }
      },
    },
    methods: {
    },
  };
</script>
  
<style lang="less">
  #market-card {
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
      // align-items: center;
      // justify-content: space-around;
      background-image: url(../../../../assets/herb_images/矩形@3x.png);
      background-size: 100% 100%;
      .market-content {
        height: 35%;
        padding: 20px;
        color: #A2CDFF;
      }
      .cottage-name {
        height: 32px;
        width: 146px;
        background-image: url(../../../../assets/herb_images/草堂标题.png);
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
      }
      .cottage-content {
        height: 27%;
        padding: 20px;
        color: #A2CDFF;
      }
      .cottage-images {
        height: 38%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
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
  </style>
  