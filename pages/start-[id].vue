<template>
  <PrimeAccordion class="lg:mt-2 w-9/10 lg:w-3/4">
    <PrimeAccordionTab header="✉️ 打開來看看吧" :pt="{
      headerAction: ({ context }) => ({
        class: [
          'hover:bg-[#5e6843]',
          { 'rounded-br-md rounded-bl-md bg-[#748052]': !context.active, 'rounded-br-0 rounded-bl-0 bg-[#5e6843]': context.active }
        ]
      }),
      content: { class: 'bg-[#5e6843] text-coolGray-3' }
    }">
      <div class="flex flex-col items-center">
        <img class="w-full max-w-2xl" src="/assets/image/2-top.png" alt="">
        <p class="m-0 text-base md:text-xl lg:text-2xl md:text-center">
          耶穌的一生是一段艱難的旅程。<br>
          祂最初就卑微地降生在馬槽中，<span class="text-[#f2d093] font-600">面臨環境的艱困</span>，<br>
          嬰孩時期為了躲避希律王的屠殺而<span class="text-[#f2d093] font-600">逃亡</span>至埃及。<br>
          工作開始後，也面對了無數的磨難與挑戰，<br>
          受到魔鬼的三次<span class="text-[#f2d093] font-600">試探</span>、宗教領袖與人民的<span
            class="text-[#f2d093] font-600">針對和反感</span>，<br>
          以及被所愛的門徒的<span class="text-[#f2d093] font-600">否認和背叛</span>。<br>
          面對救贖的使命，祂也曾在禱告中表現出<span class="text-[#f2d093] font-600">痛苦與掙扎</span>，<br>
          但最終祂仍願意完成父神所交付給祂的旨意。<br>
          在被釘十字架的過程中，<span class="text-[#f2d093] font-600">身心靈的苦楚達到巔峰</span>，<br>
          <span class="text-[#f2d093] font-600">肉體飽受折磨</span>並與父神<span class="text-[#f2d093] font-600">完全的隔絕</span>。<br>
          最終，祂<span class="text-[#f2d093] font-600">捨命</span>在十字架上，為世人的罪<span class="text-[#f2d093] font-600">犧牲</span>。<br>
          然而，<br>
          正是藉著這樣的犧牲，耶穌完成了救贖的工作，<br>
          耶穌從死裡復活，為世人帶下永生的盼望。<br>
        </p>
        <img class="w-full max-w-xl" src="/assets/image/2-bottom.png" alt="">
      </div>
    </PrimeAccordionTab>
  </PrimeAccordion>

  <PrimeButton class="mt-4 b-3 hover:bg-[#5e6843] hover:color-white b-[#5e6843] color-[#5e6843]"
    :class="{ 'hidden': hideReading }" label="感謝你真實的分享😊" severity="secondary" outlined @click="$router.push('/')">
  </PrimeButton>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Howl } from 'howler'

const route = useRoute()
const router = useRouter()
const playCount = ref(0)
const hideReading = ref(true)

var sound = null

onMounted(() => {
  document.querySelector('html')!.style.backgroundColor = '#faf3eb'

  sound = new Howl({
    src: [`/assets/audio/${route.params.id}-pos.mp3`],
    volume: 0.5,
    autoplay: true,
    loop: true,
    onend: function () {
      console.log('Finished!');
      playCount.value++
      if (playCount.value == 3) {
        hideReading.value = false
      }
      if (playCount.value >= 10) {
        sound!.stop()
        router.push(`/`)
      }
    },
  });
})

onUnmounted(() => {
  document.querySelector('html')!.style.backgroundColor = ''
  sound!.stop()
})
</script>

<style scoped></style>
