<template>
  <div id="service-card">
    <div class="card-title">
        {{ serviceTitle }}
    </div>
    <div class="card-content">
      <div class="service-item">
        <div class="service-title">{{ serviceBugerTitle }}</div>
        <div class="service-content">{{ serviceBugerContent }}</div>
        <img class="image" :src="require('../../../../assets/herb_images/承诺书@3x.png')" />
      </div>
      <div class="service-item">
        <div class="service-title">{{ serviceSellerTitle }}</div>
        <div class="service-content">{{ serviceSellerContent }}</div>
        <img class="image" :src="require('../../../../assets/herb_images/承诺书@3x.png')" />
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "ServiceCard",
    props: {
      serviceTitle: {
        type: String,
        default: "服务清单",
      },
      serviceBugerTitle: {
        type: String,
        default: "买家承诺",
      },
      serviceBugerContent: {
        type: String,
        default: "买家承诺内容",
      },
      serviceSellerTitle: {
        type: String,
        default: "卖家承诺",
      },
      serviceSellerContent: {
        type: String,
        default: "卖家承诺内容",
      },
    },
    watch: {
    },
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
    },
  };
</script>
  
<style lang="less">
  #service-card {
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
      .service-item {
        background-image: url(../../../../assets/herb_images/服务框@3x.png);
        background-size: 100% 100%;
        width: 45%;
        height: 100%;
        position: relative;
        .service-title {
          color: #A2CDFF;
          font-weight: 700;
          font-size: 22px;
          line-height: 22px;
          text-align: center;
          margin: 16px 0 22px 0;
        }
        .service-content {
          color: #A2CDFF;
          font-weight: 700;
          padding: 10px 15px;
        }
        .image {
          width: 90px;
          height: 86px;
          bottom: -24px;
          position: absolute;
          right: -30px;
        }
      }
    }
  }
  </style>
  