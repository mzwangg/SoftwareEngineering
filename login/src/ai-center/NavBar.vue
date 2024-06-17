<template>
    <div class="nav-bar">
      <button v-for="date in dates" :key="date" @click="selectDate(date)">
        {{ date }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    props: {
      dates: {
        type: Array,
        required: true
      }
    },
    methods: {
      selectDate(date) {
        this.$emit('date-selected', date);
      }
    }
  };
  </script>
  
  <style scoped>
  .nav-bar {
    height: 100%;
    width: 100%;
  }

  .nav-bar button {
    height: 100%;
    width: 80px;
    margin-right: 2px;
    border: none;
    background-color: transparent;
    color: white;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s;
  }

  .nav-bar button:hover {
    background-color: #1a8bc2
  }
</style>
  