<script setup lang="ts">
import { useThemeStore } from "../../stores/theme";

const props = defineProps(["user", "artist", "title"]);

const themes = useThemeStore();
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <div>
      <input
        v-model="props.user"
        type="text"
        class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
        :class="themes.getTextColor"
        autocomplete="off"
        placeholder="User"
      />
    </div>

    <div>
      <input
        v-model="props.artist"
        type="text"
        class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
        :class="themes.getTextColor"
        autocomplete="off"
        placeholder="Artist"
      />
    </div>
  </div>

  <div class="mt-4">
    <input
      v-model="props.title"
      type="text"
      class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
      :class="themes.getTextColor"
      autocomplete="off"
      placeholder="Title"
    />
  </div>
</template>
