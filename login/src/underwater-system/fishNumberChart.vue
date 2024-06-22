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

export default {
  components: {
    ElDatePicker
  },
  data() {
    return {
      dateRange: [],
      originalData: [
        { date: '2021年06月30日', value: 599 },
        { date: '2021年07月01日', value: 551 },
        { date: '2021年07月02日', value: 745 },
        { date: '2021年07月03日', value: 761 },
        { date: '2021年07月04日', value: 550 },
        { date: '2021年07月05日', value: 684 },
        { date: '2021年07月06日', value: 575 },
        { date: '2021年07月07日', value: 708 },
        { date: '2021年07月08日', value: 780 },
        { date: '2021年07月09日', value: 551 },
        { date: '2021年07月10日', value: 735 },
        { date: '2021年07月11日', value: 581 },
        { date: '2021年07月12日', value: 714 },
        { date: '2021年07月13日', value: 704 }
      ].map(item => ({
  date: item.date.replace(/年|月/g, '-').replace('日', ''),
  value: item.value
})),
      chart: null
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      this.chart = echarts.init(document.getElementById('fishNumberChart'));
      this.updateChart();
      window.addEventListener('resize', () => {
        this.chart.resize();
      });
    },
    updateChart() {
      let filteredData = this.originalData;
      if (this.dateRange.length === 2) {
        const [start, end] = this.dateRange.map(date => {
          const d = new Date(date)
          d.setHours(0, 0, 0, 0); 
          return d;
        });
        const lastDay = new Date(end);
        lastDay.setHours(23, 59, 59, 999);

        filteredData = this.originalData.filter(item => {
          const itemDate = new Date(item.date.replace(/年|月/g, '-').replace('日', ''));
          return itemDate >= start && itemDate <= lastDay;
        });
      }

      const dates = filteredData.map(item => item.date);
      const values = filteredData.map(item => item.value);

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
