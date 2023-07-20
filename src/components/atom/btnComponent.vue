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
    class="rounded-[4px] flex cursor-pointer justify-center text-center gap-2 items-center px-[32px] py-3"
  >
    <slot></slot>
    <p>
      {{ label }}
    </p>
  </div>
</template>
