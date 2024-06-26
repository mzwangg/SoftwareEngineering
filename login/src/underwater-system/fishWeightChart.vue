<template>
    <div style="height: 100%;width: 100%;">
        <!-- 用于显示ECharts图表的div -->
        <div id="fishWeightChart" style="width: 100%; height: 85%;"></div>
        <!-- 添加按钮选项，用于选择不同的鱼类 -->
        <div class="button-container">
            <button class="fishButton" @click="drawChart('Bream')">Bream</button>
            <button class="fishButton" @click="drawChart('Roach')">Roach</button>
            <button class="fishButton" @click="drawChart('Whitefish')">Whitefish</button>
            <button class="fishButton" @click="drawChart('Parkki')">Parkki</button>
            <button class="fishButton" @click="drawChart('Perch')">Perch</button>
            <button class="fishButton" @click="drawChart('Pike')">Pike</button>
            <button class="fishButton" @click="drawChart('Smelt')">Smelt</button>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import generateFishWeightData from './fishWeightGenerator.js';
import { getweight } from '../api/fish.js';

export default {
    data() {
        return {
            // fishCountData: [
            //     { value: 1500, name: "金枪鱼" },
            //     { value: 1200, name: "鲈鱼" },
            //     { value: 800, name: "鳕鱼" },
            //     { value: 400, name: "鲑鱼" },
            //     { value: 300, name: "马哈鱼" }
            // ]
        };
    },
    mounted() {
        this.drawChart('Bream');
    },
    methods: {
        // drawChart(fishType) {
        //     var fishWeightData = generateFishWeightData(this.fishCountData);
        //     var selectedFishWeights = fishWeightData.find(fish => fish.name === fishType).weights;
        //     this.initEcharts(selectedFishWeights);
        // },
        async drawChart(fishType) {
            try {
                const response = await getweight(fishType);
                const weights = response.data;
                //console.log("Weights:", weights);

                const formattedData = weights.map((weightObj, index) => [index, weightObj['Weight(g)']]);
                //console.log("Formatted Data:", formattedData);
                
                this.initEcharts(formattedData);
            } catch (error) {
                this.$message.error('无法获取鱼群数据');
                console.error("Error fetching data:", error);
            }
        },
        initEcharts(selectedFishWeights) {
            var myChart = echarts.init(document.getElementById("fishWeightChart"));
            var option = {
                xAxis: {
                    type: 'value',
                    name: '样本编号',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '重量(g)',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                },
                grid: {
                    top: '20%',
                    bottom: '20%',
                    right: '18%'
                },
                series: [{
                    data: selectedFishWeights,
                    type: 'line',
                    smooth: true,
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

<style scoped>
.fishButton {
    height: 8%;
    width: 50px;
    padding: 10px 2px;
    margin-right: 10px;
    border: none;
    background-color: #2f649f;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.fishButton:hover {
    background-color: #1a8bc2
}
</style>