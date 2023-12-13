// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', 'nuxt-primevue', "@vueuse/nuxt", "@pinia/nuxt"],
  primevue: {
    components: {
      prefix: 'Prime',
      include: ['Button', 'Textarea', 'Dialog', 'Accordion', 'AccordionTab']
    },
    options: {
      ripple: true,
    }
  },
  css: ['primevue/resources/themes/lara-dark-blue/theme.css'],
  runtimeConfig: {
    app: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    }
  }
})