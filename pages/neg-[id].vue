<template>
  <!-- {{ $route.params.id }} -->
  <div class="typer-line text-lg md:text-3xl lg:text-5xl text-coolGray-4 anim-typewriter"></div>
  <PrimeButton class="mt-4 b-3 hover:bg-coolGray hover:color-white" label="閱讀以賽亞書41:9-10 🎧" size="large"
    severity="secondary" outlined @click="onReadBible"></PrimeButton>

  <PrimeDialog v-model:visible="visible" header="以賽亞書41:9-10" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="bottom" :modal="true" :draggable="false">
    <p class="m-0 text-3xl">
      我從天涯海角把你帶來；我從遙遠的角落呼喚你。我對你說：你是我的僕人。我沒有遺棄你，我揀選了你。不要怕，我與你同在；我是你的上帝，你還怕什麼呢？我要使你堅強，要幫助你；我要保護你，要拯救你。
    </p>
    <template #footer>
      <PrimeButton label="🎧 再聽一次這個旋律 >" @click="onListenPositive" severity="secondary" size="large" outlined/>
    </template>
  </PrimeDialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Howl } from 'howler'

const route = useRoute()
const router = useRouter()

var sound = null
const visible = ref(false)
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
      if (playCount.value > 3) {
        sound!.stop()
      }
    }
  });
})

onUnmounted(() => {
  sound!.stop()
})
</script>

<style scoped></style>
