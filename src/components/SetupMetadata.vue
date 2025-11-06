<script setup lang="ts">
import { ref } from "vue";
import Card from "./Card.vue";
import { SanitizeMusicTitle } from "../utils/music";
import { useThemeStore } from "../stores/theme";
import { useStore } from "../stores/store";
import Image from "./setup-metadata/Image.vue";
import Background from "./setup-metadata/Background.vue";
import Metadata from "./setup-metadata/Metadata.vue";

const themes = useThemeStore();
const stores = useStore();
const title = ref<string>(SanitizeMusicTitle(themes.getTitle));
const user = ref<string>(themes.getUser);
const artist = ref<string>(themes.getArtist);

const handleClick = () => {
  stores.setStep("player");
  themes.setTitle(title.value);
  themes.setUser(user.value);
  themes.setArtist(artist.value);
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
        <Metadata :user="user" :artist="artist" :title="title" />

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
