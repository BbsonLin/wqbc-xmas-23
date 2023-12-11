<template>
  <div class="typer-line text-lg md:text-3xl lg:text-5xl text-coolGray-4 anim-typewriter">過去的生命中，有哪句負面的話一直影響著你？</div>
  <PrimeTextarea class="mt-4 w-full md:w-2/3 b-coolGray b-3" rows="5" autoResize autofocus></PrimeTextarea>
  <PrimeButton class="mt-4 b-3 hover:bg-coolGray hover:color-white" label="戴上耳機，聆聽看看這聲音... 🎧" size="large"
    severity="secondary" outlined @click="onSendMessage"></PrimeButton>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onSendMessage = () => {
  // Generate random id from 1 to 11
  var id = Math.floor(Math.random() * 11) + 1
  router.push({ path: `/neg-${id}` })
}
</script>

<style scoped>
textarea {
  font-size: 24px;
}

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
}</style>
