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
        <div class="chart-title" @click="handleViewHerbPrice()">居六味销量</div>
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
      class="herb-market-dialog" 
      top="3vh"
      :title="'中药市场'"
      :visible.sync="dialogVisible"
      width="90%" append-to-body>
      
      <div class="dialog-left">
        <div class="price-table-group">
          <div class="price-table-title">中药价格</div>
          <div class="price-tab-group">
            <div :class="tableSelected == 'todayPrice' ? 'price-tab-selected' : 'price-tab'" 
                  @click="handleChangeTable('todayPrice')">今日价格</div>
            <div :class="tableSelected == 'historyPrice' ? 'price-tab-selected' : 'price-tab'" 
                  @click="handleChangeTable('historyPrice')">历史价格</div>
            <div :class="tableSelected == 'priceRanking' ? 'price-tab-selected' : 'price-tab'" 
                  @click="handleChangeTable('priceRanking')">价格涨跌</div>
          </div>
          <div class="price-table" v-if="tableSelected == 'todayPrice'">
            <el-table
              ref="priceTable"
              :data="priceList"
              style="width: 100%"
              class="herb-price-table"
              v-loading="listLoading"
              header-row-class-name="header-bg"
              row-class-name="row-bg"
              max-height="380px"
            >
              <el-table-column label="品名" align="center" min-width="60">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="规格" align="center" min-width="60">
                <template slot-scope="scope">{{ scope.row.standard }}</template>
              </el-table-column>
              <el-table-column label="产地" align="center" min-width="60">
                <template slot-scope="scope">{{ scope.row.origin }}</template>
              </el-table-column>
              <el-table-column 
                v-for="(column_value, column_key, i) of columns" :key="column_value + i" :label="column_key" align="center"
                min-width="60">
                <template slot-scope="scope">{{ getValue(scope.row[column_value]) }}</template>
              </el-table-column>
              <el-table-column label="历史" width="60" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-data-line" style="color:#349FFF"
                     @click="handleShowHistory(scope.row)">
                  </i>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[5, 10, 20, 50]"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
          <div class="price-table" v-if="tableSelected == 'historyPrice'">
            <div class="site-list">
              <div v-for="site of siteList" :key="site"
                  :class="siteSelected == site ? 'site-tab-selected' : 'site-tab'" 
                  @click="handleChangeSite(site)">{{ site }}</div>
            </div>
            <div class="price-history-conent">
              <div class="price-history-chart">
                <div class="echarts4" ref="history-chart"></div>
              </div>
              <div class="price-history-today">
                
              </div>
            </div>
          </div>
          <div class="price-table" v-if="tableSelected == 'priceRanking'">
            <el-table
              ref="priceRankingTable"
              :data="priceRankingList"
              style="width: 100%"
              class="herb-price-table"
              v-loading="listLoading"
              header-row-class-name="header-bg"
              row-class-name="row-bg"
              max-height="380px"
            >
              <el-table-column label="品名" align="center" min-width="60">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="规格" align="center" min-width="60">
                <template slot-scope="scope">{{ scope.row.standard }}</template>
              </el-table-column>
              <el-table-column label="产地" align="center" min-width="60">
                <template slot-scope="scope">{{ scope.row.origin }}</template>
              </el-table-column>
              <el-table-column label="价格" align="center" min-width="60">
                <template slot-scope="scope">{{ scope.row.newprice }}</template>
              </el-table-column>
              <el-table-column label="周涨跌" align="center" min-width="60">
                <template slot-scope="scope">
                  <span :class="getPriceFloatClass(scope.row.wpricefloat)">
                    {{ getPriceFloatStr(scope.row.wpricefloat) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="月涨跌" align="center" min-width="60">
                <template slot-scope="scope">
                  <span :class="getPriceFloatClass(scope.row.ypricefloat)">
                    {{ getPriceFloatStr(scope.row.ypricefloat) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="季涨跌" align="center" min-width="60">
                <template slot-scope="scope">
                  <span :class="getPriceFloatClass(scope.row.jpricefloat)">
                    {{ getPriceFloatStr(scope.row.jpricefloat) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="年涨跌" align="center" min-width="60">
                <template slot-scope="scope">
                  <span :class="getPriceFloatClass(scope.row.npricefloat)">
                    {{ getPriceFloatStr(scope.row.npricefloat) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="历史" width="60" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-data-line" style="color:#349FFF"
                     @click="handleShowHistory(scope.row)">
                  </i>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[5, 10, 20, 50]"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <div class="yield-table-group">
          <div class="yield-chart-title">仙居道地药材产量</div>
          <div class="yield-chart-content">
            <ul class="herb-list">
              <li class="herb-selected">白术</li>
              <li class="herb">玄参</li>
              <li class="herb">贝母</li>
              <li class="herb">元胡</li>
              <li class="herb">覆盆子</li>
              <li class="herb">玉竹</li>
            </ul>
            <div class="echarts2" ref="yield-chart2"></div>
          </div>
        </div>

      </div>
      <div class="dialog-right">
        <div class="sales-chart-title">药材销量</div>
        <div class="sales-chart-content">
          <ul class="herb-list">
            <li class="herb-selected">白术</li>
            <li class="herb">玄参</li>
            <li class="herb">贝母</li>
            <li class="herb">元胡</li>
            <li class="herb">覆盆子</li>
            <li class="herb">玉竹</li>
          </ul>
          <div class="echarts3" ref="sales-chart"></div>
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
  import { 
    getPriceLatestList,
    getPriceRankingLatest,
    getPriceHistory,
    getPriceLatestSite,
    getPriceSite,
    getPriceRecently,
  } from "@/api/price";

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
  };

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
        yieldChart2: null,
        salesChart: null,
        historyChart: null,
        dialogVisible: false,
        columns: {
          '亳州': 'haozhou', 
          '安国': 'anguo',
          '成都': 'chengdu',
          '玉林': 'yulin',
          '廉桥': 'lianqiao',
          '普宁': 'puning'
        },
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        priceList: null,
        priceRankingList: null,
        total: null,
        tableSelected: 'todayPrice',
        nameSelected: null,
        standardSelected: null,
        originSelected: null,
        siteSelected: null,
        siteList: [],
        herbType: '居六味',
        priceRecentlyNames: [],
      };
    },
    created() {
      this.getPriceEchart();
      this.getYieldEchart();
    },
    methods: {
      handleViewHerbPrice() {
        this.dialogVisible = true;
        this.getList();
        this.getYieldEchart2();
        this.getSalesEchart();
      },
      handleChangeTable(tableSelected) {
        this.tableSelected = tableSelected;
        this.listQuery = Object.assign({}, defaultListQuery);
        this.getList();
      },
      getList() {
        if (this.tableSelected == 'todayPrice') {
          this.getPriceTodayList();
        } else if (this.tableSelected == 'historyPrice') {
          this.getHistoryPrice();
        } else if (this.tableSelected == 'priceRanking') {
          this.getPriceRankingLatest();
        } 
      },
      getPriceTodayList() {
        this.listLoading = true;
        getPriceLatestList(this.listQuery).then((response) => {
          this.listLoading = false;
          this.priceList = response.data.list;
          this.total = response.data.total;
          if (this.listQuery.pageNum == 1 && this.priceList.length > 0){
            this.nameSelected = this.priceList[0]['name'];
            this.standardSelected = this.priceList[0]['standard'];
            this.originSelected = this.priceList[0]['origin'];
            this.siteSelected = null;
            this.getPriceSite();
          }
        });
      },
      getPriceSite() {
        let siteQuery = {
          'name': this.nameSelected,
          'standard': this.standardSelected,
          'origin': this.originSelected,
        }
        getPriceSite(siteQuery).then((response) => {
          this.siteList = response.data;
          if (this.siteList.length > 0) {
            // todo 切换不同药材site没有更新，没有取第一个
            this.siteSelected = this.siteList[0];
          }
        });
      },
      handleChangeSite(site) {
        this.siteSelected = site;
        this.getHistoryPrice();
      },
      getHistoryPrice() {
        let historyQuery = {
          'name': this.nameSelected,
          'standard': this.standardSelected,
          'origin': this.originSelected,
          'site': this.siteSelected,
        }
        getPriceHistory(historyQuery).then((response) => {
          this.historyData = response.data.map;
          this.todayData = response.data.price;
          this.getHistoryChart();
        });
      },
      getPriceRankingLatest() {
        this.listLoading = true;
        getPriceRankingLatest(this.listQuery).then((response) => {
          this.listLoading = false;
          this.priceRankingList = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleShowHistory(row) {
        this.nameSelected = row['name'];
        this.standardSelected = row['standard'];
        this.originSelected = row['origin'];
        this.getPriceSite();
        setTimeout(3000);
        this.tableSelected = 'historyPrice';
        this.getHistoryPrice();
      },
      getValue(val) {
        if (val == null) {
          return '--';
        } else {
          return val
        }
      },
      getPriceFloatStr(val) {
        if (val == null) {
          return '--';
        } else {
          return val + '%';
        }
      },
      getPriceFloatClass(val) {
        if (val == null) {
          return 'price-float';
        } else {
          if (val > 0) {
            return 'price-float-red';
          } else if (val < 0){
            return 'price-float-green';
          }
        }
      },
      getPriceEchart() {
        let priceQuery = {
          'type': this.herbType,
          'month': this.month,
        }
        getPriceRecently(priceQuery).then((response) => {
          this.priceRecentlyNames = Object.keys(response.data);
          getPriceRecentlyEchart();
        });
      },
      getPriceRecentlyEchart() {
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
              splitLine: {
                lineStyle: {
                    color: '#71BDFF'
                }
              },
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
              splitLine: {
                lineStyle: {
                    color: '#71BDFF'
                }
              },
            },
            yAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月'],
            },
            series: [
              {
                name: '销量',
                type: 'bar',
                barWidth: '40%',
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
      getYieldEchart2() {
        let that = this;
        this.$nextTick(() => {
          let ref = that.$refs["yield-chart2"];
          that.yieldChart2 = Echarts.init(ref);
          that.yieldChart2.setOption({
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
              left: '0%',
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
              splitLine: {
                lineStyle: {
                    color: '#71BDFF'
                }
              },
            },
            yAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月']
            },
            series: [
              {
                name: '销量',
                type: 'bar',
                barWidth: '40%',
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
                              color: '#C78200'
                          }, //柱图渐变色
                          {
                              offset: 1, //指100%处的颜色
                              color: '#FFB915'
                          }
                      ]
                  ),
                },
              },
            ]
          });
        });
      },
      getSalesEchart() {
        let that = this;
        this.$nextTick(() => {
          let ref = that.$refs["sales-chart"];
          that.salesChart = Echarts.init(ref);
          that.salesChart.setOption({
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
              left: '0%',
              right: '10%',
              bottom: '5%',
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
              splitLine: {
                lineStyle: {
                    color: '#71BDFF'
                }
              },
            },
            yAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            series: [
              {
                name: '销量',
                type: 'bar',
                barWidth: '40%',
                data: [183, 489, 294, 100, 144, 630, 122, 234, 232, 421, 245, 398],
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
              },
            ]
          });
        });
      },
      getHistoryChart() {
        let that = this;
        this.$nextTick(() => {
          let ref = that.$refs["history-chart"];
          that.historyChart = Echarts.init(ref);
          that.historyChart.setOption({
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
              left: '0%',
              right: '10%',
              bottom: '5%',
              top: '1%',
              containLabel: true
            },
            textStyle:{
                color:'#A2CDFF' //更改坐标轴颜色
            },
            xAxis: {
              type: 'category',
              boundaryGap: [0, 0.01],
              data: Object.keys(this.historyData),
              splitLine: {
                lineStyle: {
                    color: '#71BDFF'
                }
              },
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: this.todayData.name + '价格',
                type:'line',
                smooth: true,
                areaStyle:{fill: '#f70'},
                // barWidth: '30%',
                data: Object.values(this.historyData),
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
  .herb-market-dialog {
    .el-dialog {
      background: #000;
      background-image: url('../../../../assets/herb_images/中药价格弹框背景.png');
      background-size: 100% 100%;
      // height: 80%;
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__header {
      padding: 24px 20px 6px 40px;
    }
    .el-dialog__body {
      height: 920px;
      padding: 20px;
      display: flex;

      .dialog-left {
        width: 62%;
        height: 100%;
        padding: 0 10px;
        .price-table-group {
          height: 550px;
          border: 1px solid hsl(202, 86%, 46%);
          margin-bottom: 10px;
          padding: 10px;
          .price-table-title {
            height: 34px;
            width: 78px;
            font-size: 16px;
            display: flex;
            color: #fff;
            justify-content: center;
            align-items: center;
            margin: 0px 0 4px 6px;
          }
          .price-tab-group {
            width: 100%;
            height: 34px;
            display: flex;
            margin-bottom: 10px;
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
            .price-tab-selected {
              width: 120px;
              height: 30px;
              margin: 0 10px;
              background-image: url(../../../../assets/herb_images/价格框选中.png);
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 700;
              color:#71BDFF;
              font-size: 10px;
            }
          }
          .price-table {
            height: calc(~"100% - 84px");
            border: 1px solid hsl(202, 86%, 46%);
            padding: 10px 10px 10px 10px;
            .site-list {
              width: 100%;
              height: 34px;
              display: flex;
              margin-bottom: 10px;
              .site-tab {
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
              .site-tab-selected {
                width: 120px;
                height: 30px;
                margin: 0 10px;
                background-image: url(../../../../assets/herb_images/价格框选中.png);
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 700;
                color:#71BDFF;
                font-size: 10px;
              }
            }
            .price-history-conent {
              height: calc(~"100% - 44px");
              .price-history-chart {
                width: 70%;
                height: 100%;
                .echarts4 {
                  width: calc(~"100% - 40px");
                  height: 400px;
                }
              }
              .price-history-today {
                width: 30%;
              }
            }
            .price-float-red {
              color: red;
            }
            .price-float-green {
              color: green;
            }
          }
        }
        .yield-table-group {
          height: 320px;
          border: 1px solid #108FD9;
          .yield-chart-title {
            height: 34px;
            width: 128px;
            font-size: 16px;
            display: flex;
            color: #fff;
            justify-content: center;
            align-items: center;
            margin: 10px 0 0 20px;
          }
          .yield-chart-content {
            .herb-list {
              width: 160px;
              list-style: none;
              padding: 0;
              margin: 0;
              float: left;
              .herb {
                font-size: 16px;
                color: #71BDFF;
                background-image: url(../../../../assets/herb_images/价格框.png);
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px 20px;
                height: 30px;
                width: 120px;
              }
              .herb-selected {
                font-size: 16px;
                color: #fff;
                background-image: url(../../../../assets/herb_images/价格框选中.png);
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px 20px;
                height: 30px;
                width: 120px;
              }
            }
            .echarts2 {
              width: calc(~"100% - 160px");
              height: 250px;
              float: left;
            }
          }
        }
      }

      .dialog-right {
        width: 38%;
        height: 100%;
        padding: 10px;
        border: 1px solid #108FD9;
        .sales-chart-title {
          height: 34px;
          width: 78px;
          font-size: 16px;
          display: flex;
          color: #fff;
          justify-content: center;
          align-items: center;
          margin: 10px 0 0 10px;
        }
        .sales-chart-content {
          .herb-list {
            width: 140px;
            list-style: none;
            padding: 0;
            margin: 0;
            float: left;
            .herb {
              font-size: 16px;
              color: #71BDFF;
              background-image: url(../../../../assets/herb_images/价格框.png);
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px 0px 10px 10px;
              height: 30px;
              width: 120px;
            }
            .herb-selected {
              font-size: 16px;
              color: #fff;
              background-image: url(../../../../assets/herb_images/价格框选中.png);
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px 0px 10px 10px;
              height: 30px;
              width: 120px;
            }
          }
          .echarts3 {
            width: calc(~"100% - 140px");
            height: 720px;
            float: left;
          }
        }
      }

    }
  }

  .el-table {
    display: flex;
    flex-direction: column;
  }
  .el-table__header-wrapper {
    overflow: visible !important;
  }
  .el-table th.el-table__cell {
    background-color: transparent;
    padding: 6px 0;
  }
  .el-table th.el-table__cell.is-leaf {
    border-bottom: 1px dashed #EBEEF5;
  }
  .el-table td.el-table__cell {
    color: #71BDFF;
    padding: 4px 0;
    border-bottom: 1px dashed #EBEEF5;
  }
  .header-bg {
    color: #fff;
    background-image: url('../../../../assets/herb_images/价格表格表头.png');
    background-size: 100% 100%;
  }
  .row-bg {
    color: #fff;
    background-image: url('../../../../assets/herb_images/价格表格内容.png');
    background-size: 100% 100%;
  }
  </style>
  