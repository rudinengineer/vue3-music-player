<script setup lang="ts">
import type { Reactive } from "vue";
import Card from "./Card.vue";
import Player from "./Player.vue";

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
}

const props = withDefaults(defineProps<playerProps>(), {});
const emits = defineEmits(["setStep"]);

const handleChange = async () => {
  if (!document.fullscreenElement) {
    emits("setStep", "player");
    await document.documentElement.requestFullscreen();
  }
};

const themes = [
  {
    name: "theme-spotify",
    preview: Player,
  },
];
</script>

<template>
  <Card :visibility="true" size="large">
    <div class="w-full">
      <h1 class="text-center text-3xl font-bold text-cute-500">
        Choose your favorite theme
      </h1>

      <div class="mt-8 flex flex-wrap justify-center items-center gap-4">
        <div v-for="theme in themes">
          <button @click="handleChange" class="cursor-pointer">
            <component
              :is="theme.preview"
              :audio="props.audio"
              :audio-metadata="props.audioMetadata"
              :autoplay="false"
            />
          </button>
        </div>
      </div>
    </div>
  </Card>
</template>
