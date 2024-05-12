<template>
  <HeaderComponent />
  <div class="mainbox">
    <ul class="clearfix nav1">
      <li style="width: 35%">
        <div class="box">
          <div class="tit">监控视频</div>
          <div class="boxnav" style="height: 320px">
            <VideoControl/>
          </div>
          <div class="box">
      <div class="tit">附加功能</div>
      <div class="boxnav" style="height: 180px">
        <DeviceControl />
      </div>
      </div>
    </div>
      
      </li>

      <li style="width: 30%">
        <div class="box">
          <div class="tit">水文气象</div>
          <div class="boxnav" style="height: 300px">
            <hydrometeorology />
          </div>
          <div class="box">
      <div class="tit">定位</div>
      <div class="boxnav" style="height: 200px;margin-left: 50px;">

        <location />
      </div>
      </div>
    </div>
      
    </li>

    <li style="width: 35%">
        <div class="box">
          <div class="tit">历史记录</div>
          <div class="boxnav" style="height: 300px">
            <temperaturePrecipitation />
          </div>
          <div class="box">
      <div class="tit">设备状态</div>
      <div class="boxnav" style="height: 200px">
        <ul class="gnlb">
              <li><span>设备ID：<em>8D45FA-24DS-123</em></span></li>
              <li><span>主控温度：<em>39.64℃</em></span></li>
              <li><span>次控状态：<em>断开</em></span></li>
            </ul>
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
import DeviceControl from '@/main-Infomation/DeviceControl.vue';
import hydrometeorology from '@/main-Infomation/hydrometeorology.vue';
import location from '../main-Infomation/location.vue';
import temperaturePrecipitation from '../main-Infomation/temperaturePrecipitation.vue';
import DeviceState from '@/main-Infomation/DeviceState.vue';

export default {
  components: {
    HeaderComponent,
    VideoControl,
    DeviceControl,
    hydrometeorology,
    location,
    temperaturePrecipitation,
    DeviceState,
  },
}
</script>