<template>
  <!-- {{ $route.params.id }} -->
  <!-- <div class="typer-line text-lg md:text-3xl lg:text-5xl text-coolGray-3 anim-typewriter">你的苦，耶穌都懂；人生這段路，祂也走過 ...</div> -->
  <div class="flex">
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3 play-text">你的苦，</span>
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3 play-text">耶穌都懂；</span>
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3 play-text">人生這段路，</span>
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3 play-text">祂也走過 ...</span>
  </div>
  <PrimeButton class="mt-4 b-3 hover:bg-coolGray hover:color-white" :class="{ 'hidden': hideLeave }"
    label="耶穌曾受過的苦 " size="large" severity="secondary" outlined @click="$router.push(`/start-${route.params.id}`)"></PrimeButton>

  <!-- <button @click="sound.play()">PLAY</button> -->
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Howl } from 'howler'

const route = useRoute()
const hideLeave = ref(true)
const playCount = ref(0)

var sound = null

onMounted(() => {
  sound = new Howl({
    src: [`/assets/audio/${route.params.id}-pos.mp3`],
    volume: 0.5,
    autoplay: true,
    loop: true,
    onend: function () {
      console.log('Finished!');
      hideLeave.value = false
      playCount.value++
      if (playCount.value > 5) {
        sound!.stop()
      }
    },
  });

  setTimeout(() => {
    console.log('Time to show')
    hideLeave.value = false
  }, 20000);
})

onUnmounted(() => {
  sound!.stop()
})
</script>

<style scoped>
span.play-text {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
}

span:nth-child(1) {
  animation: fade-in 0.8s 1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(2) {
  animation: fade-in 0.8s 3s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(3) {
  animation: fade-in 0.8s 5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(4) {
  animation: fade-in 0.8s 7s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(5) {
  animation: fade-in 0.8s 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(6) {
  animation: fade-in 0.8s 0.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(7) {
  animation: fade-in 0.8s 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(8) {
  animation: fade-in 0.8s 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
