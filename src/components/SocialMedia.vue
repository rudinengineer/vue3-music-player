<script setup lang="ts">
import { GITHUB, YOUTUBE } from "../config/social-media";
import GithubIcon from "./icons/GithubIcon.vue";
import YoutubeIcon from "./icons/YoutubeIcon.vue";
</script>

<template>
  <div class="flex items-center gap-3">
    <a :href="GITHUB" target="_blank">
      <div class="flex items-center gap-3">
        <GithubIcon />
        <span class="text-xs font-semibold">rudinengineer</span>
      </div>
    </a>

    <span>|</span>

    <a :href="YOUTUBE" target="_blank">
      <div class="flex items-center gap-3">
        <YoutubeIcon />
        <span class="text-xs font-semibold">@codingbarengrudin</span>
      </div>
    </a>
  </div>
</template>
