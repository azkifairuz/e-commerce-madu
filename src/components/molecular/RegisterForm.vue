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

  <div class="flex flex-col-reverse lg:flex-row overflow-y-auto bg-white w-full h-screen">
    <!-- Image Section -->
    <div class="lg:block w-full h-[1000px] lg:w-1/2 bg-btn-primary">
      <!-- Replace the URL with your image -->
      <img
        src="image-url.jpg"
        alt="Registration Image"
        class="object-cover w-full h-full"
      />
    </div>

    <!-- Form Section -->
    <div class="w-full lg:w-1/2 px-6 lg:h-screen lg:overflow-y-auto pb-10  bg-white">
      <h1 class="text-2xl font-bold text-center">
        {{ isCustomer ? "Daftar Akun" : "Daftarkan Admin" }}
      </h1>
      <p v-if="isCustomer" class="mb-10 text-center text-sm text-gray-500">
        sudah ada Akun?
        <button
          @click="goToLogin"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </button>
      </p>
      <slot class="" name="inputField"> </slot>
      <div>
        <button
          @click="buttonClick"
          class="flex w-full justify-center rounded-md bg-btn-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-btn-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Daftar
        </button>
      </div>


    </div>
  </div>
</template>
