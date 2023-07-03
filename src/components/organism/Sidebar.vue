<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const listItem = [
  {
    name: "product",
    title: "Product",
  },
  {
    name: "kategori",
    title: "Kategori Produk",
  },
];
function navigation(path) {
  router.push({
    name: path,
  });
}
</script>
<!-- search button -->
<!-- <div class="relative">
  <span class="absolute inset-y-0 left-0 flex items-center py-4">
    <button type="submit" class="p-2 focus:outline-none focus:ring">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </span>
  <input
    type="search"
    name="Search"
    placeholder="Search..."
    class="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
  />
</div> -->
<template>
  <div class="w-60 desktop-nav">
    <div class="flex">
      <div
        class="flex-col h-screen flex p-3 w-60 duration-300 bg-yellow-main shadow"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-black">Dashboard</h2>
          </div>

          <div class="flex-1">
            <ul class="pt-2 pb-4 space-y-1 text-sm" v-for="item in listItem" :key="item.name">
              <li class="rounded-sm text-lg cursor-pointer font-semibold hover:bg-yellow-hover">
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
