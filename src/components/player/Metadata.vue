<script setup lang="ts">
import BroadcastIcon from "../icons/BroadcastIcon.vue";
import { useThemeStore } from "../../stores/theme";

const themes = useThemeStore();
</script>

<template>
  <div class="w-full">
    <div>
      <img
        :src="themes.getImage"
        alt="Music Player"
        class="w-full aspect-square rounded-lg object-cover object-center"
      />
    </div>
  </div>

  <div class="mt-2 flex items-center justify-between gap-3">
    <div class="w-full">
      <span
        :class="
          themes.getCardBackgroundTransparent ? 'text-white' : 'text-gray-500'
        "
        class="text-left text-sm font-medium"
        >{{ themes.getUser }}</span
      >
      <h1
        :class="
          themes.getCardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
        class="max-w-[320px] text-xl font-bold whitespace-normal wrap-break-word line-clamp-2 text-left"
      >
        {{ themes.getTitle }}
      </h1>
      <h1
        :class="
          themes.getCardBackgroundTransparent ? 'text-white' : 'text-gray-600'
        "
        class="text-left text-lg font-medium"
      >
        {{ themes.getArtist }}
      </h1>
    </div>

    <div class="w-fit">
      <BroadcastIcon
        :color="
          themes.getCardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
    </div>
  </div>
</template>
