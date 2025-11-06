<script setup lang="ts">
import { onMounted } from "vue";
import PrevIcon from "../icons/PrevIcon.vue";
import PauseIcon from "../icons/PauseIcon.vue";
import PlayIcon from "../icons/PlayIcon.vue";
import SkipIcon from "../icons/SkipIcon.vue";
import { useThemeStore } from "../../stores/theme";
import { useStore } from "../../stores/store";

interface playerProps {
  player: {
    play: boolean;
  };
  animationDelay: number;
}

const props = withDefaults(defineProps<playerProps>(), {});
const emits = defineEmits(["setAnimationDelay", "setPlayerPlay"]);

const stores = useStore();
const themes = useThemeStore();

const handlePlay = (value: boolean) => {
  emits("setPlayerPlay", value);
  value ? stores.getAudio?.play() : stores.getAudio?.pause();
};

const handleSkip = () => {
  if (stores.getAudio) {
    if (stores.getAudio.currentTime < stores.getAudio.duration) {
      stores.getAudio.currentTime += 8;
      emits("setAnimationDelay", Math.floor(stores.getAudio?.currentTime));
    } else {
      emits("setAnimationDelay", Math.floor(stores.getAudio.duration));
    }
  }
};

const handlePrev = () => {
  if (stores.getAudio) {
    stores.getAudio.currentTime -= 8;
    emits("setAnimationDelay", Math.floor(stores.getAudio?.currentTime));
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
      <PrevIcon
        :color="
          themes.cardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
    </button>

    <button
      v-if="player.play"
      @click="handlePlay(false)"
      class="cursor-pointer"
      title="Pause"
    >
      <PauseIcon
        :color="
          themes.cardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
    </button>

    <button
      v-if="!player.play"
      @click="handlePlay(true)"
      class="cursor-pointer"
      title="Play"
    >
      <PlayIcon
        :color="
          themes.cardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
    </button>

    <button @click="handleSkip" class="cursor-pointer" title="Skip">
      <SkipIcon
        :color="
          themes.cardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
    </button>
  </div>
</template>
