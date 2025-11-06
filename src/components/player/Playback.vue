<script setup lang="ts">
import { onMounted } from "vue";
import PrevIcon from "../icons/PrevIcon.vue";
import PauseIcon from "../icons/PauseIcon.vue";
import PlayIcon from "../icons/PlayIcon.vue";
import SkipIcon from "../icons/SkipIcon.vue";

interface playerProps {
  audio: HTMLAudioElement | undefined;
  player: {
    play: boolean;
  };
  animationDelay: number;
}

const props = withDefaults(defineProps<playerProps>(), {});
const emits = defineEmits(["setAnimationDelay", "setPlayerPlay"]);

const handlePlay = (value: boolean) => {
  emits("setPlayerPlay", value);
  value ? props.audio?.play() : props.audio?.pause();
};

const handleSkip = () => {
  if (props.audio) {
    if (props.audio.currentTime < props.audio.duration) {
      props.audio.currentTime += 8;
      emits("setAnimationDelay", Math.floor(props.audio?.currentTime));
    } else {
      emits("setAnimationDelay", Math.floor(props.audio.duration));
    }
  }
};

const handlePrev = () => {
  if (props.audio) {
    props.audio.currentTime -= 8;
    emits("setAnimationDelay", Math.floor(props.audio?.currentTime));
  }
};

onMounted(() => {
  // Listen Keyboard Shortcut
  document.addEventListener("keyup", function (e) {
    if (e.code === "Space") {
      handlePlay(!props.player.play);
    }

    if (e.code === "ArrowRight") {
      handleSkip();
    }

    if (e.code === "ArrowLeft") {
      handlePrev();
    }
  });
});
</script>

<template>
  <div class="flex justify-center items-center gap-6">
    <button @click="handlePrev" class="cursor-pointer" title="Prev">
      <PrevIcon />
    </button>

    <button
      v-if="player.play"
      @click="handlePlay(false)"
      class="cursor-pointer"
      title="Pause"
    >
      <PauseIcon />
    </button>

    <button
      v-if="!player.play"
      @click="handlePlay(true)"
      class="cursor-pointer"
      title="Play"
    >
      <PlayIcon />
    </button>

    <button @click="handleSkip" class="cursor-pointer" title="Skip">
      <SkipIcon />
    </button>
  </div>
</template>
