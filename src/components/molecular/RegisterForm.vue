<script setup>
import logo from "@/assets/logo.png";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";



// const detailCustomer = reactive({
//   nik: "",
//   nm_pelanggan: "",
//   alamat_pelanggan: "",
//   tgl_lahir: "",
//   tmp_lahir: "",
//   jns_kelamin: "",
//   email: "",
//   no_telp: "",
// });


// const { POST } = Api();

// const router = useRouter();
// const isCustomer = router.currentRoute.value.name === "registerUser";

// async function save() {
  
//   if (!isCustomer) {
  
//     return
//   }
//   await POST("pelanggan", objectToFormdata(account));
  
// }

// const goToLogin = () => {
//   if (!isCustomer) {
//     router.push({
//       name: "loginAdmin",
//     });
//     return;
//   }
//   router.push({
//     name: "loginUser",
//   });
// };

// const forgetPw = () => {
//   router.push({
//     name: "forgetpw",
//   });
// };
</script>
<template>
  <div
    class="flex min-h-full md:min-h-fit items-center max-w-sm bg-white flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" :src="logo" alt="Madu Apiari" />

      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Halo {{ isCustomer ? "Customer" : "Admin" }} Silahkan Masuk!!
      </h2>
    </div>

    <slot name = "inputField">

    </slot>
  </div>
</template>
