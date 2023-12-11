// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: false },
  modules: ['@unocss/nuxt', 'nuxt-primevue', "@vueuse/nuxt"],
  primevue: {
    components: {
      prefix: 'Prime',
      include: ['Button', 'Textarea', 'Dialog', 'Accordion', 'AccordionTab']
    },
    options: {
      ripple: true,
    }
  },
  css: ['primevue/resources/themes/lara-dark-blue/theme.css']
})