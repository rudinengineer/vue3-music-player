<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "../../stores/theme";
import { SanitizeMusicTitle } from "../../utils/music";

const themes = useThemeStore();

const title = ref<string>(SanitizeMusicTitle(themes.getTitle));
const user = ref<string>(themes.getUser);
const artist = ref<string>(themes.getArtist);

const handleChange = () => {
  themes.setTitle(title.value);
  themes.setUser(user.value);
  themes.setArtist(artist.value);
};
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <div>
      <input
        @change="handleChange"
        v-model="user"
        type="text"
        class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
        :class="themes.getTextColor"
        autocomplete="off"
        placeholder="User"
      />
    </div>

    <div>
      <input
        @change="handleChange"
        v-model="artist"
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
      @change="handleChange"
      v-model="title"
      type="text"
      class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
      :class="themes.getTextColor"
      autocomplete="off"
      placeholder="Title"
    />
  </div>
</template>
