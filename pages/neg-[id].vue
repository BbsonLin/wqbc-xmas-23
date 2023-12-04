<template>
  {{ $route.params.id }}
  <button @click="play">PLAY</button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Howl } from 'howler'

var sound = new Howl({
  src: ['/assets/audio/1-neg.mp3'],
  volume: 0.5,
});

const play = () => {
  console.log('sound', sound)

  sound.play();
}

onMounted(() => {
  play()
})
</script>

<style scoped></style>
