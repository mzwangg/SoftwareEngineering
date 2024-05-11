<template>
  <!-- <nav>
    <router-link to="/">login</router-link> |
    <router-link to="/S1">S1</router-link>
  </nav> -->
  <router-view/>

</template>

<script setup>
import { provide } from "vue";

//引入echarts
import * as echarts from "echarts";

//通过provide提供echarts
provide("echarts", echarts);
</script>




