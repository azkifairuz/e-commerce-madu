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
  <div
    class="flex min-h-full md:min-h-fit md:w-fit items-center w-full bg-white flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full ">
      <img class="mx-auto h-10 w-auto" :src="logo" alt="Madu Apiari" />

      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{ isCustomer ? "Daftar Akun" : "Daftarkan Admin" }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto flex flex-col gap-5 sm:w-full md:w-fit">
      <slot name="inputField"> </slot>

      <div>
        <button
          @click="buttonClick"
          class="flex w-full justify-center rounded-md bg-btn-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-btn-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Daftar
        </button>
      </div>

      <p v-if="isCustomer" class="mt-10 text-center text-sm text-gray-500">
        sudah ada Akun?
        <button
          @click="goToLogin"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          daftar
        </button>
      </p>
    </div>
  </div>
</template>
