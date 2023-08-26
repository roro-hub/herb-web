<template>
  <div id="center-bottom-card">
    <div class="card-title">
        {{ serviceTitle }}
    </div>
    <div class="card-content">
      <div class="card-content-item">
        <div class="chart-title" @click="handleViewHerbPrice()">居六味价格</div>
        <div class="chart-content">
          <ul class="herb-list">
            <li class="selected">白术</li>
            <li>玄参</li>
            <li>贝母</li>
            <li>元胡</li>
            <li>覆盆子</li>
            <li>玉竹</li>
          </ul>
          <div class="echarts" ref="price-chart"></div>
        </div>
      </div>
      <div class="card-content-item">
        <div class="chart-title">居六味销量</div>
        <div class="chart-content">
          <ul class="herb-list">
            <li class="selected">白术</li>
            <li>玄参</li>
            <li>贝母</li>
            <li>元胡</li>
            <li>覆盆子</li>
            <li>玉竹</li>
          </ul>
          <div class="echarts" ref="yield-chart"></div>
        </div>
      </div>
    </div>
    <el-dialog
      class="herb-price-dialog" 
      top="5vh"
      :title="'中药价格'"
      :visible.sync="dialogVisible"
      width="80%" append-to-body>
      <div class="price-tab-group">
        <div class="price-tab">中药价格</div>
        <div class="price-tab">今日价格</div>
        <div class="price-tab">历史价格</div>
        <div class="price-tab">价格波动</div>
      </div>
      <div class="price-table-group">
        <div class="price-table-left">
          <div class="price-table"></div>
          <div class="yield-table"></div>
        </div>
        <div class="price-table-right">
          <div class="sales-table"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
  let Echarts = require("echarts/lib/echarts");
  require("echarts/lib/chart/bar"); //所需图表
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/legend");

  export default {
    name: "CenterBottom",
    props: {
      serviceTitle: {
        type: String,
        default: "中药市场数据",
      },
    },
    watch: {
    },
    data() {
      return {
        priceChart: null,
        yieldChart: null,
        dialogVisible: false,
      };
    },
    created() {
      this.getPriceEchart();
      this.getYieldEchart();
    },
    methods: {
      handleViewHerbPrice() {
        this.dialogVisible = true;
      },
      getPriceEchart() {
        let that = this;
        this.$nextTick(() => {
          let ref = that.$refs["price-chart"];
          that.priceChart = Echarts.init(ref);
          that.priceChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              x: 'center',
              y: 'bottom',
              textStyle:{
                color:'#A2CDFF' //更改坐标轴颜色
              },
              fontSize: 14
            },
            grid: {
              left: '3%',
              right: '10%',
              bottom: '10%',
              top: '1%',
              containLabel: true
            },
            textStyle:{
                color:'#A2CDFF' //更改坐标轴颜色
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              name: '元',
            },
            yAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月']
            },
            series: [
              {
                name: '统',
                type: 'bar',
                data: [182, 234, 290, 149, 131],
                label: {
                  show: true,
                  position: 'right',
                  color: '#A2CDFF',
                },
                itemStyle: {
                  barBorderRadius: [2, 2, 0, 0], //柱体圆角   
                  color: new Echarts.graphic.LinearGradient(
                      0, 0, 0, 1, [{//代表渐变色从正上方开始
                              offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                              color: '#005BEA'
                          }, //柱图渐变色
                          {
                              offset: 1, //指100%处的颜色
                              color: '#00C6FB'
                          }
                      ]
                  ),
                },
              },
              {
                name: '选',
                type: 'bar',
                data: [193, 238, 310, 194, 141],
                label: {
                  show: true,
                  position: 'right',
                  color: '#A2CDFF',
                },
                itemStyle: {
                  barBorderRadius: [2, 2, 0, 0], //柱体圆角   
                  color: new Echarts.graphic.LinearGradient(
                      0, 0, 0, 1, [{//代表渐变色从正上方开始
                              offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                              color: '#00A69C'
                          }, //柱图渐变色
                          {
                              offset: 1, //指100%处的颜色
                              color: '#00FFF0'
                          }
                      ]
                  ),
                },
              }
            ]
          });
        });
      },
      getYieldEchart() {
        let that = this;
        this.$nextTick(() => {
          let ref = that.$refs["yield-chart"];
          that.yieldChart = Echarts.init(ref);
          that.yieldChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              x: 'center',
              y: 'bottom',
              textStyle:{
                color:'#A2CDFF' //更改坐标轴颜色
              },
              fontSize: 14
            },
            grid: {
              left: '3%',
              right: '10%',
              bottom: '10%',
              top: '1%',
              containLabel: true
            },
            textStyle:{
                color:'#A2CDFF' //更改坐标轴颜色
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              name: '吨',
            },
            yAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月']
            },
            series: [
              {
                name: '销量',
                type: 'bar',
                data: [183, 489, 294, 100, 144, 630],
                label: {
                  show: true,
                  position: 'right',
                  color: '#A2CDFF',
                },
                itemStyle: {
                  barBorderRadius: [2, 2, 0, 0], //柱体圆角   
                  color: new Echarts.graphic.LinearGradient(
                      0, 0, 0, 1, [{//代表渐变色从正上方开始
                              offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                              color: '#005BEA'
                          }, //柱图渐变色
                          {
                              offset: 1, //指100%处的颜色
                              color: '#00C6FB'
                          }
                      ]
                  ),
                },
              },
            ]
          });
        });
      },
    },
  };
</script>
  
<style lang="less">
  #center-bottom-card {
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
      height: 100%;
      .card-content-item {
        width: 50%;
        height: 100%;
        .chart-title {
          height: 34px;
          width: 128px;
          background-image: url(../../../../assets/herb_images/药材.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0 10px 20px;
        }
        .chart-content {
          .herb-list {
            width: 20%;
            list-style: none;
            padding: 0;
            margin: 0;
            float: left;
            li {
              font-size: 16px;
              padding: 8px 0 8px 10px;
              margin: 0;
              color: #A2CDFF;
            }
            .selected {
              color: #28E6FF;
            }
          }
          .echarts {
            width: 80%;
            height: 220px;
            float: left;
          }
        }
      }
    }
  }
  .herb-price-dialog {
    .el-dialog {
      background: #000;
      background-image: url('../../../../assets/herb_images/中药价格弹框背景.png');
      background-size: 100% 100%;
      // height: 80%;
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__body {
      height: 600px;
      padding: 0px 20px;
      .price-tab-group {
        width: 100%;
        height: 34px;
        display: flex;
        .price-tab {
          width: 120px;
          height: 30px;
          margin: 0 10px;
          background-image: url(../../../../assets/herb_images/价格框.png);
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          color:#71BDFF;
          font-size: 10px;
        }
      }
      .price-table-group {
        width: 100%;
        height: 564px;
        display: flex;
        .price-table-left {
          width: 62%;
          height: 100%;
          padding: 10px;
          .price-table {
            height: 58%;
            border: 1px solid #108FD9;
            margin-bottom: 10px;
          }
          .yield-table {
            height: 40%;
            border: 1px solid #108FD9;
          }
        }

        .price-table-right {
          width: 38%;
          height: 100%;
          padding: 10px;
          .sales-table {
            height: 100%;
            border: 1px solid #108FD9;
          }
        }
      }

    }
  }
  </style>
  