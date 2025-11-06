import { defineStore } from "pinia";

type Step = "upload-music" | "select-theme" | "setup-metadata" | "player";

type Themes = {
  step: Step;
  audio: HTMLAudioElement | null;
};

export const useStore = defineStore("store", {
  state: (): Themes => ({
    step: "upload-music",
    audio: null,
  }),
  actions: {
    setStep(step: Step) {
      this.step = step;
    },
    setAudio(source: string) {
      this.audio = new Audio(source);
    },
  },
  getters: {
    getStep: (state) => state.step,
    getAudio: (state) => state.audio,
  },
});
