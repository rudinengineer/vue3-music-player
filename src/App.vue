<script setup lang="ts">
import FileUpload from "./components/FileUpload.vue";
import Themes from "./components/Themes.vue";
import Player from "./components/Player.vue";
import SetupMetadata from "./components/SetupMetadata.vue";
import { useThemeStore } from "./stores/theme";
import { useStore } from "./stores/store";

const themes = useThemeStore();
const stores = useStore();

// Permission
navigator.mediaDevices.getUserMedia({ audio: true }).then(async () => {
  stores.setVolumePermission(true);
});
</script>

<template>
  <div
    class="w-full min-h-screen flex justify-center items-center p-4"
    :style="{
      background: themes.getBackgroundImage
        ? `url('${themes.getBackgroundImage}')`
        : `linear-gradient(135deg, ${themes.getBackgroundGradientFrom} 0%, ${themes.getBackgroundGradientTo} 100% )`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <FileUpload v-if="stores.getStep === 'upload-music'" />

    <Themes v-if="stores.getStep === 'select-theme'" />

    <SetupMetadata v-if="stores.getStep === 'setup-metadata'" />

    <Player v-if="stores.getStep === 'player'" :autoplay="true" />
  </div>
</template>

<style scoped></style>
