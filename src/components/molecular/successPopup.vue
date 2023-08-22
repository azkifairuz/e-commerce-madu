<script setup>
const props = defineProps({
  message: String,
  isOpen:Boolean,
});
const emit = defineEmits(["close"])
function closeAlert() {
  emit("close")
}
</script>
<template>
  <main
  :class="props.isOpen? 'flex':'hidden'"
  class="py-2 text-white px-5 items-center gap-5 bg-success  rounded-xl flex justify-between"
  >
    <div class="flex items-center gap-2">
      <svg
        width="15"
        height="15"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
          fill="white"
        />
      </svg>
      <h1 class="text-sm capitalize">{{ props.message }}</h1>
    </div>
    <svg
      @click="closeAlert"
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="cursor-pointer"
    >
      <path
        d="M2.14286 20L0 17.8571L7.85714 10L0 2.17687L2.14286 0L10 7.82313L17.8571 0L20 2.17687L12.1769 10L20 17.8571L17.8571 20L10 12.1769L2.14286 20Z"
        fill="white"
      />
    </svg>
  </main>
</template>
