<script setup lang="ts">
import { onMounted, ref } from "vue";

interface playerProps {
  audio: HTMLAudioElement | undefined;
  player: {
    play: boolean;
  };
  animationDelay: number;
}

const props = withDefaults(defineProps<playerProps>(), {});
const emits = defineEmits(["setAnimationDelay"]);

const playBar = ref<HTMLElement>();
const durationMinute = ref<number>(0);
const durationSecond = ref<number>(0);
const currentMinuteDuration = ref<number>(0);
const currentSecondDuration = ref<number>(0);

onMounted(() => {
  // Get Duration
  const totalSeconds = Math.floor(Number(props.audio?.duration));
  durationMinute.value = Math.floor(totalSeconds / 60);
  durationSecond.value = totalSeconds % 60;

  // Listen Audio Current Time
  props.audio?.addEventListener("timeupdate", function () {
    if (props.audio) {
      const totalSeconds = Math.floor(props.audio?.currentTime);
      const duration = Math.floor(props.audio.duration);
      currentMinuteDuration.value = Math.floor(totalSeconds / 60);
      currentSecondDuration.value = totalSeconds % 60;

      if (playBar.value) {
        if (
          (totalSeconds === 0 || totalSeconds >= duration) &&
          props.player.play
        ) {
          emits("setAnimationDelay", Math.floor(props.audio?.currentTime));
          playBar.value.style.animation = "none";
          void playBar.value.offsetWidth;
          playBar.value.style.animation = `musicplay ${Math.floor(
            props.audio?.duration
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
    <div class="w-full h-1 bg-cute-300"></div>
    <div
      ref="playBar"
      :style="{
        animation: `musicplay ${Math.floor(
          Number(props.audio?.duration)
        )}s linear forwards`,
        animationDelay: `-${props.animationDelay}s`,
        animationPlayState: props.player.play ? 'running' : 'paused',
      }"
      class="w-full h-1 bg-cute-500 absolute -left-full flex items-center"
    >
      <div class="w-full relative flex items-center">
        <div
          class="cursor-pointer -right-1 size-3 absolute bg-transparent duration-150 ease-in-out hover:bg-transparent rounded-full"
        ></div>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-between items-center">
    <span class="text-gray-500 text-xs font-semibold">{{
      String(currentMinuteDuration).padStart(2, "0") +
      ":" +
      String(currentSecondDuration).padStart(2, "0")
    }}</span>
    <span class="text-gray-500 text-xs font-semibold">{{
      String(durationMinute).padStart(2, "0") +
      ":" +
      String(durationSecond).padStart(2, "0")
    }}</span>
  </div>
</template>
