<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "../stores/theme";

type Size = "medium" | "large";
type Theme = "solid" | "glass";

interface CardProps {
  size: Size;
  theme: Theme;
  visibility: boolean;
}

const themes = useThemeStore();
const props = withDefaults(defineProps<CardProps>(), {
  size: "medium",
  visibility: true,
  theme: "solid",
});

const variants = {
  large: "min-w-2/3 min-h-[80vh] max-w-[80%]",
  medium: "max-w-[400px]",
};

const sizeStyle = computed(() => variants[props.size]);

const hexWithAlpha = (hex: string, percent: number) => {
  if (hex.length === 4) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  const opacity = Math.max(0, Math.min(100, percent)) / 100;
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return hex + alpha;
};
</script>

<template>
  <div
    :class="`${
      props.visibility ? 'animate-fade' : 'animate-fade-down'
    } ${sizeStyle} ${
      props.theme.toString() === 'glass' && themes.getCardBackgroundBlur
        ? 'backdrop-blur-sm'
        : ''
    }`"
    :style="{
      background: hexWithAlpha(
        themes.getCardBackgroundColor,
        props.theme.toString() === 'glass' &&
          themes.getCardBackgroundTransparent
          ? themes.getCardBackgroundTransparent
          : 100
      ),
    }"
    class="border border-[#ffe5ec] shadow-[0_2px_8px_rgba(255,183,206,0.25)] rounded-2xl p-6 flex justify-center items-center"
  >
    <slot></slot>
  </div>
</template>
