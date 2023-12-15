<template>
  <!-- {{ $route.params.id }} -->
  <div class="typer-line text-lg md:text-3xl lg:text-5xl text-coolGray-4 anim-typewriter">{{ store.getMessage }}</div>
  <PrimeButton class="mt-4 b-3 hover:bg-coolGray hover:color-white" :class="{ 'hidden': hideReading }"
    label="但神有話要對你說......" size="large" severity="secondary" @click="onReadBible" outlined></PrimeButton>

  <PrimeDialog v-model:visible="visible" header="以賽亞書41:9-10" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="center" :modal="true" :draggable="false">
    <p class="m-0 text-3xl">
      我從天涯海角把你帶來；我從遙遠的角落呼喚你。我對你說：你是我的僕人。我沒有遺棄你，我揀選了你。不要怕，我與你同在；我是你的上帝，你還怕什麼呢？我要使你堅強，要幫助你；我要保護你，要拯救你。
    </p>
    <template #footer>
      <PrimeButton label="🎧 再聽一次這個旋律 >" @click="onListenPositive" severity="secondary" size="large" outlined />
    </template>
  </PrimeDialog>

  <P5Wrapper :sketch="sketch" class="z--10 fixed l-0 t-0" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '~/store/index'
import { Howl } from 'howler'

const route = useRoute()
const router = useRouter()
const store = useStore()

var sound = null
const visible = ref(false)
const hideReading = ref(true)
const playCount = ref(0)

const onReadBible = () => {
  visible.value = true
  // sound!.stop()
}
const onListenPositive = () => {
  router.push(`/pos-${route.params.id}`)
}

onMounted(() => {
  sound = new Howl({
    src: [`/assets/audio/${route.params.id}-neg.mp3`],
    volume: 0.2,
    loop: true,
    autoplay: true,
    onend: () => {
      console.log('Finished!', playCount.value)
      playCount.value++
      if (playCount.value == 1) {
        hideReading.value = false
      }
      if (playCount.value > 3) {
        sound!.stop()
      }
    }
  });
})

onUnmounted(() => {
  sound!.stop()
})

// Sketch
const sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(window.screen.width, window.screen.height)
  }

  p5.draw = () => {
    p5.background("#121212")

    // Testing
    // p5.textSize(10)
    // p5.fill('yellow')
    // p5.text(`${p5.mouseX}, ${p5.mouseY}`, 50, 10)

    // p5.fill(255)
    p5.textSize(100)
    p5.textStyle(p5.BOLD)

    let textLength = p5.textWidth(store.getMessage) + 10
    // let textLength = p5.textWidth("Hello") + 10
    let lineCount = 0

    for (var o = 0; o < window.screen.height; o += 60) {
      p5.push()
      lineCount++
      if (lineCount % 2 == 0) {
        p5.fill("rgb(58, 58, 58)")
        p5.translate(-50, 0)
      } else {
        p5.fill("rgba(102, 102, 102, 0.5)")
      }

      for (var i = 0; i < window.screen.width; i += textLength) {
        // console.log('i', i, 'o', o, 'textLength', textLength, 'lineCount', lineCount)
        p5.push()
        p5.translate(i, o)
        p5.text(store.getMessage, 0, 200)
        // p5.text("Hello", 0, 100)
        p5.pop()
      }

      // Debug
      // p5.push()
      // p5.translate(0, o)
      // p5.text("Hello", 0, 100)
      // p5.pop()
      // p5.push()
      // p5.translate(250, o)
      // p5.text("Hello", 0, 100)
      // p5.pop()
      p5.pop()
    }
  }
}
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
</style>
