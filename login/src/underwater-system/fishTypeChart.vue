<template>
    <div id="fishTypeChart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getFishSpecies } from '../api/datas.js';

export default {
  data() {
    return {
      fishData: [] // 保存从数据库获取的鱼类种类和数量
    };
  },
  async mounted() {
    await this.getFishSpecies();
    this.initEcharts();
  },
  methods: {
    async getFishSpecies() {
      try {
        const response = await getFishSpecies();
        this.fishData = response.data;
      } catch (error) {
        console.error('Error fetching fish data:', error);
      }
    },
    initEcharts() 
    {
      const myChart = echarts.init(document.getElementById("fishTypeChart"));
      // 指定图表的配置项和数据
      var option = {
  // 图例
  legend: {
  orient: "vertical",
  x: "left",
  data: this.fishData.map(fish => fish.Species),
  icon: "rect",
  textStyle: {
      color: "#ffffff", // 白色
    },
  },
  // 数据与参数设置
  series: [
    {
      type: "pie",
      radius: "60%",
      left: '13%', // 将饼形图向右移动
      
      data: this.fishData.map(fish => ({
              value: fish.count,
              name: fish.Species
      })),
  // 标签设置
  label: {
        show: true,
        position: 'outside',
        formatter: '{b} ({d}%)', // {b}是数据名, {c}是数据值, {d}是百分比
        color: '#ffffff'
      },
      
      //阴影
      emphasis: {
        itemStyle: {
          shadowBlur: 100,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      // 颜色
      color: [
        "#516b91",
        "#59c4e6",
        "#edafda",
        "#93b7e3",
        "#a5e7f0",
        "#cbb0e3",
        "#c12e34",
        "#e6b600",
        "#0098d9",
        "#2b821d",
        "#005eaa",
        "#339ca8",
        "#cda819",
        "#32a487",
      ],
    },
  ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
             myChart.resize();
      });
    }
  }
}
    
</script>