<script setup>
import RegisterForm from "@/components/molecular/RegisterForm.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import TextArea from "@/components/atom/TextArea.vue";
import alertPopup from "@/components/molecular/alertPopup.vue";

const isOpen = ref(false);
const responseMsg = ref("");
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
const selectOption = [
  { value: "L", label: "Laki-Laki" },
  { value: "P", label: "Perempuan" },
];
const account = reactive({
  id_pelanggan: 0,
  id_pegawai: null,
  name: "",
  email: "",
  password: "",
  level: "admin",
});

const router = useRouter();
const { POST, GET } = Api();

async function cekEmail() {
  try {
    const response = await GET("pegawai");
    return response.data;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
}
async function save() {
  if (detailPegawai.email == "") {
    isOpen.value = true;
    responseMsg.value = "email tidak boleh kosong";
    return;
  }
  if (account.password == "") {
    isOpen.value = true;
    responseMsg.value = "password tidak boleh kosong";
    return;
  }
  if (detailPegawai.nik == "") {
    isOpen.value = true;
    responseMsg.value = "nik tidak boleh kosong";
    return;
  }
  if (detailPegawai.nm_pegawai == "") {
    isOpen.value = true;
    responseMsg.value = "nama tidak boleh kosong";
    return;
  }
  const emails = await cekEmail();
  const email = [];
  emails.forEach((emailData) => {
    email.push(emailData.email);
  });

  if (email.includes(detailPegawai.email)) {
    isOpen.value = true;
    responseMsg.value = "Email Sudah Terdaftar";
    return;
  }
  const data = await POST("pegawai", objectToFormdata(detailPegawai));
  account.id_pegawai = data.lastId;
  account.email = detailPegawai.email;
  account.name = detailPegawai.nm_pegawai;
  await POST("register", objectToFormdata(account));
  router.push({
    name: "admin",
  });
}
</script>

<template>
  <RegisterForm @savedata="save">
    <template v-slot:inputField>
      <alertPopup :message="responseMsg" :isOpen="isOpen" />
      <div class="grid grid-rows-5 gap-2 grid-cols-2">
        <InputField
          label="Nama"
          v-model="detailPegawai.nm_pegawai"
          placeholder="Masukan nama"
          typeInput="text"
          name="nm"
        />

        <InputField
          label="Email"
          v-model="detailPegawai.email"
          placeholder="Masukan Email"
          typeInput="text"
          name="email"
        />

        <InputField
          label="Password"
          v-model="account.password"
          placeholder="Masukan Password"
          typeInput="password"
          name="pw"
        />
        <InputField
          label="Nik"
          v-model="detailPegawai.nik"
          placeholder="Masukan Nik "
          typeInput="text"
          name="nik"
        />
        <div class="flex flex-col gap-3">
          <label class="text-lg">Jenis Kelamin</label>
          <div class="flex gap-5">
            <div
              class="flex gap-2"
              v-for="option in selectOption"
              :key="option.value"
            >
              <input
                type="radio"
                :id="option.value"
                :value="option.value"
                v-model="detailPegawai.jns_kelamin"
              />
              <label :for="option.value">{{ option.label }}</label>
            </div>
          </div>
        </div>

        <TextArea
          label="alamat"
          v-model="detailPegawai.alamat_pegawai"
          placeholder="Masukan alamat anda"
          name="alamat"
        />

        <InputField
          label="Tanggal Lahir"
          v-model="detailPegawai.tgl_lahir"
          placeholder="Masukan tgl lahir anda"
          typeInput="date"
          name="tanggalLahir"
        />

        <InputField
          label="Tempat Lahir"
          v-model="detailPegawai.tmp_lahir"
          placeholder="Masukan Tempat Lahir anda"
          typeInput="text"
          name="email"
        />

        <InputField
          label="Nomor Hp"
          v-model="detailPegawai.no_telp"
          placeholder="Masukan Nomor Hp anda"
          typeInput="text"
          name="email"
        />
      </div>
    </template>
  </RegisterForm>
</template>
