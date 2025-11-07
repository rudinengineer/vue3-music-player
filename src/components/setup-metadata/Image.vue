<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "../../stores/theme";
import animeImg from "../../assets/anime.jpg";

const themes = useThemeStore();
const imageUrl = ref<string>();

const handleUpload = (e: any) => {
  const file = e.target.files[0];
  themes.setImage(URL.createObjectURL(file));
  imageUrl.value = "";
};

const handleImageUrl = (e: any) => {
  if (e.target.value) {
    themes.setImage(e.target.value);
  } else {
    themes.setImage(animeImg);
  }
};
</script>

<template>
  <div class="flex justify-center">
    <label
      for="image"
      class="relative rounded-lg overflow-hidden cursor-pointer"
    >
      <img
        :src="themes.getImage"
        alt="Music Player"
        class="size-52 object-cover object-center"
      />
      <div
        class="size-full absolute top-0 left-0 flex justify-center items-center"
      >
        <div class="size-16">
          <UploadIcon />
        </div>
      </div>
    </label>
    <input type="file" hidden id="image" @change="handleUpload" />
  </div>

  <div class="my-1 text-center" :class="themes.getTextColor">- or -</div>

  <div>
    <input
      v-model="imageUrl"
      @change="handleImageUrl"
      type="url"
      class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
      :class="themes.getTextColor"
      autocomplete="off"
      placeholder="Image URL"
    />
  </div>
</template>
