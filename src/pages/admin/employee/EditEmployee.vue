<script setup>
import FormCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import { objectToFormdata } from "@/utils/ObjectToForm";
import { objectToData } from "@/utils/ObjectToData";
import Api from "@/config/api/Api";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive } from "vue";

const router = useRouter();
const { GET, POST } = Api();
const route = useRoute();
const idPegawai = route.params.pegawai;
const detailPegawai = reactive({
  nik: "",
  nm_pegawai: "",
  jns_kelamin: "L",
  alamat_pegawai: "",
  tgl_lahir: "",
  tmp_lahir: "",
  email: "",
  no_telp: "",
});

async function getProfile() {
  const data = await GET(`pegawai/${idPegawai}`);
  objectToData(detailPegawai, data);
}

async function save() {
  const data = await POST(
    `pegawai/${idPegawai}`,
    objectToFormdata(detailPegawai)
  );
  if (!data) {
    return;
  }
  router.push({
    name: "employee",
  });
  return;
}

onMounted(() => {
  getProfile();
});
</script>
<template>
  <FormCard headerText="Edit Pegawai" btnLabel="Edit" @save="save">
    <template class="flex flex-col gap-6" v-slot:inputField>
      <InputField
        label="Nama"
        v-model="detailPegawai.nm_pegawai"
        placeholder="Masukan nama"
        typeInput="text"
        name="nm"
      />
      <InputField
        label="Alamat"
        v-model="detailPegawai.alamat_pegawai"
        placeholder="Masukan nama"
        typeInput="text"
        name="nm"
      />
      <InputField
        label="No Telpon"
        v-model="detailPegawai.no_telp"
        placeholder="Masukan nama"
        typeInput="text"
        name="nm"
      />
    </template>
  </FormCard>
</template>
