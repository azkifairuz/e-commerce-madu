<script setup>
import { ref } from "vue";
import btnComponent from "../atom/btnComponent.vue";
const isOpen = ref(false);
const searchQuery = ref("");
const links = [
  { id: 1, label: "Beranda", url: "#" },
  { id: 2, label: "Tentang", url: "about" },
  { id: 3, label: "Jenis Madu", url: "category" },
  { id: 3, label: "Madu", url: "prduct" },
  { id: 4, label: "Kontak", url: "contact" },
];
</script>

<template>
  <nav class="bg-yellow-main">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-5">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="@/assets/logo.png" alt="Logo" />
          </div>
          <div class="flex justify-center flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search"
              class="w-full max-w-xs px-4 py-2 rounded-md text-sm font-medium text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline gap-2">
              <a
                v-for="link in links"
                :key="link.id"
                :href="link.url"
                class="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-yellow-light"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
          <div class="gap-4 hidden md:flex">
            <btn-component
              label="Masuk"
              primary-color="bg-green-500"
              hover-color="hover:bg-green-700"
              text-color="text-white"
            />
            <btn-component
              label="Daftar"
              primary-color="bg-blue-500"
              hover-color="hover:bg-blue-700"
              text-color="text-white"
            />
          </div>
        </div>

        <div class="-mr-2 flex md:hidden">
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-black  hover:bg-yellow-300 focus:outline-none focus:bg-yellow-400  transition duration-150 ease-in-out"
            :aria-expanded="isOpen"
          >
            <svg
              class="h-6 w-6"
              :class="{ hidden: isOpen, block: !isOpen }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ block: isOpen, hidden: !isOpen }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div :class="{ block: isOpen, hidden: !isOpen }" class="md:hidden  ">
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <a
          v-for="link in links"
          :key="link.id"
          :href="link.url"
          class="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-yellow-300"
        >
          {{ link.label }}
        </a>

      </div>
      <div class="flex flex-col gap-4 px-3 pb-4  ">
          <btn-component
            label="Masuk"
            primary-color="bg-green-500"
            hover-color="hover:bg-green-700"
            text-color="text-white"
          />
          <btn-component
            label="Daftar"
            primary-color="bg-blue-500"
            hover-color="hover:bg-blue-700"
            text-color="text-white"
          />
        </div>
    </div>
  </nav>
</template>
