<script setup lang="ts">
import { ref } from "vue";
import Card from "./Card.vue";
import { MUSIC_EXTENSION_SUPPORT } from "../config/music";
import { useThemeStore } from "../stores/theme";
import { SanitizeMusicTitle } from "../utils/music";
import { useStore } from "../stores/store";
import SocialMedia from "./SocialMedia.vue";
import animeImg from "../assets/anime.jpg";

const themes = useThemeStore();
const stores = useStore();
const visibility = ref<boolean>(true);

const handleChange = (e: any) => {
  visibility.value = !visibility.value;
  const file = e?.target?.files[0];
  stores.setAudio(URL.createObjectURL(file));
  themes.setTitle(SanitizeMusicTitle(file.name));
  stores.setStep("setup-metadata");
};
</script>

<template>
  <div>
    <Card theme="solid" :visibility="visibility" size="medium">
      <div class="w-full">
        <div>
          <img :src="animeImg" alt="Upload Music" class="rounded-md size-80" />
        </div>

        <div class="mt-4">
          <p class="text-center font-medium">
            Upload your music and listen to relax.
          </p>
        </div>

        <div class="mt-5">
          <label for="file">
            <div
              class="w-full cursor-pointer text-center bg-cute-600 px-4 py-3 rounded-md font-semibold text-white transition duration-500 ease-in-out hover:bg-cute-700"
            >
              Choose File
            </div>
          </label>
          <input
            type="file"
            id="file"
            :accept="MUSIC_EXTENSION_SUPPORT.join(',')"
            @change="handleChange"
            hidden
          />
        </div>
      </div>
    </Card>

    <div class="animate-fade w-full mt-4 flex justify-center">
      <div>
        <SocialMedia />
      </div>
    </div>
  </div>
</template>
