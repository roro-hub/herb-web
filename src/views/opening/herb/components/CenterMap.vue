<template>
  <div class="contain" ref="baseVideoBox">
    <div class="map">
      <amap
        class="mapContainer"
        cache-key="myMap"
        ref="myMap"
        map-style="amap://styles/whitesmoke"
        async
        :zoom.sync="zoom"
        :pitch.sync="pitch"
        :center.sync="center"
        @complete="fitView"
        @hotspotclick="onHotspotClick"
        view-mode="3D"
        :show-label="showLabel"
      >
        <amap-polygon
          ref="polygons"
          v-for="item in polygonList"
          :key="item.index"
          clickable
          @click="
            activePolygon && activePolygon.index == item.index
              ? (activePolygon = null)
              : (activePolygon = item)
          "
          @mouseover="hoverPolygon = item"
          @mouseout="hoverPolygon = null"
          :path.sync="item.path"
          :fill-color="item.fill"
          :fill-opacity="
            item === activePolygon ? 0.9 : item === hoverPolygon ? 0.7 : 0.4
          "
          :stroke-weight="
            item === activePolygon || item === hoverPolygon ? 2 : 1
          "
        >
        </amap-polygon>
        <amap-satellite-layer :visible="satellite" :show-label="showLabel" />
        <amap-marker
          v-for="subItem in enterpriseList"
          :key="subItem.index"
          :position.sync="subItem.positionList"
        >
          <div class="marker-using-slot">{{subItem.fisheryName}}</div>
        </amap-marker>
      </amap>
    </div>
    <div class="total-statistic d-f">
      <div class="item">
        <img class="image" :src="require('../../../../assets/herb_images/产量@3x.png')"/>
        <div class="num-info">
          <div class="num">{{ yieldValue }}</div>
          <div class="unit">产量<span>(万斤)</span></div>
        </div>
      </div>
      <div class="item">
        <img class="image" :src="require('../../../../assets/herb_images/面积@3x.png')"/>
        <div class="num-info">
          <div class="num">{{ areaValue }}</div>
          <div class="unit">面积<span>(亩)</span></div>
        </div>
      </div>
      <div class="item">
        <img class="image" :src="require('../../../../assets/herb_images/产值@3x.png')"/>
        <div class="num-info">
          <div class="num">{{ outputValue }}</div>
          <div class="unit">产值<span>(万元)</span></div>
        </div>
      </div>
    </div>
    <div class="color-desc">
      <ul class="list" @mouseout="hoverPolygon = null">
        <li
          v-for="item in polygonList"
          :key="item.index"
          @mouseover="hoverPolygon = item"
          @click="
            activePolygon && activePolygon.index == item.index
              ? (activePolygon = null)
              : (activePolygon = item)
          "
        >
          <span
            :class="{ active: item === activePolygon || item === hoverPolygon }"
          >
          </span
          >{{ item.blockName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import {
//   fetchList,
//   createBlock,
//   updateBlock,
//   deleteBlock,
//   getBlockDetail,
// } from "@/api/block";
// import { getEnterpriseList, getEnterpriseDetail } from "@/api/enterprise";
// import { getLiveWeather, getForecastWeather } from "@/api/weather";
// import { getProductCategoryList, getBatchList } from "@/api/batch";
// import { getDeviceList } from "@/api/device";
// import { getInspectionList } from "@/api/inspection";
import { formatDate } from "@/utils/date";
import { mapGetters } from "vuex";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000,
  name: null,
  enterpriseId: null,
};
const defaultPolygon = {
  id: null,
  index: null,
  path: [],
  fill: "#409EFF",
  blockName: null,
  blockDescription: null,
  blockArea: null,
};

export default {
  name: "CenterMap",
  props: {
    yieldValue: {
      type: String,
      default: "0",
    },
    areaValue: {
      type: String,
      default: "0",
    },
    outputValue: {
      type: String,
      default: "0",
    },
  },
  components: {},
  data() {
    return {
      center: [119.49854, 30.627345],
      position: null,
      zoom: 17,
      pitch: 0,
      // rotation: 15,
      mapType: 1,
      isFull: false,
      satellite: true,
      hawkeye: {
        isOpen: true,
      },
      path: [],
      editable: false,
      draggable: true,
      showLabel: true,
      fill: "#409EFF",
      polygonList: [],
      listQuery: Object.assign({}, defaultListQuery),
      blockList: null,
      enterpriseList: null,
      hoverPolygon: null,
      activePolygon: null,
      cityCode: "330523",
      todayTemp: null,
      todayWeather: null,
      todayHumidity: null,
      tomorrowWeather: null,
      tomorrowDaytemp: null,
      tomorrowNighttemp: null,
      afterTomorrowWeather: null,
      afterTomorrowDaytemp: null,
      afterTomorrowNighttemp: null,
      deviceNum: 0,
      productCategoryNum: 0,
      batchNum: 0,
      todayFishNum: 0,
      todayBatchNum: 0,
      inspectionList: [],
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatInspectionTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyyMMdd");
    },
    formatProductData(content) {
      if (content.length > 50) {
        return content.substr(0, 50) + "...";
      } else {
        return content;
      }
    },
  },
  watch: {
    activePolygon(val, valOld) {
      if (val == null) {
        this.getDeviceNum(null);
        this.getProductCategoryStats(null);
        this.getTodayNum(null);
        this.getInspectionList(null);
        this.changeBlockSelected(null);
        this.fitView();
      } else {
        this.getDeviceNum(val.id);
        this.getProductCategoryStats(val.id);
        this.getTodayNum(val.id);
        this.getInspectionList(val.id);
        this.changeBlockSelected(val);
        if (val.path.length > 0) {
          this.$map.setCenter(val.path[0]);
          this.$map.setZoom(17);
        }
      }
    },
  },
  computed: {
    ...mapGetters(["enterpriseId"]),
    $map() {
      return this.$refs.myMap.$map;
    },
  },
  methods: {
    getList() {
    },
    async fitView() {
      await this.$nextTick();
      setTimeout(() => {
        this.$map.setFitView(null, false, [50, 50, 50, 50]);
        if (this.enterpriseId != -1 || this.listQuery.enterpriseId != null) {
          console.log();
          this.$map.setZoom(17);
        }
      }, 1000);
    },
    onHotspotClick(e) {
      if (e && e.lnglat) {
        this.center = [e.lnglat.lng, e.lnglat.lat];
      }
    },
    onMapClick(e) {
      if (e.lnglat) {
        this.position = [e.lnglat.lng, e.lnglat.lat];
      } else {
        this.position = null;
      }
      this.editable = true;
    },
    handleUpdateMap() {
      let url = "/#/opening/iotVisual";
      if (this.listQuery.enterpriseId) {
        url =
          "/#/opening/iotVisual?enterpriseId=" + this.listQuery.enterpriseId;
      }
      window.open(url, "_blank");
    },
    fullScreen() {
      if (this.isFull) {
        return this.exitFullScreen();
      }
      var e = this.$refs.baseVideoBox;
      e.requestFullscreen
        ? e.requestFullscreen()
        : e.webkitRequestFullScreen
        ? e.webkitRequestFullScreen()
        : e.mozRequestFullScreen
        ? e.mozRequestFullScreen()
        : e.msRequestFullscreen(),
        (this.isFull = true);
    },
    exitFullScreen() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.msExitFullscreen
        ? document.msExiFullscreen()
        : document.webkitCancelFullScreen && document.webkitCancelFullScreen(),
        (this.isFull = false);
    },
  },
};
</script>

<style scoped>
.contain {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
}
.p-32 {
  padding: 24px 24px 0px;
}
.contain .map {
  position: absolute;
  height: 100%;
  width: calc(100%);
  background-color: rgb(204, 204, 204);
}
.contain .map .mapContainer {
  width: 100%;
  height: 100%;
  background-color: rgb(226, 230, 235) !important;
  position: relative;
  background: rgb(252, 249, 242);
}
.ai-c {
  -webkit-box-align: center;
  align-items: center;
}
.d-f {
  display: flex;
}
.contain .heade {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.contain .heade .right-b {
  margin-left: auto;
  margin-top: -5px;
  position: relative;
  z-index: 999;
}
.contain .heade .right-b .right-button {
  width: 130px;
}
/* .contain .heade .right-b .right-button i{
  margin-right: 10px;
} */
.contain .info-panel {
  position: absolute;
  right: 34px;
  width: 260px;
  height: calc(100% - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 16px;
  background: rgb(255, 255, 255);
  border-radius: 4px;
}
.side-card {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: 100%;
  color: rgb(51, 51, 51);
  user-select: none;
  overflow: hidden;
}
.side-card .title {
  margin-bottom: 16px;
  font-size: 18px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
}
.side-card .air {
  margin-bottom: 20px;
}
.side-card .air .temp {
  margin-bottom: 5px;
  font-size: 16px;
}
.side-card .air .temp strong {
  font-size: 26px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
}
.side-card .air .RH {
  font-size: 14px;
  color: rgb(96, 98, 102);
}
.side-card .air .RH span {
  padding-right: 6px;
  margin-right: 6px;
  border-right: 1px solid rgb(235, 238, 245);
}
.side-card .air .future {
  margin-top: 14px;
  font-size: 14px;
}
.side-card .device-statistic {
  user-select: none;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.side-card .device-statistic .item {
  -webkit-box-flex: 1;
  padding-bottom: 15px;
  text-align: center;
  cursor: pointer;
  flex: 1 1 0%;
}
.side-card .device-statistic .item .num {
  font-size: 20px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
}
.side-card .title-second {
  font-size: 16px;
  margin: 16px 0px;
}
.side-card .device-statistic {
  user-select: none;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.side-card .device-statistic .item {
  -webkit-box-flex: 1;
  padding-bottom: 15px;
  text-align: center;
  cursor: pointer;
  flex: 1 1 0%;
}
.side-card .device-statistic .item h4 {
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  color: rgb(144, 147, 153);
}
.side-card .device-statistic .item .num {
  font-size: 20px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
}
.side-card .water-log {
  user-select: none;
}
.side-card .water-log .no-data {
  margin-top: 24px;
  text-align: center;
  color: rgb(192, 196, 204);
  font-size: 14px;
}
side-card .water-log .inspection-data {
  margin-top: 24px;
  font-size: 14px;
}
.contain .color-desc {
  position: absolute;
  left: 15px;
  bottom: 10px;
  width: 150px;
  box-sizing: border-box;
  padding: 0px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}
.contain .color-desc .list {
  margin: 0px;
  padding: 0px;
}
.contain .color-desc .list li {
  /* margin-bottom: 18px; */
  padding: 14px 12px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 12px;
  color: rgb(255, 255, 255);
}
.contain .color-desc .list li:last-child {
  margin-bottom: 0px;
}
.contain .color-desc .list li span {
  margin-right: 10px;
  width: 14px;
  height: 14px;
  background-color: rgb(226, 232, 240);
  border-radius: 50%;
}
.contain .color-desc .list li span.active {
  background-color: #409eff;
}

.contain .total-statistic {
  position: absolute;
  left: 15px;
  top: 10px;
  /* padding: 0px 18%; */
  width: 100%;
  color: #fff;
}
.contain .total-statistic .item {
  -webkit-box-flex: 1;
  padding-bottom: 15px;
  text-align: center;
  cursor: pointer;
  flex: 1 1 0%;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.contain .total-statistic .item .image {
  width: 108px;
  height: 114px;
}
.contain .total-statistic .item .num-info .num {
  font-size: 36px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 35px;
  text-shadow: 0px 0px 20px #246DFF;
  background: linear-gradient(180deg, #FFFFFF 0%, #38C0FC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
}
.contain .total-statistic .item .num-info .unit {
  /* width: 48px; */
  height: 24px;
  font-size: 24px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 36px;
}
.contain .total-statistic .item .num-info .unit span {
  margin-left: 6px;
  width: 64px;
  height: 16px;
  font-size: 16px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #A2CDFF;
  line-height: 24px;
}
.marker-using-slot {
  color: #000;
  position: absolute;
  z-index: 2;
  border: 1px solid #00f;
  background-color: #fff;
  white-space: nowrap;
  cursor: default;
  padding: 3px;
  font-size: 12px;
  line-height: 14px;
}
</style>
<style>
.amap-copyright {
  display: none !important;
}
.amap-logo {
  display: none !important;
}
.amap-ctrl-list-layer {
  display: none !important;
}
</style>