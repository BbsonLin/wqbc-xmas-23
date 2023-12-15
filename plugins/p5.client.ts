import { defineNuxtPlugin } from "#app"
// @ts-ignore
import p5vue from "p5vue"

export default defineNuxtPlugin((nuxtApp) => {
  console.log('p5.client.ts')
  nuxtApp.vueApp.use(p5vue)
})