<script setup>
import { defineProps } from "vue";
const props = defineProps({
  label: String,
  primaryColor: String,
  hoverColor: String,
  textColor: String,
});
</script>
<template>
  <button
    :class="[primaryColor, hoverColor, textColor]"
    class="rounded-md flex gap-4 px-5 py-2"
  >
  <slot></slot>
  <p>
    {{ label }}
  </p>
  </button>
</template>
