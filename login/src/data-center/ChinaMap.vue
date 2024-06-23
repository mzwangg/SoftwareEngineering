<!--

-->
<template>
  <div>
    <div ref="chinaMap" style="height: 500px; border: solid 1px blue; width: 100%; background: #010111;">
      地图1
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import chinaJSON from '../assets/china.json';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const chinaMap = ref(null);

    onMounted(() => {
      drawChina();
    });

    const regions = [
      {
        name: '新疆维吾尔自治区',
        itemStyle: {
          areaColor: '#374ba4',
          opacity: 1,
        },
      },
      {
        name: '四川省',
        itemStyle: {
          areaColor: '#fe9b45',
          opacity: 1,
        },
      },
      {
        name: '陕西省',
        itemStyle: {
          areaColor: '#fd691b',
          opacity: 1,
        },
      },
      {
        name: '黑龙江省',
        itemStyle: {
          areaColor: '#ffc556',
          opacity: 1,
        },
      },
    ];

    const scatter = [
      { name: '北京烤鸭', value: [116.46122, 39.97886, 9] },
      { name: '兰州拉面', value: [103.86615, 36.040129, 9] },
      { name: '新疆烤肉', value: [87.613228, 43.810394, 9] },
      { name: '长沙臭豆腐', value: [112.915204, 28.207735, 9] },
      { name: '西安肉夹馍', value: [108.953445, 34.288842, 9] },
      { name: '云南', value: [102.710002, 25.045806, 9] },
    ];

    const drawChina = () => {
      var myChart = echarts.init(chinaMap.value);
      echarts.registerMap('china', chinaJSON); // 注册地图
      var option = {
        geo: {
          map: 'china',
          roam: true, // 是否允许缩放，拖拽
          zoom: 1.2, // 初始化大小，稍微调大一些
          // 缩放大小限制
          scaleLimit: {
            min: 1, // 最小
            max: 5, // 最大，稍微调大一些
          },
          // 设置中心点
          center: [104.0, 35.0], // 调整中心点
          // 省份地图添加背景
          regions: regions,
          itemStyle: {
            areaColor: '#0b122e',
            borderColor: '#232652',
            borderWidth: 2,
          },
          // 高亮状态
          emphasis: {
            itemStyle: {
              areaColor: '#1af9e5',
              color: '#fff',
            },
          },
        },
        // 配置属性
        series: {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: scatter,
          showEffectOn: 'render',
          rippleEffect: {
            // 涟漪特效相关配置
            brushType: 'stroke', // 波纹的绘制方式，可选 'stroke' 和 'fill'
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: '#ffffff', // 散点的颜色
            shadowBlur: 10,
            shadowColor: 20,
          },
          emphasis: {
            itemStyle: {
              color: '#ff0000', // 高亮时的颜色
            },
            scale: true, // 使用scale替代hoverAnimation
          },
          zlevel: 1,
        },
      };
      myChart.setOption(option);
    };

    return {
      chinaMap,
    };
  }
};
</script>



