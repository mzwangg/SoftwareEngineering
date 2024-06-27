<template>
  <div id="hydrometeorology" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getMoreWaterData } from '@/api/waterdata.js'; // 假设你的 API 调用函数是这样导出的

export default {
  data() {
    return {
      radarData: {
        waterTemperature: 0,
        pH: 0,
        dissolvedOxygen: 0,
        conductivity: 0,
        turbidity: 0,
        permanganateIndex: 0,
        ammoniaNitrogen: 0,
        totalPhosphorus: 0
      }
    };
  },
  async mounted() {
    await this.fetchWaterData();
    this.initEcharts();
  },
  methods: {
    async fetchWaterData() {
      try {
        const response = await getMoreWaterData(); // 调用 API 获取水质数据
        const data = response.data[0]; // 假设 API 返回的是数组，取第一个对象
        this.radarData.waterTemperature = data['水温（℃）'];
        this.radarData.pH = data['pH(无量纲)'];
        this.radarData.dissolvedOxygen = data['溶氧量(mg/L)'];
        this.radarData.conductivity = data['电导率（μS/cm）'];
        this.radarData.turbidity = data['浊度（NTU）'];
        this.radarData.permanganateIndex = data['高锰酸盐指数（mg/L）'];
        this.radarData.ammoniaNitrogen = data['氨氮（mg/L）'];
        this.radarData.totalPhosphorus = data['总磷（mg/L）'];
      } catch (error) {
        console.error('Error fetching water data:', error);
      }
    },
    initEcharts() {
      const myChart = echarts.init(document.getElementById('hydrometeorology'));

      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let indicatorName = params[0].name + '<br>';
            let indicatorValue = '';
            for (let i = 0; i < params.length; i++) {
              indicatorValue += params[i].marker + params[i].seriesName + ' : ' + params[i].value + '<br>';
            }
            return indicatorName + indicatorValue;
          }
        },
        radar: {
          indicator: [
            { name: '水温（℃）', max: 30, min: 0 },
            { name: 'pH值', max: 9, min: 6 },
            { name: '溶氧量(mg/L)', max: 14, min: 5 },
            { name: '电导率（μS/cm）', max: 500, min: 100 },
            { name: '浊度（NTU）', max: 10 },
            { name: '高锰酸盐指数（mg/L）', max: 1.2, min: 0 },
            { name: '氨氮（mg/L）', max: 0.05 },
            { name: '总磷（mg/L）', max: 0.1, min: 0 }
          ],
          shape: 'circle',
          radius: '70%',
          splitNumber: 5,
          name: {
            textStyle: {
              color: '#FFF', // 将文字颜色改成白色
              fontSize: 14,
              fontWeight: 8
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#ccc']
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(243, 243, 243, 0.5)'] // 设置雷达的背景透明
            }
          }
        },
        series: [{
          type: 'radar',
          data: [{
            value: [
              this.radarData.waterTemperature,
              this.radarData.pH,
              this.radarData.dissolvedOxygen,
              this.radarData.conductivity,
              this.radarData.turbidity,
              this.radarData.permanganateIndex,
              this.radarData.ammoniaNitrogen,
              this.radarData.totalPhosphorus
            ],
            name: '水质数据',
            label: {
              show: true,
              position: 'top', // 将标签显示在指标文字附近
              formatter: function (params) {
                return params.value;
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(255, 102, 0, 0.5)'
              }
            },
            lineStyle: {
              normal: {
                color: 'rgba(255, 102, 0, 0.8)'
              }
            }
          }]
        }]
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  }
}
</script>