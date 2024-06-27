<template>
  <div>
    <div ref="geoEcharts" class="geo-echart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  name: "Geo",
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initGeoEcharts();
  },
  methods: {
    initGeoEcharts() {
      axios.get('/china.json').then(res => {
        echarts.registerMap('china', res.data)
        this.$nextTick(() => {
          const map = echarts.init(this.$refs.geoEcharts, null, { renderer: 'svg' })
          const option = {
            // 悬浮窗
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (params.seriesType === 'scatter') {
                  return `${params.data.centerType} 存储容量：${params.data.value[2]} TB`;
                }
                return '';
              }
            },
            geo: {
              map: 'china',
              zoom: 0.88,
              roam: false,
              aspectScale: 0.77,
              nameMap: {
                '新疆维吾尔自治区': "新疆",
                "西藏自治区": '西藏',
                "甘肃省": "甘肃",
                "宁夏回族自治区": "宁夏",
                "广西壮族自治区": "广西",
                "内蒙古自治区": "内蒙古",
                "香港特别行政区": "香港",
                "澳门特别行政区": "澳门"
              },
              label: {
                show: false,
                color: 'black',
                position: "inside",
                distance: 0,
                fontSize: 10,
                rotate: 45
              },
              itemStyle: {
                areaColor: 'rgba(0,60,153,0.8)',
                borderColor: '#02c0ff'
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(0,60,153,0.5)',
                  shadowColor: 'rgba(0,0,0,0.8)',
                  shadowBlur: 5,
                  shadowOffsetY: 5
                }
              }
            },
            series: [
              {
                type: 'scatter',
                coordinateSystem: 'geo',
                data: [
                  // 湖北省
                  { name: 'Data-Center D', value: [111, 31.89, 800], centerType: 'Data-Center D', color: 'blue' },
                  // 四川省
                  { name: 'Data-Center C', value: [102.15, 31.89, 1000], centerType: 'Data-Center C', color: 'green' },
                  // 浙江省
                  { name: 'Data-Center A', value: [120.15, 29.89, 2000], centerType: 'Data-Center A', color: 'red' },
                  // 山东省
                  { name: 'Data-Center B', value: [118.15, 36.9, 1200], centerType: 'Data-Center B', color: 'yellow' }
                ],
                symbolSize: function (data) {
                  // 根据存储容量设置不同大小的标点
                  return 10;
                },
                itemStyle: {
                  color: function (params) {
                    return params.data.color; // 根据数据中的颜色属性设置标点颜色
                  }
                }
              }
            ]
          }
          map.setOption(option)
        })
      })
    }
  },
}
</script>

<style>
.geo-echart {
  height: 100vh;
  width: 100vw;
}
</style>
