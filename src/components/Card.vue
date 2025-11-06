<script setup lang="ts">
import { computed } from "vue";

type Size = "medium" | "large";

interface CardProps {
  size: Size;
  visibility: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  size: "medium",
  visibility: true,
});

const variants = {
  large: "min-w-2/3 min-h-[80vh] max-w-[80%]",
  medium: "max-w-[400px]",
};

const sizeStyle = computed(() => variants[props.size]);
</script>

<template>
  <div
    :class="
      (props.visibility ? 'animate-fade ' : 'animate-fade-down ') + sizeStyle
    "
    class="bg-[#fffafc] border border-[#ffe5ec] shadow-[0_2px_8px_rgba(255,183,206,0.25)] rounded-2xl p-6 flex justify-center items-center"
  >
    <slot></slot>
  </div>
</template>
