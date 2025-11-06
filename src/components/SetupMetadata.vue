<script setup lang="ts">
import { ref, type Reactive } from "vue";
import Card from "./Card.vue";
import UploadIcon from "./icons/UploadIcon.vue";

interface playerProps {
  audioMetadata: Reactive<{
    name: string;
    size: number;
    title: string;
    user: string;
    artist: string;
    image: string;
  }>;
}

const props = withDefaults(defineProps<playerProps>(), {});
const emits = defineEmits([
  "setStep",
  "setMetadata",
  "setBackgroundFrom",
  "setBackgroundTo",
]);

const title = ref<string>(props.audioMetadata.title.replace(".mp3", ""));
const user = ref<string>(props.audioMetadata.user);
const artist = ref<string>(props.audioMetadata.artist);

const handleClick = () => {
  emits("setStep", "player");
};

const handleUpload = (e: any) => {
  const file = e.target.files[0];
  emits("setMetadata", "title", title.value);
  emits("setMetadata", "user", user.value);
  emits("setMetadata", "artist", artist.value);
  emits("setMetadata", "image", URL.createObjectURL(file));
};

const handleBackgroundFrom = (e: any) => {
  emits("setBackgroundFrom", e.target.value);
};
const handleBackgroundTo = (e: any) => {
  emits("setBackgroundTo", e.target.value);
};
</script>

<template>
  <Card :visibility="true" size="medium">
    <div>
      <h1 class="text-2xl font-bold text-center text-cute-500">
        Setup Metadata
      </h1>

      <div class="mt-4 flex justify-center">
        <label
          for="image"
          class="relative rounded-lg overflow-hidden cursor-pointer"
        >
          <img
            :src="props.audioMetadata.image"
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

      <div class="mt-6">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <input
              v-model="user"
              type="text"
              class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
              autocomplete="off"
              placeholder="User"
            />
          </div>

          <div>
            <input
              v-model="artist"
              type="text"
              class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
              autocomplete="off"
              placeholder="Artist"
            />
          </div>
        </div>

        <div class="mt-4">
          <input
            v-model="title"
            type="text"
            class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
            autocomplete="off"
            placeholder="Title"
          />
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2">
          <div>
            <input
              @input="handleBackgroundFrom"
              type="color"
              class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
            />
          </div>

          <div>
            <input
              @input="handleBackgroundTo"
              type="color"
              class="w-full px-4 py-3 rounded-md border-2 outline-none border-cute-300 transition ease-in-out duration-300 focus:border-cute-500"
            />
          </div>
        </div>
      </div>

      <div class="mt-4">
        <button
          @click="handleClick"
          class="w-full py-3 rounded-md bg-cute-500 transition ease-in-out duration-300 hover:bg-cute-600 font-semibold text-white cursor-pointer"
        >
          Play Music
        </button>
      </div>
    </div>
  </Card>
</template>
