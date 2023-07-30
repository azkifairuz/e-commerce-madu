<script setup>
import logo from "@/assets/logo.png";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["savedata"]);

// const { POST } = Api();

const router = useRouter();
const isCustomer = router.currentRoute.value.name === "registerUser";

const goToLogin = () => {
  if (!isCustomer) {
    router.push({
      name: "loginAdmin",
    });
    return;
  }
  router.push({
    name: "loginUser",
  });
};

function buttonClick() {
  emit("savedata");
}
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="grid grid-cols-1  md:grid-cols-2 gap-8 max-w-[1200px] w-full p-8"
    >
      <!-- Image Section -->
      <div class="relative bg-btn-primary rounded-lg p-8  gap-10  justify-center flex flex-col  items-center overflow-hidden">
        <img
          :src="logo"
          alt="Registration Image"
          class="object-cover h-28 "
        />

      </div>

      <!-- Form Section -->
      <div class="w-full">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-2xl font-bold text-center mb-8 capitalize">
            {{ isCustomer ? "Selamat Datang Di madu apiari Silahkan daftar" : "Daftarkan Admin" }}
          </h1>
          <p v-show="isCustomer" class="mb-8 text-center text-sm text-gray-500">
            Sudah memiliki akun?
            <button
              @click="goToLogin"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </button>
          </p>
          <slot class="" name="inputField"> </slot>
          <div class="mt-6">
            <button
              @click="buttonClick"
              class="w-full rounded-md bg-btn-primary py-2 text-sm font-semibold text-white shadow-sm hover:bg-btn-hover focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
