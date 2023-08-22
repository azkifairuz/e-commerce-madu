<script setup>
import formCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive,onMounted } from "vue";
import { objectToFormdata } from "@/utils/ObjectToForm";
import Api from "@/config/api/Api";
import { objectToData } from "@/utils/ObjectToData";
import { useRouter } from "vue-router";

const router = useRouter()
const idPelanggan = sessionStorage.getItem("sesIdPelanggan")
const { GET,POST } = Api();
const profil = reactive({
  nik: "82312999",
  nm_pelanggan: "",
  alamat_pelanggan: "",
  tgl_lahir: "",
  tmp_lahir: "",
  jns_kelamin: "L",
  email: "",
  no_telp: "",
});
async function getProfile() {
  const data = await GET(`pelanggan/${idPelanggan}`);
  objectToData(profil,data)
}

async function save() {
  const data = await POST(`pelanggan/${idPelanggan}`,objectToFormdata(profil))
  if (!data) {
    return
  }
  router.push({
    name:"profile"
  })
  return;
}

onMounted(() => {
  getProfile();
});
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <formCard headerText="Masukan Email" btnLabel="Edit" @save="save">
      <template class="flex flex-col gap-6" v-slot:inputField>
        <InputField
          label="Nama"
          v-model="profil.nm_pelanggan"
          placeholder="Masukan nama"
          typeInput="text"
          name="nm"
        />
        <InputField
          label="Alamat"
          v-model="profil.alamat_pelanggan"
          placeholder="Masukan Alamat"
          typeInput="text"
          name="nm"
        />
      </template>
    </formCard>
  </div>
</template>
