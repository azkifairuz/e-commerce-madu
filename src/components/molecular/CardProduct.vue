<script setup>
const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
  category: String,
  price: String,
});
</script>

<template>
  <div class="max-w-md mx-auto rounded overflow-hidden shadow-lg">
    <img :src="imageUrl" :alt="title" class="w-full h-48 object-cover">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 text-base">{{ description }}</p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{{ category }}</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{{ price }}</span>
    </div>
  </div>
</template>


