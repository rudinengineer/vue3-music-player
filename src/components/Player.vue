<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Card from "./Card.vue";
import Volume from "./player/Volume.vue";
import Progress from "./player/Progress.vue";
import Metadata from "./player/Metadata.vue";
import Playback from "./player/Playback.vue";
import { useStore } from "../stores/store";
import { useThemeStore } from "../stores/theme";

interface playerProps {
  autoplay: boolean;
}

const props = withDefaults(defineProps<playerProps>(), {});

const stores = useStore();
const themes = useThemeStore();
const player = reactive({
  play: props.autoplay,
});
const animationDelay = ref<number>(0);

const setAnimationDelay = (delay: number) => {
  animationDelay.value = delay;
};

const setPlayerPlay = (value: boolean) => {
  player["play"] = value;
};

onMounted(async () => {
  if (props.autoplay) {
    stores.getAudio?.play();
  }

  // Listen Audio Change Time
  stores.getAudio?.addEventListener("timeupdate", function () {
    if (stores.getAudio) {
      const totalSeconds = Math.floor(stores.getAudio?.currentTime);
      const duration = Math.floor(stores.getAudio.duration);

      if (totalSeconds >= duration) {
        player.play = false;
      }
    }
  });
});
</script>

<template>
  <Card
    :theme="themes.backgroundImage ? 'glass' : 'solid'"
    :visibility="true"
    size="medium"
  >
    <div>
      <Metadata />

      <div class="mt-4">
        <Progress
          :player="player"
          :animation-delay="animationDelay"
          v-on:set-animation-delay="setAnimationDelay"
        ></Progress>
      </div>

      <div class="mt-2">
        <Playback
          :player="player"
          :animation-delay="animationDelay"
          v-on:set-animation-delay="setAnimationDelay"
          v-on:set-player-play="setPlayerPlay"
        />
      </div>

      <div class="mt-6" v-if="stores.getVolumePermission">
        <Volume />
      </div>
    </div>
  </Card>
</template>
