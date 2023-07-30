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
      <div class=" bg-btn-primary rounded-lg p-8  gap-10  justify-center flex flex-col  items-center overflow-hidden">
        <h1 class="text-4xl text-center font-bold text-black ">Selamat Datang Di Madu Apiari</h1>
        <img
          :src="logo"
          alt="Registration Image"
          class="object-cover h-28 "
        />
        <h1 class="text-2xl text-center  text-black ">Sudah Memiiki Akun?</h1>
        <button
          @click="goToLogin"
          class="w-full rounded-md z-10  bg-white  py-2 text-sm font-semibold text-btn-primary shadow-sm hover:bg-[#f2f2f2]"
        >
          Login
        </button>
      </div>

      <!-- Form Section -->
      <div class="w-full">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-2xl font-bold text-center mb-8">
            {{ isCustomer ? "Daftar Akun" : "Daftarkan Admin" }}
          </h1>
          <p v-if="isCustomer" class="mb-8 text-center text-sm text-gray-500">
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
