<script setup>
import { useRouter } from "vue-router";
import btnComponent from "@/components/atom/btnComponent.vue";

const router = useRouter();
const listItem = [
  {
    name: "category",
    title: "Kategori Madu",
  },
  {
    name: "product",
    title: "Produk Madu",
  },
  {
    name: "dataCustomer",
    title: "Pelanggan",
  },
  {
    name: "employee",
    title: "Pegawai",
  },
  {
    name: "order",
    title: "Penjualan",
  },
];

function goToLoginPage() {
  sessionStorage.setItem("isLogin", false);
  router.push({
    name: "loginUser",
  });
}

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
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-black">Dashboard</h2>
          </div>

          <div class="flex-1 justify-evenly gap-10 mt-10 flex flex-col">
            <ul class="text-sm" v-for="item in listItem" :key="item.name">
              <li
                class="rounded-md text-lg cursor-pointer font-semibold hover:bg-yellow-hover"
              >
                <a
                  @click="navigation(item.name)"
                  class="flex items-center p-2 space-x-3 rounded-md"
                >
                  <span class="text-[black]">{{ item.title }}</span>
                </a>
              </li>
            </ul>
            <btn-component
              label="Logout"
              @someEvent="goToLoginPage"
              primary-color="bg-red-500"
              hover-color="hover:bg-red-700"
              text-color="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
