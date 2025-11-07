<script setup lang="ts">
import Card from "./Card.vue";
import { useThemeStore } from "../stores/theme";
import { useStore } from "../stores/store";
import Image from "./setup-metadata/Image.vue";
import Background from "./setup-metadata/Background.vue";
import Metadata from "./setup-metadata/Metadata.vue";

const themes = useThemeStore();
const stores = useStore();

const handleClick = () => {
  stores.setStep("player");
};
</script>

<template>
  <Card
    :theme="themes.getCardBackgroundTransparent ? 'glass' : 'solid'"
    :visibility="true"
    size="medium"
  >
    <div>
      <h1 class="text-2xl font-bold text-center text-cute-500">
        Setup Music Player
      </h1>

      <div class="mt-4">
        <Image />
      </div>

      <div class="mt-6">
        <Metadata />

        <div class="mt-4">
          <Background />
        </div>
      </div>

      <div class="mt-4">
        <button
          @click="handleClick"
          class="w-full py-3 rounded-md bg-cute-500 transition ease-in-out duration-300 hover:bg-cute-600 font-semibold text-white cursor-pointer"
        >
          Play Music
        </button>
      </div>
    </div>
  </Card>
</template>
