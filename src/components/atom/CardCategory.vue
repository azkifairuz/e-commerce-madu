<script setup>
import honeyJar from '@/assets/honey-jar.webp'
const props = defineProps(['label'])
const emit =  defineEmits(['kategoriList'])
function goToKategori(){
  emit("kategoriList")
}
</script>

<template>
  <div @click="goToKategori" class="w-32 box-border cursor-pointer flex-col justify-evenly text-center h-40 flex items-center py-2 px-5 rounded-md shadow-lg bg-btn-primary
  text-black hover:bg-btn-hover">
  <div class="w-16  ">
    <img :src="honeyJar" alt="">
  </div>
    <p class="text-lg capitalize justify-self-end">
      {{ props.label }}
    </p>
  </div>
</template>