<!-- <template>
    <div style="height: 240px; display: flex; flex-direction: column; align-items: center;">
        <div class="function">
            <label>自动投喂：</label>
            <label class="switch">
                <input type="checkbox" v-model="autoFeed">
                <span class="slider"></span>
            </label>
        </div>
        <div class="function">
            <label>水质调节：</label>
            <label class="switch">
                <input type="checkbox" v-model="waterQuality">
                <span class="slider"></span>
            </label>
        </div>
        <div class="function">
            <label>温度控制：</label>
            <label class="switch">
                <input type="checkbox" v-model="temperatureControl">
                <span class="slider"></span>
            </label>
        </div>
        <div class="function">
            <label>智能排污：</label>
            <label class="switch">
                <input type="checkbox" v-model="smartDrain">
                <span class="slider"></span>
            </label>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="button" @click="openAll">一键开启</button>
            <button class="button" @click="closeAll">一键关闭</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            autoFeed: false,
            waterQuality: false,
            temperatureControl: false,
            smartDrain: false
        };
    },
    methods: {
        openAll() {
            this.autoFeed = true;
            this.waterQuality = true;
            this.temperatureControl = true;
            this.smartDrain = true;
        },
        closeAll() {
            this.autoFeed = false;
            this.waterQuality = false;
            this.temperatureControl = false;
            this.smartDrain = false;
        }
    }
};
</script> -->

<template>
    <div class="container">
      <div class="function">
        <label>自动投喂：</label>
        <label class="switch">
          <input type="checkbox" v-model="autoFeed">
          <span class="slider"></span>
        </label>
      </div>
      <div class="function">
        <label>水质调节：</label>
        <label class="switch">
          <input type="checkbox" v-model="waterQuality">
          <span class="slider"></span>
        </label>
      </div>
      <div class="function">
        <label>温度控制：</label>
        <label class="switch">
          <input type="checkbox" v-model="temperatureControl">
          <span class="slider"></span>
        </label>
      </div>
      <div class="function">
        <label>智能排污：</label>
        <label class="switch">
          <input type="checkbox" v-model="smartDrain">
          <span class="slider"></span>
        </label>
      </div>
      <div class="buttons">
        <button class="button" @click="openAll">一键开启</button>
        <button class="button" @click="closeAll">一键关闭</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        autoFeed: false,
        waterQuality: false,
        temperatureControl: false,
        smartDrain: false
      };
    },
    methods: {
      openAll() {
        this.autoFeed = true;
        this.waterQuality = true;
        this.temperatureControl = true;
        this.smartDrain = true;
      },
      closeAll() {
        this.autoFeed = false;
        this.waterQuality = false;
        this.temperatureControl = false;
        this.smartDrain = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  
  .function {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .button {
    margin: 5px 0;
    padding: 10px 20px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #1976D2;
  }
  
  @media (min-width: 600px) {
    .container {
      height: 240px;
    }
    .buttons {
      flex-direction: row;
    }
    .button {
      margin: 0 10px;
    }
  }
  </style>
  