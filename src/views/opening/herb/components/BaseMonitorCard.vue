<template>
  <div id="base-monitor-card">
    <div class="card-title">
        {{ baseMonitorTitle }}
    </div>
    <div class="card-content">
       <div class="base-monitor-images">
          <div class="image-item">
              <img class="image" :src="image1 ? image1 : require('../../../../assets/herb_images/大棚.png')" />
          </div>
          <div class="image-item">
              <img class="image" :src="image2 ? image2 : require('../../../../assets/herb_images/大棚.png')" />
          </div>
          <div class="image-item">
              <img class="image" :src="image3 ? image3 : require('../../../../assets/herb_images/大棚.png')" />
          </div>
        </div>
    </div>
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
      };
    },
    created() {
    },
    methods: {
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
  </style>
  