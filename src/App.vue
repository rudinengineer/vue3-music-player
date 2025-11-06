<script setup lang="ts">
import { reactive, ref } from "vue";
import FileUpload from "./components/FileUpload.vue";
import Themes from "./components/Themes.vue";
import Player from "./components/Player.vue";
import SetupMetadata from "./components/SetupMetadata.vue";

type Step = "upload-music" | "select-theme" | "setup-metadata" | "player";

const backgroundGradientFrom = ref<string>("#ffd6e8");
const backgroundGradientTo = ref<string>("#ff70a6");
const step = ref<Step>("upload-music");
const audio = ref<HTMLAudioElement>();
const audioMetadata = reactive({
  name: "",
  size: 0,
  title: "",
  user: "",
  artist: "",
  image: "",
});

const setAudio = (source: string) => {
  audio.value = new Audio(source);

  audio.value.addEventListener("loadedmetadata", function () {
    step.value = "setup-metadata";
  });
};

const setAudioMetadata = (metadata: File) => {
  audioMetadata.name = metadata.name;
  audioMetadata.size = metadata.size;
  audioMetadata.title = metadata.name.replace(".mp3", "");
  audioMetadata.image = "/assets/upload-music.jpg";
  audioMetadata.artist = "Rudin";
  audioMetadata.user = "iPhone";
};

const setStep = (value: Step) => {
  step.value = value;
};

const setMetadata = (key: string, value: never) => {
  audioMetadata[key as keyof typeof audioMetadata] = value;
};

const setBackgoundFrom = (color: string) => {
  backgroundGradientFrom.value = color;
};
const setBackgoundTo = (color: string) => {
  backgroundGradientTo.value = color;
};
</script>

<template>
  <div
    class="w-full min-h-screen flex justify-center items-center p-4"
    :style="{
      background: `linear-gradient(135deg, ${backgroundGradientFrom} 0%, ${backgroundGradientTo} 100% )`,
    }"
  >
    <FileUpload
      v-if="step === 'upload-music'"
      v-on:set-audio="setAudio"
      v-on:set-audio-metadata="setAudioMetadata"
    />

    <Themes
      v-if="step === 'select-theme'"
      @set-step="setStep"
      :audio="audio"
      :audio-metadata="audioMetadata"
    />

    <SetupMetadata
      v-if="step === 'setup-metadata'"
      :audio-metadata="audioMetadata"
      v-on:set-step="setStep"
      v-on:set-metadata="setMetadata"
      v-on:set-background-from="setBackgoundFrom"
      v-on:set-background-to="setBackgoundTo"
    />

    <Player
      v-if="step === 'player'"
      :audio="audio"
      :audio-metadata="audioMetadata"
      :autoplay="true"
    />
  </div>
</template>

<style scoped></style>
