<script setup>
import btnComponent from "@/components/atom/btnComponent.vue";
const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
  category: String,
  price: String,
});
const emit = defineEmits(['goToDetail'])
function goToDetail() {
  emit('goToDetail')
}
</script>

<template>
  <div
    class="max-w-md bg-white rounded-md  overflow-hidden w-60 cursor-pointer p-2 hover:shadow-lg"
  >
    <img
      :src="imageUrl"
      class="w-full bg-black h-48 object-cover"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 line-clamp-1 hover:">{{ title }}</div>
      <p class="text-gray-700 text-base line-clamp-2 overflow-ellipsis">
        {{ description }}
      </p>
    </div>
    <div class="px-4 flex justify-between pt-4 pb-2">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >{{ category }}</span
      >
      <span
        class="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
        >Rp.{{ price }}</span
      >
    </div>
    <div class="px-6">
    </div>
  </div>
</template>
