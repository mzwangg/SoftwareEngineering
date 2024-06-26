<template>
  <div id="temperaturePrecipitation" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getWeatherData } from '@/api/weather';

export default {
  data() {
    return {
      weatherData: []
    };
  },
  mounted() {
    this.fetchWeatherData();
  },
  methods: {
    async fetchWeatherData() {
      try {
        const response = await getWeatherData();
        console.log(response);
        this.weatherData = response.data;
        console.log(this.weatherData)
        this.initEcharts();
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    initEcharts() {
      const myChart = echarts.init(document.getElementById("temperaturePrecipitation"));
      const colors = ['#FFA500', '#91CC75', '#EE6666'];

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const avgTemps = this.weatherData.map(item => item.avg_temp);
      const avgEvaporations = this.weatherData.map(item => item.avg_evaporation);
      const avgPrecipitations = this.weatherData.map(item => item.avg_precipitation);

      const maxEvaporation = Math.max(...avgEvaporations);
      const maxPrecipitation =Math.max(...avgPrecipitations);
      let maxYValue = Math.max(maxEvaporation, maxPrecipitation);

      let mm=Math.ceil(maxYValue / 100)
      maxYValue = mm * 100;


      var option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '110px'
        },
        legend: {
          data: ['蒸发量', '降水量', '温度'],
          textStyle: {
            color: '#fff' // 设置图例文字颜色为白色
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: months,
            axisLabel: {
              textStyle: {
                color: '#fff' // 设置横坐标文字颜色为白色
              },
              interval: 0 // 确保显示所有月份
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '蒸发量',
            position: 'right',
            min: 0,
            max: maxYValue,
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}ml'
            },
            splitNumber: 4 // 设置分割数为4
          },
          {
            type: 'value',
            name: '降水量',
            position: 'right',
            min: 0,
            max: maxYValue,
            alignTicks: true,
            offset: 50,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}ml'
            },
            splitNumber: 4 // 设置分割数为4
          },
          {
            type: 'value',
            name: '温度(°C)',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: avgEvaporations
          },
          {
            name: '降水量',
            type: 'bar',
            yAxisIndex: 1,
            data: avgPrecipitations
          },
          {
            name: '温度',
            type: 'line',
            yAxisIndex: 2,
            data: avgTemps
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped>
#temperaturePrecipitation {
  width: 100%;
  height: 100%;
}
</style>