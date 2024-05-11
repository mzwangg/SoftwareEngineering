<template>
    <video id="videoPlayer" controls>
      <source src="@/ai-center/video/a.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div id="videoControls">
      <button class="videoButton" @click="changeVideo('src/ai-center/video/a.mp4')">监控一</button>
      <button class="videoButton" @click="changeVideo('src/ai-center/video/b.mp4')">监控二</button>
      <button class="videoButton" @click="changeVideo('src/ai-center/video/c.mp4')">监控三</button>
    </div>
</template>

<script>
export default {
  methods: {
    changeVideo(videoFile) {
      const videoPlayer = document.getElementById('videoPlayer');
      videoPlayer.src = videoFile;
      videoPlayer.load();
      videoPlayer.play();
    }
  }
}
</script>

<style scoped>
.videoButton {
  margin-right: 10px;
}
</style>