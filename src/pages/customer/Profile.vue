<script setup>
import { reactive, onMounted } from "vue";
import Api from "@/config/api/Api";
import BtnComponent from "@/Components/atom/BtnComponent.vue";
import { objectToData } from "@/utils/ObjectToData";
import { calculateAge } from "@/utils/CalculateAge";

const { GET } = Api();
const idUser = sessionStorage.getItem("sesIdUser");

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

async function getProfile() {
  const data = await GET(`pelanggan/${idUser}`);
  if (idUser == null) {
    return;
  }
  objectToData(profile, data);
  console.log(profile.tgl_lahir);
}

function edit (){
  return 
}
onMounted(() => {
  getProfile();
});
</script>

<template>
  <main class="flex flex-col md:flex-row gap-2 py-10 h-screen px-6 mt-10">
    <aside class="w-full h-fit md:w-1/3 bg-white rounded-lg md:h-[90%] shadow p-5 border-black">
      <h1 class="text-2xl font-bold font-poppins capitalize">
        {{ profile.nm_pelanggan }}
      </h1>
      <h1 class="text-xl font-poppins">{{ profile.email }}</h1>
    </aside>
    <main class="w-full relative bg-white rounded-lg h-[90%] shadow p-5 border-black">
      <ul>
        <li>
          <h1 class="text-xl font-bold capitalize">Alamat:</h1>
          <h1 class="text-xl">
            {{ profile.alamat_pelanggan }}
          </h1>
        </li>
        <li>
          <h1 class="text-xl font-bold capitalize">umur:</h1>
          <h1 class="text-xl">
            {{ calculateAge(profile.tgl_lahir) }}
          </h1>
        </li>
        <li>
          <h1 class="text-xl font-bold capitalize">Jenis Kelamin:</h1>
          <h1 class="text-xl">
            {{ profile.jns_kelamin === "L" ? "Laki-Laki" : "Perempuan" }}
          </h1>
        </li>
      </ul>
      <div class="absolute bottom-6 right-6">
        <BtnComponent
          label="Edit"
          @someEvent="edit"
          primary-color="bg-red-500"
          hover-color="hover:bg-red-700"
          text-color="text-white"
        />
      </div>
    </main>
  </main>
</template>
