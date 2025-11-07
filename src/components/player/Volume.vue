<script setup lang="ts">
import { ref } from "vue";
import Volume2Icon from "../icons/Volume2Icon.vue";
import VolumeMuteIcon from "../icons/VolumeMuteIcon.vue";
import VolumeIcon from "../icons/VolumeIcon.vue";
import { useThemeStore } from "../../stores/theme";
import { useStore } from "../../stores/store";

const stores = useStore();
const themes = useThemeStore();
const mute = ref<boolean>();
const volume = ref<number>(50);

const handleChangeVolume = (e: any) => {
  if (stores.getAudio) {
    volume.value = e.target.value;
    stores.getAudio.volume = volume.value / 100;
    e.target.style.setProperty("--val", volume.value + "%");
  }
};

const handleMute = () => {
  mute.value = !mute.value;
  if (stores.getAudio) stores.getAudio.muted = mute.value;
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
      <VolumeIcon
        :color="
          themes.cardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
    </button>

    <input
      @input="handleChangeVolume"
      type="range"
      min="0"
      max="100"
      value="50"
      :class="
        themes.cardBackgroundTransparent ? 'progress-white' : 'progress-cute'
      "
      class="w-full h-1 rounded-full appearance-none transition-all duration-200"
    />

    <button
      @click="handleMute"
      :title="mute ? 'Unmute' : 'Mute'"
      class="w-fit cursor-pointer"
    >
      <Volume2Icon
        v-if="!mute"
        :color="
          themes.cardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
      <VolumeMuteIcon
        v-if="mute"
        :color="
          themes.cardBackgroundTransparent ? 'text-white' : 'text-cute-500'
        "
      />
    </button>
  </div>
</template>

<style scoped>
@reference "../../style.css";

.progress-cute {
  @apply [background:linear-gradient(to_right,var(--color-cute-500)_0%,var(--color-cute-500)_var(--val,50%),var(--color-cute-300)_var(--val,50%),var(--color-cute-300)_100%)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cute-500 [&::-webkit-slider-thumb]:shadow;
}

.progress-white {
  @apply [background:linear-gradient(to_right,#FFFFFF_0%,#FFFFFF_var(--val,50%),#D1D5DB_var(--val,50%),#D1D5DB_100%)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow;
}
</style>
