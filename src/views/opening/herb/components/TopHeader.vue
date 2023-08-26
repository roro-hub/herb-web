<template>
  <div id="top-header">
    <div class="time-left">
        {{todayDate}}<span class="time-left1">{{todayTime}}</span>
      </div>
  </div>
</template>

<script>
import {formatDate} from '@/utils/date';

export default {
  name: 'TopHeader',
  props: {},
  data() {
    return {
      todayDate: null,
      todayTime: null,
    };
  },
  mounted() {
    let that = this;
    this.timer = setInterval(() => {
      this.todayDate = formatDate(new Date(), 'yyyy.MM.dd');
      that.todayTime = formatDate(new Date(), 'hh:mm:ss');
    }, 1000)
  },
}
</script>

<style lang="less">
#top-header {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;

  background-image: url(../../../../assets/herb_images/导航@3x.png);
  background-size: 100% 100%;
  background-position: 0px -10px;

  .time-left {
      width: 15%;
      color: #cae2eb;
      text-align: center;
      font-weight: 700;
      font-size: 22px;
      margin-top: 14px;
      .time-left1 {
        margin-left: 12px;
      }
    }

  // .header-center-decoration {
  //   width: 40%;
  //   height: 60px;
  //   margin-top: 30px;
  // }

  // .header-left-decoration, .header-right-decoration {
  //   width: 25%;
  //   height: 60px;
  // }

  // .center-title {
  //   position: absolute;
  //   font-size: 30px;
  //   font-weight: bold;
  //   left: 50%;
  //   top: 15px;
  //   transform: translateX(-50%);
  // }
}
</style>
