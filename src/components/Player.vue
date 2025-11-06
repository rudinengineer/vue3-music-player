<script setup lang="ts">
import { onMounted, reactive, ref, type Reactive } from "vue";
import Card from "./Card.vue";
import Volume from "./player/Volume.vue";
import Progress from "./player/Progress.vue";
import Metadata from "./player/Metadata.vue";
import Playback from "./player/Playback.vue";

interface playerProps {
  audio: HTMLAudioElement | undefined;
  audioMetadata: Reactive<{
    name: string;
    size: number;
    title: string;
    user: string;
    artist: string;
    image: string;
  }>;
  autoplay: boolean;
}

const props = withDefaults(defineProps<playerProps>(), {});

const player = reactive({
  play: props.autoplay,
});
const animationDelay = ref<number>(0);
const volumePermission = ref<boolean>(false);

const setAnimationDelay = (delay: number) => {
  animationDelay.value = delay;
};

const setPlayerPlay = (value: boolean) => {
  player["play"] = value;
};

onMounted(async () => {
  // Permission
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(async () => {
      volumePermission.value = true;
      if (props.autoplay) {
        props.audio?.play();
      }

      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    })
    .catch(async () => {
      if (props.autoplay) {
        props.audio?.play();
      }

      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    });

  props.audio?.addEventListener("volumechange", function () {
    console.log(props.audio?.volume);
  });

  // Listen Audio Change Time
  props.audio?.addEventListener("timeupdate", function () {
    if (props.audio) {
      const totalSeconds = Math.floor(props.audio?.currentTime);
      const duration = Math.floor(props.audio.duration);

      if (totalSeconds >= duration) {
        player.play = false;
      }
    }
  });
});
</script>

<template>
  <Card :visibility="true" size="medium">
    <div>
      <Metadata :audio="audio" :audio-metadata="props.audioMetadata" />

      <div class="mt-4">
        <Progress
          :audio="audio"
          :player="player"
          :animation-delay="animationDelay"
          v-on:set-animation-delay="setAnimationDelay"
        ></Progress>
      </div>

      <div class="mt-2">
        <Playback
          :audio="audio"
          :player="player"
          :animation-delay="animationDelay"
          v-on:set-animation-delay="setAnimationDelay"
          v-on:set-player-play="setPlayerPlay"
        />
      </div>

      <div class="mt-6" v-if="volumePermission">
        <Volume :audio="audio" />
      </div>
    </div>
  </Card>
</template>
