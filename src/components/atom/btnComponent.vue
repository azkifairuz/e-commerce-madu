<script setup>
const props = defineProps({
  label: String,
  primaryColor: String,
  hoverColor: String,
  textColor: String,
});
const emit = defineEmits(["someEvent"]);

function buttonClick() {
  emit("someEvent");
}
</script>
<template>
  <div
    @click="buttonClick"
    :class="[primaryColor, hoverColor, textColor]"
    class="rounded-md flex cursor-pointer justify-center text-center gap-2 items-center px-2 py-2"
  >
    <slot></slot>
    <p>
      {{ label }}
    </p>
  </div>
</template>
