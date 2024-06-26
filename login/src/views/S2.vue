<template>
  <HeaderComponent />

  <div class="mainbox">

    <ul class="nav1">
      <li style="width: 33%">
        <div class="box">
          <div class="tit">鱼群种类统计图</div>
          <div class="boxnav" style="height: 260px">
            <fishTypeChart />
          </div>
        </div>

        <div class="box">
          <div class="tit">鱼群历史数量曲线</div>
          <div class="boxnav" style="height: 260px">
            <fishNumberChart />
          </div>
        </div>
      </li>

      <li style="width: 34%">
        <div class="box">
          <div class="tit">总信息统计</div>
          <div class="boxnav" style="height: 260px;">
            <ul class="gnlb">
              <li><span>鱼种：<em>{{fishtype}}+</em></span></li>
              <li><span>鱼苗：<em>{{fishfry}}尾</em></span></li>
              <li><span>生长：<em>{{fishgrow}}尾</em></span></li>
              <li><span>镜头：<em>5+</em></span></li>
              <li><span>声呐：<em>1</em></span></li>
              <li><span>总数：<em>{{fishtotal}}尾</em></span></li>
            </ul>
          </div>
        </div>

        <div class="box">
          <div class="tit">鱼群重量分布曲线</div>
          <div class="boxnav" style="height: 260px;">
            <fishWeightChart />
          </div>
        </div>
      </li>

      <li style="width: 33%">
        <div class="box">
          <div class="tit">环境得分计算</div>
          <div class="boxnav" style="height: 260px">
            <environmentalScore />
          </div>
        </div>

        <div class="box">
          <div class="tit">网箱信息</div>

          <div class="boxnav" style="height: 260px">
            <ul class="gnlb" style=" margin:0px 0px;">
              <li><span>长度：<em>100 m</em></span></li>
              <li><span>宽度：<em>50 m</em></span></li>
              <li><span>深度：<em>20 m</em></span></li>
              <li><span>重量：<em>100 kg</em></span></li>
              <li><span>材质：<em>聚乙烯</em></span></li>
            </ul>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'; // 假设组件存放在components目录下
import fishTypeChart from '../underwater-system/fishTypeChart.vue';
import fishNumberChart from '../underwater-system/fishNumberChart.vue';
import fishWeightChart from '../underwater-system/fishWeightChart.vue';
import environmentalScore from '../underwater-system/environmentalScore.vue';
import { getspeciesnum } from '../api/fish.js';
import { getfry } from '../api/fish.js';
import { getgrow } from '../api/fish.js';
import { gettotal } from '../api/fish.js';

export default {
  components: {
    HeaderComponent,
    fishTypeChart,
    fishNumberChart,
    fishWeightChart,
    environmentalScore
  },
  data() {
    return {
      fishtype: 100,
      fishfry: 0,
      fishgrow: 0,
      fishtotal: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try{
        const response = await getspeciesnum();
        const res1 = await getfry();
        const res2 = await getgrow();
        const res3 = await gettotal();
        this.fishtype = response.data[0].speciesCount;
        this.fishfry = res1.data[0].count;
        this.fishgrow = res2.data[0].count;
        this.fishtotal = res3.data[0].count;
      } catch (error) {
          this.$message.error('无法获取鱼群数据');
          console.error("Error fetching data:", error);
      }
    }
  }
};

</script>

<style scoped>
.gnlb li {
  width: 48%;
  margin: 7px 2px;
}

.content p {
  margin: 5px 0;
  font-size: 10px;
  display: flex;
  align-items: center;
}

.content p span {
  margin-left: 5px;
}
</style>