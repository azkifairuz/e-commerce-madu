<script setup>
import logo from "@/assets/logo.png";
import InputField from "@/components/atom/InputField.vue";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm.js";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import alertPopup from "@/components/molecular/alertPopup.vue";

function setAuthToken(token) {
  if (token) {
    sessionStorage.setItem("jwtToken", token);
    sessionStorage.setItem("isLogin", true);
  } else {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.setItem("isLogin", false);
  }
}
const { POST } = Api();
const responseMsg = ref(null);
const isAuthorize = ref(false);
async function authenticate(credentials) {
  try {
    const response = await POST("auth/login", credentials);
    if (response.error) {
      isAuthorize.value = response.error;
      console.log(isAuthorize);
      return;
    }
    isAuthorize.value = true;
    const { access_token } = response;
    setAuthToken(access_token);
  } catch (error) {
    console.log("Autentikasi gagal", error);
    return false;
  }
}

const credentials = reactive({
  email: "",
  password: "",
});

const isOpen = ref(true);

async function handleLogin() {
  isOpen.value = true
  if (!credentials.email) {
    responseMsg.value = "email tidak boleh kosong";
    return;
  }
  if (!credentials.password) {
    responseMsg.value = "password tidak boleh kosong";
    return;
  }

  await authenticate(objectToFormdata(credentials));
  if (isAuthorize.value == "Account not found") {
    responseMsg.value = "Akun Tidak Ada";
    return;
  }

  if (isAuthorize.value == "Invalid password") {
    responseMsg.value = "Password Salah";
    return;
  }
  const data = await POST(
    `auth/me?token=${sessionStorage.getItem("jwtToken")}`
  );
  const level = data.level;
  sessionStorage.setItem("sesIdUser", data.id);
  sessionStorage.setItem("sesIdPelanggan", data.id_pelanggan);
  if (level != "admin") {
    sessionStorage.setItem("levelUser", data.level);
    router.push({
      name: "home",
    });
    return;
  }
  sessionStorage.setItem("levelUser", data.level);
  router.push({
    name: "admin",
  });
}
const router = useRouter();
const isCustomer = router.currentRoute.value.name === "loginUser";

const goToRegister = () => {
  router.push({
    name: "registerUser",
  });
};

const forgetPw = () => {
  router.push({
    name: "forgetPwUser",
  });
};

const closeAlert = () => {
  isOpen.value = !isOpen.value;
};
</script>
<template>
  <div
    class="flex min-h-full md:min-h-fit items-center max-w-sm bg-white flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto w-48 h-auto" :src="logo" alt="Madu Apiari" />

      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Halo Silahkan Masuk!!
      </h2>
      <alertPopup
        v-if="isOpen == true && responseMsg != null"
        :message="responseMsg"
        :isOpen="isOpen"
        @close="closeAlert"
      />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <InputField
          label="Email"
          v-model="credentials.email"
          placeholder="Masukan Email anda"
          typeInput="email"
          name="email"
        />
      </div>

      <div>
        <InputField
          label="Password"
          v-model="credentials.password"
          placeholder="Masukan Password anda"
          typeInput="password"
          name="nmProduk"
        />
      </div>
      <div class="text-sm mb-5 -mt-5">
        <button
          @click="forgetPw"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Forgot password?
        </button>
      </div>
      <div>
        <button
          @click="handleLogin()"
          class="flex w-full justify-center rounded-md bg-btn-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-btn-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Masuk
        </button>
      </div>

      <p v-if="isCustomer" class="mt-10 text-center text-sm text-gray-500">
        Belum Punya Akun?
        <button
          @click="goToRegister"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          daftar
        </button>
      </p>
    </div>
  </div>
</template>
