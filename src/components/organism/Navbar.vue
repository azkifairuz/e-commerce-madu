<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const listItem = [
  {
    name: "home",
    title: "Beranda",
  },
  {
    name: "product",
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
  <div class="fixed left-0 right-0 bg-yellow-main py-2 px-5 text-black">
    <h1 class="text-2xl font-bold">Madu</h1>
    <ul v-for="(item,index) in listItem" :key="index" class="h-full flex justify-evenly">
      <li @click="item.path" class="cursor-pointer px-5">
          {{ item.name }}
      </li>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
      <button class="bg-white text-black border-b border-black hover:bg-black hover:text-white hover:border-white font-bold py-2 px-4 rounded">Register</button>
    </ul>
  </div>
</template>