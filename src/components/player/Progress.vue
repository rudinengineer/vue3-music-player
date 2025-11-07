<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useThemeStore } from "../../stores/theme";
import { useStore } from "../../stores/store";

interface playerProps {
  player: {
    play: boolean;
  };
  animationDelay: number;
}

const props = withDefaults(defineProps<playerProps>(), {});
const emits = defineEmits(["setAnimationDelay"]);

const stores = useStore();
const themes = useThemeStore();
const playBar = ref<HTMLElement>();
const durationMinute = ref<number>(0);
const durationSecond = ref<number>(0);
const currentMinuteDuration = ref<number>(0);
const currentSecondDuration = ref<number>(0);

onMounted(() => {
  // Get Duration
  const totalSeconds = Math.floor(Number(stores.getAudio?.duration));
  durationMinute.value = Math.floor(totalSeconds / 60);
  durationSecond.value = totalSeconds % 60;

  // Listen Audio Current Time
  stores.getAudio?.addEventListener("timeupdate", function () {
    if (stores.getAudio) {
      const totalSeconds = Math.floor(stores.getAudio?.currentTime);
      const duration = Math.floor(stores.getAudio.duration);
      currentMinuteDuration.value = Math.floor(totalSeconds / 60);
      currentSecondDuration.value = totalSeconds % 60;

      if (playBar.value) {
        if (
          (totalSeconds === 0 || totalSeconds >= duration) &&
          props.player.play
        ) {
          emits("setAnimationDelay", Math.floor(stores.getAudio?.currentTime));
          playBar.value.style.animation = "none";
          void playBar.value.offsetWidth;
          playBar.value.style.animation = `musicplay ${Math.floor(
            stores.getAudio?.duration
          )}s linear ${props.animationDelay} forwards`;
        }
      }
    }
  });
});
</script>

<template>
  <div
    class="w-full relative flex items-center rounded-xl overflow-x-hidden py-1"
  >
    <div
      class="w-full h-1"
      :class="themes.cardBackgroundTransparent ? 'bg-slate-100' : 'bg-cute-300'"
    ></div>
    <div
      ref="playBar"
      :style="{
        animation: `musicplay ${Math.floor(
          Number(stores.getAudio?.duration)
        )}s linear forwards`,
        animationDelay: `-${props.animationDelay}s`,
        animationPlayState: props.player.play ? 'running' : 'paused',
      }"
      class="w-full h-1 absolute -left-full flex items-center bg-cute-500"
    >
      <div class="w-full relative flex items-center">
        <div
          class="cursor-pointer -right-1 size-3 absolute bg-transparent duration-150 ease-in-out hover:bg-transparent rounded-full"
        ></div>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-between items-center">
    <span
      :class="themes.cardBackgroundTransparent ? 'text-white' : 'text-gray-500'"
      class="text-xs font-semibold"
      >{{
        String(currentMinuteDuration).padStart(2, "0") +
        ":" +
        String(currentSecondDuration).padStart(2, "0")
      }}</span
    >
    <span
      :class="themes.cardBackgroundTransparent ? 'text-white' : 'text-gray-500'"
      class="text-xs font-semibold"
      >{{
        String(durationMinute).padStart(2, "0") +
        ":" +
        String(durationSecond).padStart(2, "0")
      }}</span
    >
  </div>
</template>
