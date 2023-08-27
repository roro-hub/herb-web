<template>
  <div id="data-view">
    <dv-full-screen-container id="dv-full-screen-container">
      <top-header :mainTitle="bigscreenDetail.configDataJson.mainTitle" />
      <div class="main-content">
        <div class="block-left-content">
          <div class="left-1">
            <market-card 
              :marketContent="bigscreenDetail.configDataJson.marketContent"
              :cottageName="bigscreenDetail.configDataJson.cottageName"
              :cottageContent="bigscreenDetail.configDataJson.cottageContent"
              :cottageImages="bigscreenDetail.configDataJson.cottageImages"
            >
            </market-card>
          </div>
          <div class="left-2">
            <manager-card></manager-card>
          </div>
          <div class="left-3">
            <service-card
              :serviceBugerContent="bigscreenDetail.configDataJson.serviceBuyer"
              :serviceSellerContent="bigscreenDetail.configDataJson.serviceSeller"
            ></service-card>
          </div>
        </div>
        <div class="block-main-content">
          <div class="main-1">
            <center-map 
              :yieldValue = "bigscreenDetail.configDataJson.yield"
              :areaValue = "bigscreenDetail.configDataJson.area"
              :outputValue = "bigscreenDetail.configDataJson.output"
              @changeBlockSelected="changeBlockSelected">
            </center-map>
          </div>
          <div class="main-2">
            <center-bottom></center-bottom>
          </div>
        </div>
        <div class="block-right-content">
          <div class="right-1">
            <base-environment-card 
              :soilName="bigscreenDetail.configDataJson.soilName"
              :soilContent="bigscreenDetail.configDataJson.soilContent"
              :soilImage="bigscreenDetail.configDataJson.soilImage"
            >
            </base-environment-card>
          </div>
          <div class="right-2">
            <base-monitor-card></base-monitor-card>
          </div>
          <div class="right-3">
            <herb-introduce-card></herb-introduce-card>
          </div>
          <div class="right-4">
            <herb-processing-card></herb-processing-card>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>
<script>

import { fetchList } from "@/api/bigscreen";
import TopHeader from "./components/TopHeader";
import CenterBottom from "./components/CenterBottom";
import CenterMap from "./components/CenterMap";
import MarketCard from "./components/MarketCard";
import ManagerCard from "./components/ManagerCard";
import ServiceCard from "./components/ServiceCard";
import BaseEnvironmentCard from "./components/BaseEnvironmentCard";
import BaseMonitorCard from "./components/BaseMonitorCard";
import HerbIntroduceCard from "./components/HerbIntroduceCard";
import HerbProcessingCard from "./components/HerbProcessingCard";

const defaultListQuery = {
  types: null
};
const TYPES = "market,soil,serve_list_buyer,serve_list_seller,cottage,yield,area,output";
export default {
  name: "bigscreenMap",
  components: {
    TopHeader,
    CenterBottom,
    CenterMap,
    MarketCard,
    ManagerCard,
    ServiceCard,
    BaseEnvironmentCard,
    BaseMonitorCard,
    HerbIntroduceCard,
    HerbProcessingCard
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      block: null,
      bigscreenDetail: {
        name: "bigscreenMap",
        configDataJson: {
          yield: "0",
          area: "0",
          output: "0",
          marketContent: null,
          cottageName: null,
          cottageContent: null,
          cottageImages: null,
          serviceBuyer: null,
          serviceSeller: null,
          soilName: null,
          soilContent: null,
          soilImage: null,
        }
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.types = TYPES;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data;
        let that = this;
        for (let i in list) {
          if (list[i].type == "market") {
            that.bigscreenDetail.configDataJson.marketContent = list[i].content;
          } else if (list[i].type == "cottage") {
            that.bigscreenDetail.configDataJson.cottageName = list[i].name;
            that.bigscreenDetail.configDataJson.cottageContent = list[i].content;
            that.bigscreenDetail.configDataJson.cottageImages = list[i].images;
            if (list[i].images) {
              that.cottageImageList = list[i].images.split(",");
            }
          } else if (list[i].type == "serve_list_buyer") {
            that.bigscreenDetail.configDataJson.serviceBuyer = list[i].content;
          } else if (list[i].type == "serve_list_seller") {
            that.bigscreenDetail.configDataJson.serviceSeller = list[i].content;
          } else if (list[i].type == "soil") {
            that.bigscreenDetail.configDataJson.soilName = list[i].name;
            that.bigscreenDetail.configDataJson.soilContent = list[i].content;
            that.bigscreenDetail.configDataJson.soilImage = list[i].images;
          } else if (list[i].type == "yield") {
            that.bigscreenDetail.configDataJson.yield = list[i].content;
          } else if (list[i].type == "area") {
            that.bigscreenDetail.configDataJson.area = list[i].content;
          } else if (list[i].type == "output") {
            that.bigscreenDetail.configDataJson.output = list[i].content;
          }
        }
      });
    },
    changeBlockSelected(block) {
      console.log(block);
      this.block = block;
    },
  },
};
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url(../../../assets/images/datav_bg1.png);
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(~"100% - 100px");
    .block-left-content {
      display: flex;
      width: 30%;
      flex-direction: column;

      .left-1 {
        height: 44%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .top-middle-cmp {
        width: 100%;
      }

      .left-2 {
        height: 22%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .left-3 {
        height: 30%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
    }

    .block-main-content {
      display: flex;
      width: 40%;
      flex-direction: column;

      .main-1 {
        height: 64%;
      }

      .main-2 {
        margin-top: 1%;
        height: 33%;
      }
    }

    .block-right-content {
      display: flex;
      width: 30%;
      flex-direction: column;
      .right-1 {
        height: 27%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .top-right-cmp {
        width: 100%;
      }

      .right-2 {
        height: 17%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .right-3 {
        height: 32%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .right-4 {
        height: 23%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
    }
  }
}
</style>
