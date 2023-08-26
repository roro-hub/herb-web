<template>
  <div id="herb-introduce-card">
    <div class="card-title">
        {{ herbIntroduceTitle }}
    </div>
    <div class="card-content">
      <div class="herb-type">
        <div class="herb-type-item-selected">
          居六味
        </div>
        <div class="herb-type-item">
          新浙八味
        </div>
        <div class="herb-type-item">
          老浙八味
        </div>
        <div class="herb-type-item">
          药膳
        </div>
      </div>
      <div class="herb">
        <div class="herb-item-selected">
          白术
        </div>
        <div class="herb-item">
          玄参
        </div>
        <div class="herb-item">
          贝母
        </div>
        <div class="herb-item">
          元胡
        </div>
        <div class="herb-item">
          覆盆子
        </div>
        <div class="herb-item">
          玉竹
        </div>
      </div>
      <div class="herb-info">
        <img class="image" :src="require('../../../../assets/herb_images/土壤.png')" />
        <div class="herb-content">功能主治：白术具有健脾益气、祛湿利水、安胎的功效，可用于治疗脾虚腹胀、食欲不振、水肿、胎动不安等病症。</div>
      </div>
    </div>
  </div>
</template>
  
<script>
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
      };
    },
    created() {
    },
    methods: {
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
  </style>
  