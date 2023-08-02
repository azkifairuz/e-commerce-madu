<script setup>
import { reactive,onMounted } from "vue";
import Api from "@/config/api/Api"
import {objectToData} from "@/utils/ObjectToData"
const {GET} = Api();
const idUser = sessionStorage.getItem("sesIdUser")
console.log(idUser); 
const profile = reactive({
  nm_pelanggan: "",
  nik: null,
  alamat_pelanggan: "",
  tgl_lahir: "",
  tmp_lahir: "",
  jns_kelamin: "",
  email: "",
  no_telp: "",
});

async function getProfile () {
  const data = await GET(`pelanggan/${idUser}`)
  if (idUser == null ) {
    return
  }
  objectToData(profile,data)
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
}

onMounted(
  ()=>{
    getProfile()
  }
)
</script>

<template>
  <main class="flex gap-2">
    <aside class="w-1/3">
      <h1 class="text-2xl">{{ profile.nm_pelanggan }}</h1>
    </aside>
  </main>
</template>
