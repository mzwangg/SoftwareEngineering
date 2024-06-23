<template>
  <div class="parent-container">
    <div> </div>
    <div style="margin-top: 0px;">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="updateChart"
      />
      <div id="fishNumberChart" style="width: 100%; height: 270px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { ElDatePicker } from 'element-plus';
import { getFishNumbers } from '../api/datas.js';

export default {
  components: {
    ElDatePicker
  },
  data() {
    return {
      dateRange: [],
      fishData: [], // 保存从数据库获取的鱼群数量数据
      chart: null
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    async fetchFishData(startDate, endDate) {
      try {
        const response = await getFishNumbers(startDate, endDate);
        this.fishData = response.data;
      } catch (error) {
        console.error('Error fetching fish data:', error);
      }
    },
    initEcharts() {
      this.chart = echarts.init(document.getElementById('fishNumberChart'));
      this.updateChart();
      window.addEventListener('resize', () => {
        this.chart.resize();
      });
    },
    async updateChart() {
      if (this.dateRange.length === 2) {
        const [start, end] = this.dateRange.map(date => date.toISOString().split('T')[0]);
        await this.fetchFishData(start, end);
      }

      const dates = this.fishData.map(item => item.date);
      const values = this.fishData.map(item => item.value);

      const maxData = Math.max(...values);
      const maxYAxis = Math.ceil(maxData / 100) * 100;

      const option = {
        tooltip: {
          trigger: 'axis',
          position: pt => [pt[0], '20%']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates,
          axisLabel: {
            color: '#ffffff',
            formatter: value => {
              const date = new Date(value);
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              return `${year}-${month}-${day}`;
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          min: 0,
          max: maxYAxis,
          name: '单位：尾',
          nameLocation: 'end',
          nameGap: 30,
          nameTextStyle: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#ffffff'
          },
          axisLabel: { color: '#ffffff' }
        },
        series: [
          {
            name: 'Fish Number',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: { color: 'rgb(0, 0, 255)' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgb(0, 0, 255)' },
                { offset: 1, color: 'rgb(220, 255, 255)' }
              ])
            },
            data: values
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.parent-container {
  width: 100%;
  overflow: hidden;
}

#fishNumberChart {
  width: 100%;
  height: 300px;
}
</style>
