<template>
  <HeaderComponent />
    <div>
        <h3>鱼群种类统计图</h3>
    </div>
    <div ref="info" style="width: 480px; height: 320px;"></div>
</template>

<script setup>
import {  onMounted, ref, inject } from "vue";

//通过inject使用echarts
const echarts = inject("echarts");

//通过ref获取html元素
const info = ref();

onMounted(() => {
    // 渲染echarts的父元素
  var infoEl = info.value;

  //  light dark
  var userEc = echarts.init(infoEl, "light");

  // 指定图表的配置项和数据
  var option = {
  // 图例
  legend: {
  orient: "vertical",
  x: "left",
  data: ["金枪鱼", "鲈鱼", "鳕鱼", "鲑鱼", "马哈鱼"],
  icon: "react",
  },
  // 数据与参数设置
  series: [
    {
      type: "pie",
      radius: "80%",
      data: [
        {
          value: 1500, // 金枪鱼数量
          name: "金枪鱼",
        },
        {
          value: 1200, // 鲈鱼数量
          name: "鲈鱼",
        },
        {
          value: 800, // 鳕鱼数量
          name: "鳕鱼",
        },
        {
          value: 400, // 鲑鱼数量
          name: "鲑鱼",
        },
        {
          value: 300, // 马哈鱼数量
          name: "马哈鱼",
        },
      ],
      //阴影
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
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
  userEc.setOption(option);
});
</script>

<script>
import HeaderComponent from '../ai-center/HeaderComponent.vue'; // 假设组件存放在components目录下

export default {
  components: {
    HeaderComponent
  },
  // 其他页面的代码继续
};
</script>