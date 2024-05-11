
<template>
  <HeaderComponent />

  <div class="mainbox">

    <ul class="clearfix nav1">
      <li style="width: 25%">
        <div class="box">
          <div class="tit">安全评分</div>
          <div class="boxnav" style="height: 180px">
            <div class="pfcontent">
              <div class="leftBox" style="height: 100%;">
                <img src="../ai-center/img/aqdj.png" />
                <span>安全等级</span>
              </div>
              <EchartAqpf />
            </div>
          </div>
        </div>

        <div class="box">
          <div class="tit">预警与通知</div>
          <div class="message" style="height: 180px;color: red;">水温过高!</div>
        </div>

        <div class="box">
          <div class="tit">智能控制</div>
          <div class="boxnav" style="height: 240px; display: flex; flex-direction: column; align-items: center;">
            <AiControl />
          </div>
        </div>
      </li>



      <li style="width: 50%">
        <div class="box">
          <div class="tit">监控视频</div>
          <div class="boxnav" style="height: 440px;">
            <VideoControl />
          </div>
        </div>

        <div class="box">
          <div class="tit">识别结果</div>
          <div class="boxnav" style="height: 215px;">
            <div class="fish-block">
              <h3>编号</h3>
              <p>12345</p>
            </div>
            <div class="fish-block">
              <h3>鱼种</h3>
              <p>金鱼</p>
            </div>
            <div class="fish-block">
              <h3>体长</h3>
              <p>10cm</p>
            </div>
            <div class="fish-block">
              <h3>体重</h3>
              <p>50g</p>
            </div>
            <div class="fish-block">
              <h3>是否患病</h3>
              <p>否</p>
            </div>
            <div class="fish-block">
              <h3>是否异常</h3>
              <p>是</p>
            </div>
          </div>
        </div>
      </li>



      <li style="width: 25%">

        <div class="box">
          <div class="tit">AI决策</div>
          <div class="boxnav" style="height: 344px;">
            <ul class="gnlb">
              <li><span>温度：<em>10-20</em></span></li>
              <li><span>光照：<em>20-100</em></span></li>
              <li><span>溶解氧：<em>0.2-0.5</em></span></li>
              <li><span>PH：<em>8-8.7</em></span></li>
              <li><span>盐度：<em>0.01-0.03</em></span></li>
            </ul>
          </div>
        </div>

        <div class="box">
          <div class="tit">AI提示</div>
          <div class="message" style="height: 180px;">
            未来几天可能降雨<br>
            请确保温度、风度正常。
          </div>
        </div>

        <div class="box">
          <div class="tit">气象数据</div>
          <div class="boxnav" style="height: 76px;">
            <div class="weather">
              <div class="wt1">
                <div class="wt2"><img src="../ai-center/img/weather.png">
                  <p>29<sup>℃</sup></p>
                </div>
                <span>多云转晴</span>
              </div>
              <div class="wt03">
                <p><span>气温：</span>20 ~ 32℃</p>
                <p><span>降水量：</span>32毫米</p>
                <p><span>风况：</span>西北风微风</p>
              </div>
            </div>
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import HeaderComponent from '../ai-center/HeaderComponent.vue';
import VideoControl from '@/ai-center/VideoControl.vue';
import AiControl from '@/ai-center/AiControl.vue';
import EchartAqpf from '@/ai-center/EchartAqpf.vue';

export default {
  components: {
    HeaderComponent,
    VideoControl,
    AiControl,
    EchartAqpf,
  },
  // 其他页面的代码继续
};

</script>

<style>

</style>