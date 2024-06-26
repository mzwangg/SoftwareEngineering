<template>
  <div>
    <div id="temperaturePrecipitation" style="width: 70vh; height: 38vh;"></div>
    <div id="sevenDayData" style="width: 70vh; height: 40vh;"></div>
  </div>
</template>


<script>
import * as echarts from 'echarts';
import { getWeatherData, get7DaysWeatherData } from '@/api/weather';

export default {
  data() {
    return {
      weatherData: [],
      sevenDayWeatherData: []
    };
  },
  mounted() {
    this.fetchWeatherData();
    this.fetchSevenDayWeatherData();
  },
  methods: {
    async fetchWeatherData() {
      try {
        const response = await getWeatherData();
        console.log(response);
        this.weatherData = response.data;
        console.log(this.weatherData);
        this.initEcharts();
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    async fetchSevenDayWeatherData() {
    try {
        const today = new Date();
        let year = 2023;
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDate()).padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`; // 格式化为2023年的 YYYY-MM-DD

        const response = await get7DaysWeatherData(formattedDate);
        const weatherData = response.data;

        // 使用Set对象进行去重
        const uniqueWeatherData = Array.from(new Set(weatherData.map(item => item.date))).map(date => {
            return weatherData.find(item => item.date === date);
        });

        this.sevenDayWeatherData = uniqueWeatherData;
        console.log(this.sevenDayWeatherData);
        this.initSevenDayEcharts();
    } catch (error) {
        console.error("Error fetching 7 days weather data:", error);
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
      const maxPrecipitation = Math.max(...avgPrecipitations);
      let maxYValue = Math.max(maxEvaporation, maxPrecipitation);

      let mm = Math.ceil(maxYValue / 100);
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
            splitNumber: 4, // 设置分割数为4
            interval: maxYValue / 4 // 自动计算间隔
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
            splitNumber: 4, // 设置分割数为4
            interval: maxYValue / 4 // 自动计算间隔
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
    },
    initSevenDayEcharts() {
    const myChart = echarts.init(document.getElementById("sevenDayData"));
    const colors = ['#FFA500', '#91CC75', '#EE6666'];

    const dates = this.sevenDayWeatherData.map(item => {
        const dateObj = new Date(item.date);
        return `${dateObj.getMonth() + 1}-${dateObj.getDate()}`; // 只显示月和日
    });
    const evaporations = this.sevenDayWeatherData.map(item => item.evaporation);
    const precipitations = this.sevenDayWeatherData.map(item => item.precipitation);
    const temperatures = this.sevenDayWeatherData.map(item => item.temperature);

    const maxEvaporation = Math.max(...evaporations);
    const maxPrecipitation = Math.max(...precipitations);
    let maxYValue = Math.max(maxEvaporation, maxPrecipitation);

    let mm = Math.ceil(maxYValue / 20) * 20;
    console.log(mm);
    maxYValue = mm;

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
                data: dates,
                axisLabel: {
                    formatter: function (value) {
                        return value.split('-').join('/'); // 修改横坐标显示格式，以"/"分隔月和日
                    },
                    textStyle: {
                        color: '#fff' // 设置横坐标文字颜色为白色
                    },
                    interval: 0 // 确保显示所有日期
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
            splitNumber: 4, // 设置分割数为4
           interval: maxYValue / 4 
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
              splitNumber: 4, // 设置分割数为4
              interval: maxYValue / 4 
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
                data: evaporations
            },
            {
                name: '降水量',
                type: 'bar',
                yAxisIndex: 1,
                data: precipitations
            },
            {
                name: '温度',
                type: 'line',
                yAxisIndex: 2,
                data: temperatures
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
#temperaturePrecipitation, #sevenDayData {
  width: 100%;
  height: 100%;
}
</style>
