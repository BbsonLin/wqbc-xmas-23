<template>
  <!-- {{ $route.params.id }} -->
  <!-- <div class="typer-line text-lg md:text-3xl lg:text-5xl text-coolGray-3 anim-typewriter">你的苦，耶穌都懂；人生這段路，祂也走過 ...</div> -->
  <div class="flex">
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3">你的苦，</span>
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3">耶穌都懂；</span>
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3">人生這段路，</span>
    <span class="text-lg md:text-4xl lg:text-5xl text-coolGray-3">祂也走過 ...</span>
  </div>
  <PrimeAccordion class="mt-4 w-3/4">
    <PrimeAccordionTab header="✉️ 打開來看看吧">
      <p class="m-0 text-2xl">
        耶穌的一生是一段艱難的旅程。<br>
        祂最初就卑微地降生在馬槽中，面臨環境的艱困，<br>
        嬰孩時期為了躲避希律王的屠殺而逃亡至埃及。<br>
        工作開始後，也面對了無數的磨難與挑戰，<br>
        受到魔鬼的三次試探、宗教領袖與人民的針對和反感，<br>
        以及被所愛的門徒的否認和背叛。<br>
        面對救贖的使命，祂也曾在禱告中表現出痛苦與掙扎，<br>
        但最終祂仍願意完成父神所交付給祂的旨意。<br>
        在被釘十字架的過程中，身心靈的苦楚達到巔峰，<br>
        肉體飽受折磨並與父神完全的隔絕。<br>
        最終，祂捨命在十字架上，為世人的罪犧牲。<br>
        然而，<br>
        正是藉著這樣的犧牲，耶穌完成了救贖的工作，<br>
        耶穌從死裡復活，為世人帶下永生的盼望。<br>
      </p>
    </PrimeAccordionTab>
  </PrimeAccordion>

  <PrimeButton class="mt-4 b-3 hover:bg-coolGray hover:color-white" :class="{'hidden': hideLeave}" label="謝謝你、妳、祢 ... 😊" size="large"
    severity="secondary" outlined @click="$router.push('/')"></PrimeButton>

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
    onend: function() {
      console.log('Finished!');
      hideLeave.value = false
      playCount.value++
      if (playCount.value > 3) {
        sound!.stop()
      }
    },
  });
})

onUnmounted(() => {
  sound!.stop()
})
</script>

<style scoped>
/* https://css-tricks.com/snippets/css/typewriter-effect/ */
.typer-line {
  position: relative;
  border-right: 2px solid rgba(255, 255, 255, .75);
  white-space: nowrap;
  overflow: hidden;
}

.anim-typewriter {
  animation: typewriter 4s steps(50) 1s 1 normal both,
    blinkTextCursor 500ms steps(50) infinite normal;
}

@keyframes typewriter {
  from {
    width: 0;
  }

  to {
    width: 22em;
  }
}

@keyframes blinkTextCursor {
  from {
    border-right-color: rgba(255, 255, 255, .75);
  }

  to {
    border-right-color: transparent;
  }
}

span {
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

/* span:nth-child(5) {
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
} */

@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
