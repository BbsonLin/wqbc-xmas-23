// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', 'nuxt-primevue', "@vueuse/nuxt"],
  primevue: {
    components: {
      prefix: 'Prime',
      include: ['Button', 'Textarea']
    }
  },
  css: ['primevue/resources/themes/lara-dark-blue/theme.css']
})