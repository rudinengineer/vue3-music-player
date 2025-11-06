<script setup lang="ts">
import { useStore } from "../stores/store";
import Card from "./Card.vue";
import Player from "./Player.vue";

const stores = useStore();

const handleChange = async () => {
  if (!document.fullscreenElement) {
    stores.setStep("player");
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
  <Card theme="solid" :visibility="true" size="large">
    <div class="w-full">
      <h1 class="text-center text-3xl font-bold text-cute-500">
        Choose your favorite theme
      </h1>

      <div class="mt-8 flex flex-wrap justify-center items-center gap-4">
        <div v-for="theme in themes">
          <button @click="handleChange" class="cursor-pointer">
            <component :is="theme.preview" :autoplay="false" />
          </button>
        </div>
      </div>
    </div>
  </Card>
</template>
