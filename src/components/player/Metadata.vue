<script setup lang="ts">
import type { Reactive } from "vue";
import BroadcastIcon from "../icons/BroadcastIcon.vue";

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
</script>

<template>
  <div class="w-full">
    <div>
      <img
        :src="props.audioMetadata.image"
        alt="Music Player"
        class="w-full aspect-square rounded-lg object-cover object-center"
      />
    </div>
  </div>

  <div class="mt-2 flex items-center justify-between gap-3">
    <div class="w-full">
      <span class="text-left text-sm font-medium text-gray-500">{{
        props.audioMetadata.user
      }}</span>
      <h1
        class="max-w-[320px] text-xl font-bold text-cute-500 whitespace-normal wrap-break-word line-clamp-2 text-left"
      >
        {{ props.audioMetadata?.title }}
      </h1>
      <h1 class="text-left text-lg font-medium text-gray-600">
        {{ props.audioMetadata.artist }}
      </h1>
    </div>

    <div class="w-fit">
      <BroadcastIcon />
    </div>
  </div>
</template>
