<script setup>
import { reactive,onMounted } from "vue";
import Api from "@/config/api/Api"
import {objectToData} from "@/utils/ObjectToData"
import {formatDate} from "@/utils/FormatDate"
const {GET} = Api();
const idUser = sessionStorage.getItem("sesIdUser")

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

onMounted(
  ()=>{
    getProfile()
  }
)
</script>

<template>
  <main class="flex gap-2 mt-10">
    <aside class="w-1/3">
      <h1 class="text-2xl">{{ formatDate(profile.tgl_lahir) }}</h1>
    </aside>
  </main>
</template>
