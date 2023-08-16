<script setup>
import { ref } from "vue";
import btnComponent from "@/components/atom/btnComponent.vue";
import { useRouter } from "vue-router";
const isOpen = ref(false);
const searchQuery = ref("");
const links = [
  { id: 1, label: "Beranda", url: "home" },
  { id: 2, label: "Semua Madu", url: "catalog" },
  { id: 3, label: "List Kategori Madu", url: "allCategory" },
  { id: 4, label: "Tentang Kami", url: "aboutus" },
  { id: 5, label: "Keranjang", url: "cart" },
  { id: 6, label: "Profil", url: "profile" },
];
const router = useRouter();

const isLogin = sessionStorage.getItem("isLogin");

function goToLoginPage() {
  sessionStorage.setItem("isLogin", false);
  router.push({
    name: "loginUser",
  });
}

function navigationPage(pathName) {
  router.push({
    name: pathName,
  });
}

function goToRegisterPage() {
  sessionStorage.setItem("isLogin", false);
  router.push({
    name: "registerUser",
  });
}
const navItem = isLogin === 'true' ? links:links.slice(0,3)
</script>

<template>
  <nav class="bg-yellow-main fixed z-50 left-0 right-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between lg:justify-center h-16">
        <div class="flex items-center gap-5">
          <div class="flex-shrink-0">
            <img class="h-14 w-14" src="@/assets/logoNavbar.png" alt="Logo" />
          </div>
          <div class="hidden lg:flex justify-center flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search"
              class="w-full max-w-xs px-4 py-2 rounded-md text-sm font-medium text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div class="hidden lg:block">
            <div class="ml-10 flex items-baseline gap-2">
              <a
                v-for="link in navItem"
                :key="link.id"
                @click="navigationPage(link.url)"
                class="px-3 py-2 rounded-md text-sm cursor-pointer font-medium text-black hover:bg-yellow-light"
              >
                {{ link.label }}
              </a>
            </div>
          </div>

          <div v-if="isLogin === 'true'" class="gap-4 hidden lg:flex">
            <btn-component
              label="Logout"
              @someEvent="goToLoginPage"
              primary-color="bg-red-500"
              hover-color="hover:bg-red-700"
              text-color="text-white"
            />
          </div>
          <div v-else class="gap-4 hidden lg:flex">
            <btn-component
              label="Masuk"
              @someEvent="goToLoginPage"
              primary-color="bg-green-500"
              hover-color="hover:bg-green-700"
              text-color="text-white"
            />
            <btn-component
              label="Daftar"
              @someEvent="goToRegisterPage"
              primary-color="bg-blue-500"
              hover-color="hover:bg-blue-700"
              text-color="text-white"
            />
          </div>
        </div>
        <div class="flex lg:hidden justify-center flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="w-full max-w-xs px-4 py-2 rounded-md text-sm font-medium text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div class="-mr-2 flex lg:hidden">
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-yellow-300 focus:outline-none focus:bg-yellow-400 transition duration-150 ease-in-out"
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
    <div :class="{ block: isOpen, hidden: !isOpen }" class="lg:hidden">
      <div class="px-2 pt-2 cursor-pointer pb-3 sm:px-3">
        <a
          v-for="link in links"
          :key="link.id"
          @click="navigationPage(link.url)"
          class="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-yellow-300"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="pb-4 px-3" v-if="isLogin === 'true'">
        <btn-component
          label="Logout"
          @someEvent="goToLoginPage"
          primary-color="bg-red-500"
          hover-color="hover:bg-red-700"
          text-color="text-white"
        />
      </div>
      <div v-else class="flex flex-col cursor-pointer gap-4 px-3 pb-4">
        <btn-component
          label="Masuk"
          @someEvent="goToLoginPage"
          primary-color="bg-green-500"
          hover-color="hover:bg-green-700"
          text-color="text-white"
        />
        <btn-component
          @someEvent="goToRegisterPage"
          label="Daftar"
          primary-color="bg-blue-500"
          hover-color="hover:bg-blue-700"
          text-color="text-white"
        />
      </div>
    </div>
  </nav>
</template>
