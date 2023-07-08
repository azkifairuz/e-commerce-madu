<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const listItem = [
  {
    name: "product",
    title: "Produk",
  },
  {
    name: "category",
    title: "Kategori Produk",
  },
];
function navigation(path) {
  router.push({
    name: path,
  });
}
</script>
<template>
  <div class="w-60 desktop-nav">
    <div class="flex">
      <div
        class="flex-col fixed top-0 bottom-0 flex p-3 w-60 duration-300 bg-yellow-main shadow"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-black">Dashboard</h2>
          </div>

          <div class="flex-1">
            <ul class="pt-2  space-y-1 text-sm" v-for="item in listItem" :key="item.name">
              <li class="rounded-md text-lg cursor-pointer border border-black font-semibold hover:bg-yellow-hover">
                <a @click="navigation(item.name)" class="flex items-center p-2 space-x-3 rounded-md">
                  <span class="text-[black]">{{ item.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
