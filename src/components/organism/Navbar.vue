<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const listItem = [
  {
    name: "home",
    title: "Beranda",
  },
  {
    name: "productCustomer",
    title: "Produk",
  },
  {
    name: "contact",
    title: "Kontak",
  },
];
function navigation(path) {
  router.push({
    name: path,
  });
}
</script>

<template>
  <div class="fixed left-0 right-0 flex justify-between top-0 items-center bg-yellow-main p-4 text-black">
    <h1 class="text-2xl font-bold">Madu</h1>
    <ul class="flex items-center gap-2">
      <div  v-for="(item,index) in listItem" :key="index" class="h-full flex gap-6 w-full">
        <li @click="navigation(item.name)" class="cursor-pointer px-5 hover:font-bold ">
          {{ item.title }}
      </li>
      </div>
     <div class="flex gap-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
      <button class="bg-white text-black border border-black hover:bg-black hover:text-white hover:border-white font-bold py-2 px-4 rounded">Register</button>
     </div>
    </ul>

  </div>
</template>