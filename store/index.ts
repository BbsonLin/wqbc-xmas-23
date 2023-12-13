import { defineStore } from "pinia"

export const useStore = defineStore("app", {
  state : () => ({
    message: "",
    playId: 0,
  }),
  getters: {
    getMessage(state) {
      return state.message
    },
    getPlayId(state) {
      return state.playId
    },
  },
  actions: {
    setMessage(message: string) {
      this.message = message;
    },
    setPlayId(playId: number) {
      this.playId = playId;
    },
  },
})
