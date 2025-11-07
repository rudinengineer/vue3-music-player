<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "../../stores/theme";
import UploadIcon from "../icons/UploadIcon.vue";

const themes = useThemeStore();
const backgroundIsImage = ref<boolean>(Boolean(themes.getBackgroundImage));
const backgroundImageUrl = ref<string>();

const handleBackgroundFrom = (e: any) => {
  themes.setBackgroundGradientFrom(e.target.value);
};
const handleBackgroundTo = (e: any) => {
  themes.setBackgroundGradientTo(e.target.value);
};
const handleBackgroundIsImage = () => {
  backgroundIsImage.value = !backgroundIsImage.value;
  if (backgroundIsImage.value) {
    themes.setBackgroundImage(
      import.meta.env.BASE_URL + "/assets/background.jpg"
    );
    backgroundImageUrl.value = window.location.href + "assets/background.jpg";
  } else {
    themes.setBackgroundImage(null);
    backgroundImageUrl.value = "";
  }
};
const handleBackgroundImage = (e: any) => {
  const file = e.target.files[0];
  themes.setBackgroundImage(URL.createObjectURL(file));
  backgroundImageUrl.value = "";
};
const handleBackgroundImageUrl = (e: any) => {
  themes.setBackgroundImage(e.target.value);
};
</script>

<template>
  <div v-if="!backgroundIsImage" class="grid grid-cols-2 gap-2">
    <div>
      <input
        @input="handleBackgroundFrom"
        type="color"
        class="w-full h-12 py-1 px-4 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
      />
    </div>

    <div>
      <input
        @input="handleBackgroundTo"
        type="color"
        class="w-full h-12 py-1 px-4 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
      />
    </div>
  </div>

  <div v-if="backgroundIsImage">
    <div>
      <label for="metadata-bg" class="cursor-pointer">
        <div
          class="w-full py-2 flex justify-center items-center gap-2 rounded-md border-2 border-cute-300 transition ease-in-out duration-300 hover:border-cute-500"
        >
          <div class="size-8">
            <UploadIcon />
          </div>
          <h1 class="text-sm font-semibold text-cute-500">Upload Image</h1>
        </div>
      </label>
      <input
        @change="handleBackgroundImage"
        type="file"
        id="metadata-bg"
        accept="image/*"
        hidden
      />
    </div>

    <div class="my-1 text-center" :class="themes.getTextColor">- or -</div>

    <div>
      <input
        v-model="backgroundImageUrl"
        @change="handleBackgroundImageUrl"
        type="url"
        class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
        :class="themes.getTextColor"
        autocomplete="off"
        placeholder="Image URL"
      />
    </div>
  </div>

  <div class="mt-3 flex items-center gap-2">
    <div>
      <input
        @click="handleBackgroundIsImage"
        :checked="Boolean(themes.getBackgroundImage)"
        id="background-metadata-checkbox"
        type="checkbox"
        class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500 accent-cute-500"
      />
    </div>
    <label
      for="background-metadata-checkbox"
      :class="themes.getTextColor"
      class="text-sm"
      >Background Image</label
    >
  </div>

  <div class="mt-3 flex items-center gap-2">
    <div>
      <input
        @click="
          themes.setCardBackgroundTransparent(
            themes.getCardBackgroundTransparent ? null : 20
          )
        "
        :checked="Boolean(themes.getCardBackgroundTransparent)"
        id="card-background-transparent-metadata-checkbox"
        type="checkbox"
        class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500 accent-cute-500"
      />
    </div>
    <label
      for="card-background-transparent-metadata-checkbox"
      :class="themes.getTextColor"
      class="text-sm"
      >Card Background Transparent</label
    >
  </div>

  <div class="mt-3 flex items-center gap-2">
    <div>
      <input
        @click="themes.setCardBackgroundBlur(!themes.getCardBackgroundBlur)"
        :checked="themes.getCardBackgroundBlur"
        id="card-background-blur-metadata-checkbox"
        type="checkbox"
        class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500 accent-cute-500"
      />
    </div>
    <label
      for="card-background-blur-metadata-checkbox"
      :class="themes.getTextColor"
      class="text-sm"
      >Card Background Blur</label
    >
  </div>
</template>
