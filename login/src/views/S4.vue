<template>
  <HeaderComponent />

  <div class="mainbox">

    <ul class="nav1">
      <li style="width: 30%">
        <div class="box">
          <div class="tit">安全评分</div>
          <div class="boxnav" style="height: 150px; flex-direction: row;">
            <div class="leftBox"
              style="height: 60%;width: 50%;display: flex;flex-direction:column;align-items: center;justify-content: center;">
              <img src="../ai-center/img/aqdj.png" style="width: 50%" />
              <span>安全等级</span>
            </div>
            <div style="width: 50%;">
              <EchartAqpf />
            </div>
          </div>
        </div>

        <div class="box">
          <div class="tit">预警与通知</div>
          <div class="message" style="height: 80px;color: red;">水温过高!</div>
        </div>

        <div class="box">
          <div class="tit">智能控制</div>
          <div class="boxnav" style="height: 230px; display: flex; flex-direction: column; align-items: center;">
            <AiControl />
          </div>
        </div>
      </li>



      <li style="width: 40%">
        <div class="box">
          <div class="tit">监控视频</div>
          <div class="boxnav"
            style="height: 320px;display: flex; justify-content: center;align-items: center;flex-direction: column;">
            <VideoControl />
          </div>
        </div>

        <div class="box">
          <div class="tit">识别结果</div>
          <div class="boxnav" style="height: 195px;">
            <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
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
            </div>
            <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
              <div class="fish-block">
                <h3>体重</h3>
                <p>50g</p>
              </div>
              <div class="fish-block">
                <h3>患病</h3>
                <p>否</p>
              </div>
              <div class="fish-block">
                <h3>异常</h3>
                <p>是</p>
              </div>
            </div>
          </div>
        </div>
      </li>



      <li style="width: 30%">

        <div class="box">
          <div class="tit">AI决策</div>
          <div class="boxnav" style="height: 224px;">
            <ul class="gnlb">
              <li><span>温度：<em>10-20</em></span></li>
              <li><span>光照：<em>20-100</em></span></li>
              <li><span>溶解氧：<em>0.2-0.5</em></span></li>
              <li><span>PH：<em>8-8.7</em></span></li>
              <li><span>盐度：<em>0.01-0.03</em></span></li>
              <li><span>浊度：<em>2.00-2.03</em></span></li>
            </ul>
          </div>
        </div>

        <div class="box">
          <div class="tit">AI提示</div>
          <div class="message" style="height: 160px;">
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
import HeaderComponent from '../components/HeaderComponent.vue';
import VideoControl from '@/components/VideoControl.vue';
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

<style scoped>
.gnlb li {
  width: 46%;
  margin: 3% 2%;
}

.fish-block {
    width: calc(33.33% - 26.66px);
    height: 70px;
    margin: 10px;
    padding: 20px;
    background-color: #2f649f;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: inline-block;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.fish-block:hover {
    background-color: #1a8bc2
}

.fish-block h3 {
    margin-top: 0;
    font-size: 18px;
    color: #fff;
}

.fish-block p {
    margin-bottom: 0;
    font-size: 16px;
    color: #fff;
}

.weather {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 100%;
    align-items: center;
}

.wt2 {
    display: flex;
    align-items: center;
}

.wt2 p {
    font-size: 28px;
    padding-left: 10px;
    line-height: 100%;
}

.wt2 p sup {
    font-size: 14px;
}

.wt1 span {
    font-size: 12px;
}

.wt1 img {
    width: 36px;
}

.wt03 p {
    line-height: 140%;
    font-size: 14px;
}

.wt03 p span {
    display: inline-block;
    width: 70px;
    text-align: right;
    opacity: .6;
}
</style>