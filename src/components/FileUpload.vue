<script setup lang="ts">
import { ref } from "vue";
import Card from "./Card.vue";

const emits = defineEmits(["setAudio", "setAudioMetadata"]);

const visibility = ref<boolean>(true);

const handleChange = (e: any) => {
  visibility.value = !visibility.value;
  const file = e?.target?.files[0];
  emits("setAudio", URL.createObjectURL(file));
  emits("setAudioMetadata", file);
};
</script>

<template>
  <Card :visibility="visibility" size="medium">
    <div class="w-full">
      <div>
        <img
          src="/assets/anime.jpg"
          alt="Upload Music"
          class="rounded-md size-80"
        />
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
          accept=".mp3,.wav"
          @change="handleChange"
          hidden
        />
      </div>
    </div>
  </Card>
</template>
