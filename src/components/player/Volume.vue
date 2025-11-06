<script setup lang="ts">
import { ref } from "vue";
import Volume2Icon from "../icons/Volume2Icon.vue";
import VolumeMuteIcon from "../icons/VolumeMuteIcon.vue";
import VolumeIcon from "../icons/VolumeIcon.vue";

interface playerProps {
  audio: HTMLAudioElement | undefined;
}

const props = withDefaults(defineProps<playerProps>(), {});

const mute = ref<boolean>();
const volume = ref<number>(50);

const handleChangeVolume = (e: any) => {
  if (props.audio) {
    volume.value = e.target.value;
    props.audio.volume = volume.value / 100;
    e.target.style.setProperty("--val", volume.value + "%");
  }
};

const handleMute = () => {
  mute.value = !mute.value;
  if (props.audio) props.audio.muted = mute.value;
};

document.addEventListener("keyup", function (e) {
  if (e.code === "KeyM") {
    handleMute();
  }
});
</script>

<template>
  <div class="flex justify-between items-center gap-4">
    <button class="w-fit">
      <VolumeIcon />
    </button>

    <input
      @input="handleChangeVolume"
      type="range"
      min="0"
      max="100"
      value="50"
      class="w-full h-1 rounded-full appearance-none transition-all duration-200 [background:linear-gradient(to_right,var(--color-cute-500)_0%,var(--color-cute-500)_var(--val,50%),var(--color-cute-300)_var(--val,50%),var(--color-cute-300)_100%)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cute-500 [&::-webkit-slider-thumb]:shadow"
    />

    <!-- <div class="w-full relative flex items-center">
      <div class="w-full h-1 rounded-xl bg-cute-300"></div>
      <div class="w-1/3 h-1 rounded-xl bg-cute-500 absolute left-0"></div>
      <div class="size-4 rounded-full bg-cute-500 absolute left-1/3"></div>
    </div> -->

    <button
      @click="handleMute"
      :title="mute ? 'Unmute' : 'Mute'"
      class="w-fit cursor-pointer"
    >
      <Volume2Icon v-if="!mute" />
      <VolumeMuteIcon v-if="mute" />
    </button>
  </div>
</template>
