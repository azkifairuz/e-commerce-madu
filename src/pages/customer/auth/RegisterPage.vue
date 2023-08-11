<script setup>
import RegisterForm from "@/components/organism/RegisterForm.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import TextArea from "@/components/atom/TextArea.vue";
import alertPopup from "@/components/molecular/alertPopup.vue";

const isOpen = ref(false);
const responseMsg = ref("");
const detailCustomer = reactive({
  nik: "",
  nm_pelanggan: "",
  alamat_pelanggan: "",
  tgl_lahir: "",
  tmp_lahir: "",
  jns_kelamin: "L",
  email: "",
  no_telp: "",
});
const selectOption = [
  { value: "L", label: "Laki-Laki" },
  { value: "P", label: "Perempuan" },
];
const account = reactive({
  id_pelanggan: null,
  id_pegawai: 0,
  name: "",
  email: "",
  password: "",
  level: "cust",
});
const router = useRouter();
const { POST, GET } = Api();
async function cekEmail() {
  try {
    const response = await GET("pelanggan");
    return response.data;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
}
async function save() {
  if (detailCustomer.email == "") {
    isOpen.value = true;
    responseMsg.value = "email tidak boleh kosong";
    return;
  }
  if (account.password == "") {
    isOpen.value = true;
    responseMsg.value = "password tidak boleh kosong";
    return;
  }
  if (detailCustomer.nik == "") {
    isOpen.value = true;
    responseMsg.value = "nik tidak boleh kosong";
    return;
  }
  if (detailCustomer.nm_pelanggan == "") {
    isOpen.value = true;
    responseMsg.value = "nama tidak boleh kosong";
    return;
  }
  const emails = await cekEmail();
  const email = [];
  emails.forEach((emailData) => {
    email.push(emailData.email);
  });

  if (email.includes(detailCustomer.email)) {
    isOpen.value = true;
    responseMsg.value = "Email Sudah Terdaftar";
    return;
  }
  const data = await POST("pelanggan", objectToFormdata(detailCustomer));
  account.id_pelanggan = data.lastId;
  account.email = detailCustomer.email;
  account.name = detailCustomer.nm_pelanggan;
  await POST("register", objectToFormdata(account));
  router.push({
    name: "loginUser",
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
          v-model="detailCustomer.nm_pelanggan"
          placeholder="Masukan nama anda"
          typeInput="text"
          name="nm"
        />

        <InputField
          label="Email"
          v-model="detailCustomer.email"
          placeholder="Masukan Email anda"
          typeInput="text"
          name="email"
        />

        <InputField
          label="Password"
          v-model="account.password"
          placeholder="Masukan Password anda"
          typeInput="password"
          name="pw"
        />
        <InputField
          label="Nik"
          v-model="detailCustomer.nik"
          placeholder="Masukan Nik anda"
          typeInput="text"
          name="nik"
        />
        <div class="flex flex-col gap-3">
          <label class="text-lg"> Jenis Kelamin</label>
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
                v-model="detailCustomer.jns_kelamin"
              />
              <label :for="option.value">{{ option.label }}</label>
            </div>
          </div>
        </div>

        <TextArea
          label="alamat"
          v-model="detailCustomer.alamat_pelanggan"
          placeholder="Masukan alamat anda"
          name="alamat"
        />

        <InputField
          label="Tanggal Lahir"
          v-model="detailCustomer.tgl_lahir"
          placeholder="Masukan tgl lahir anda"
          typeInput="date"
          name="tanggalLahir"
        />

        <InputField
          label="Tempat Lahir"
          v-model="detailCustomer.tmp_lahir"
          placeholder="Masukan Tempat Lahir anda"
          typeInput="text"
          name="email"
        />

        <InputField
          label="Nomor Hp"
          v-model="detailCustomer.no_telp"
          placeholder="Masukan Nomor Hp anda"
          typeInput="text"
          name="email"
        />
      </div>
    </template>
  </RegisterForm>
</template>
