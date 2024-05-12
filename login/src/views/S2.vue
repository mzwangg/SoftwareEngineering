<template>
  <HeaderComponent />

  <div class="mainbox">

    <ul class="clearfix nav1">
      <li style="width: 30%">
        <div class="box">
          <div class="tit">鱼群种类统计图</div>
          <div class="boxnav" style="height: 200px">
            <fishTypeChart />
          </div>
        </div>

        <div class="box">
          <div class="tit">鱼群历史数量曲线</div>
          <div class="boxnav" style="height: 320px">
            <fishNumberChart />
          </div>
        </div>
      </li>

      <li style="width: 40%">
        <div class="box">
          <div class="tit">总信息统计</div>
          <div class="boxnav" style="height: 200px;">
            <ul class="gnlb">
              <li><span>鱼种：<em>50+</em></span></li>
              <li><span>鱼苗：<em>500尾</em></span></li>
              <li><span>生长：<em>600尾</em></span></li>
              <li><span>镜头：<em>5+</em></span></li>
              <li><span>声呐：<em>1</em></span></li>
              <li><span>已保障鱼群总数：<em>159485尾</em></span></li>
            </ul>
          </div>
        </div>

        <div class="box">
          <div class="tit">鱼的重量分布曲线</div>
          <div class="boxnav" style="height: 320px;">
            <fishWeightChart />

          </div>
        </div>
      </li>

      <li style="width: 30%">
        <div class="box">
          <div class="tit">环境得分计算</div>
          <div class="boxnav" style="height: 200px">
            <environmentalScore />
          </div>
        </div>

        <div class="box">
          <div class="tit">硬件信息</div>

          <div class="boxnav" style="height: 320px">
            <div class="box">
              <div class="tit">网箱</div>
              <div class="boxnav" style="height: 120px">
                <p>长度：100 m</p>
              <p>宽度：50 m</p>
              <p>深度：20 m</p>
              <p>材质：聚乙烯</p>
              <p>重量：100 kg</p>
              </div>
            </div>

            <div class="box">
              <div class="tit">水下传感器</div>
              <div class="boxnav" style="height: 80px">
                <p>运行时间：11天45小时14分钟</p>
              <p>位置：深 60 m处</p>
              <p>保修过期时间：2028年12月6日</p>
              </div>
            </div>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import HeaderComponent from '../ai-center/HeaderComponent.vue'; // 假设组件存放在components目录下
import fishTypeChart from '../underwater-system/fishTypeChart.vue';
import fishNumberChart from '../underwater-system/fishNumberChart.vue';
import fishWeightChart from '../underwater-system/fishWeightChart.vue';
import environmentalScore from '../underwater-system/environmentalScore.vue';

export default {
  components: {
    HeaderComponent,
    fishTypeChart,
    fishNumberChart,
    fishWeightChart,
    environmentalScore
  },
  // 其他页面的代码继续
};

</script>

<style scoped>
.gnlb li {
  width: 48%;
  margin: 7px 2px;
}

</style>