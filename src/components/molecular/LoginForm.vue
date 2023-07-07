<script setup>
import logo from "@/assets/logo.png";
import InputField from "@/components/atom/InputField.vue";
import { reactive } from "vue";
const users = reactive({
  id: null,
  email: "",
  password: "",
});
</script>
<template>
  <div
    class="flex min-h-full md:min-h-fit items-center max-w-sm bg-white  flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" :src="logo" alt="Madu Apiari" />

      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Halo Customer Silahkan Masuk!!
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <InputField
          label="Email"
          v-model="users.email"
          placeholder="Masukan Email anda"
          typeInput="text"
          name="nmProduk"
        />
      </div>

      <div>
        <InputField
          label="Password"
          v-model="users.password"
          placeholder="Masukan Password anda"
          typeInput="password"
          name="nmProduk"
        />
      </div>
      <div class="text-sm mb-5 -mt-5">
            <a
              href="#"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Forgot password?</a
            >
          </div>
      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-btn-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-btn-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Belum Punya Akun?
        {{ " " }}
        <a
          href="#"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >register</a
        >
      </p>
    </div>
  </div>
</template>
