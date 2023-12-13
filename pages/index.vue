<template>
  <div class="typer-line text-lg md:text-3xl lg:text-5xl text-coolGray-4 anim-typewriter">過去的生命中，有哪句負面的話一直影響著你？</div>
  <PrimeTextarea class="mt-4 w-full md:w-2/3 b-coolGray b-3" rows="5" autoResize autofocus v-model="message">
  </PrimeTextarea>
  <PrimeButton class="mt-4 b-3 hover:bg-coolGray hover:color-white" label="戴上耳機，聆聽看看這聲音... 🎧" size="large"
    severity="secondary" :loading="loading" outlined @click="onSendMessage"></PrimeButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OpenAI from 'openai'
import { useStore } from '~/store/index'

const router = useRouter()
const store = useStore()
const config = useRuntimeConfig()
const loading = ref(false)

const message: Ref<string> = ref("")

const openai = new OpenAI({
  apiKey: config.app.openaiApiKey, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true,
  timeout: 3000
});

// const thread_id = "thread_IWi5xbswhpc2KdzekFugW8Fh"

const onSendMessage = async () => {
  store.setMessage(message.value)
  let goRandom = true
  let value = null

  try {
    loading.value = true
    const assistant = await openai.beta.assistants.retrieve(
      "asst_H6M3KqpwZJbtRBTaOa0lIiVi",
    )
    // console.log('assistant', assistant)
    const thread = await openai.beta.threads.create()

    const request = await openai.beta.threads.messages.create(thread.id, {
      role: "user", // or "assistant
      content: message.value,
    })

    // console.log('request', request)

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      instructions: "以下有11條負面的話:\n負面的話：\n1.你真的很愚蠢！為什麼連這個都不會啊？\n2.你可以不要每次都這麼情緒化嗎？\n3.你真的很令人厭煩，我不想再看到你了。\n4.你可以閉嘴嗎？真的很難跟你相處耶！\n5.你就是這麼自私，都不會替別人著想。\n6.為什麼別人都做得到，你卻都做不到？\n7.你總是認為自己是對的，有問題的都是別人。\n8.你真的很弱耶！什麼都不敢，整天就只會逃避！\n9.你真的很不知長進！像個廢物一樣。\n10.你長得好醜好噁心！看到你就覺得不舒服！\n11.你活著有什麼用？去死一死好了！\n\n相對應的標籤為:\n1. #愚蠢 #都不會\n2.#情緒化 #愛生氣 #憂鬱\n3.#厭煩 #討厭 #不想看到\n4.#囉嗦 #吵 #難相處\n5.#自私 #沒愛心 #沒同理心\n6.#能力不足 #輸家 #魯蛇\n7.#自以為 #不認錯 #怪罪別人\n8.#逃避 #不負責任 #懦弱\n9.#懶惰 #耍廢 #廢物\n10.#醜 #噁心 #沒人愛\n11.#沒有價值 #拖油瓶 #去死\n\n接下來我會傳給你一段話，請幫我判斷最接近的兩個選項，並輸出成 JSON 給我，範例 {\"data\": [6, 9]}",
    })

    console.log('run', run)

    for (let i = 0; i < 30; i++) {
      const result = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      console.log('result', result)
      if (result.status === "completed") {
        goRandom = false
        break
      }
    }

    const msgs = await openai.beta.threads.messages.list(thread.id)
    let content = msgs.data[0].content[0]

    if ("text" in content) {
      value = JSON.parse(msgs.data[0].content[0].text.value)
    }

    console.log('value', value)
    store.setPlayId(value.data[0])
  } catch (error) {
    goRandom = true
  }

  if (goRandom || value === null) {
    // Generate random id from 1 to 11
    var id = Math.floor(Math.random() * 11) + 1
    store.setPlayId(id)
  }

  router.push({ path: `/neg-${store.playId}` })
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
}
</style>
