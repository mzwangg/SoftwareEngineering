<template>
  <HeaderComponent />

  <div class="mainbox">
    <ul class="clearfix nav1">
      <li style="width: 80%; margin-left:10%;">

        <div class="box">
          <div class="tit">数据管理</div>

          <DataList />

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HeaderComponent from '../ai-center/HeaderComponent.vue';
import DataList from '../administrater/DataList.vue';

export default {
  components: {
    HeaderComponent,
    DataList,
  },
};

</script>