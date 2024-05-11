<template>
  <HeaderComponent />

  <div class="mainbox">
    <ul class="clearfix nav1">
      <li style="width: 80%; margin-left:10%;">

        <div class="box">
          <div class="tit">用户管理</div>

          <UserList />

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HeaderComponent from '../ai-center/HeaderComponent.vue';
import UserList from '../administrater/UserList.vue';

export default {
  components: {
    HeaderComponent,
    UserList,
  },
};

</script>