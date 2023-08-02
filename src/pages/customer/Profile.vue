<script setup>
import { reactive } from "vue";
import Api from "@/config/api/Api"

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
  const data = await GET('pelanggan')
}
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
}

</script>

<template>
  <div
    class="min-h-screen flex justify-center items-center"
  >
    <div class="bg-gradient-to-b from-yellow-main to-yellow-light p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-3xl font-semibold text-gray-800 mb-4">
        {{ profile.nm_pelanggan }}
      </h1>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p><strong>NIK:</strong></p>
          <p>{{ profile.nik }}</p>
        </div>
        <div>
          <p><strong>Jenis Kelamin:</strong></p>
          <p>{{ profile.jns_kelamin === "L" ? "Laki-laki" : "Perempuan" }}</p>
        </div>
        <div class="col-span-2">
          <p><strong>Alamat:</strong></p>
          <p>{{ profile.alamat_pelanggan }}</p>
        </div>
        <div>
          <p><strong>Tanggal Lahir:</strong></p>
          <p>{{ formatDate(profile.tgl_lahir) }}</p>
        </div>
        <div>
          <p><strong>Tempat Lahir:</strong></p>
          <p>{{ profile.tmp_lahir }}</p>
        </div>
        <div class="col-span-2">
          <p><strong>Email:</strong></p>
          <p>{{ profile.email }}</p>
        </div>
        <div class="col-span-2">
          <p><strong>No. Telepon:</strong></p>
          <p>{{ profile.no_telp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
