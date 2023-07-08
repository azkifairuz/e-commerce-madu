<script setup>
import RegisterForm from "@/components/molecular/RegisterForm.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import SelectField from "@/components/atom/SelectField.vue";
import TextArea from "@/components/atom/TextArea.vue";

const detailPegawai = reactive({
  nik: "",
  nm_pegawai: "",
  jns_kelamin: "L",
  alamat_pegawai: "",
  tgl_lahir: "",
  temp_lahir: "",
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
const router = useRouter()
const { POST } = Api();
async function save() {
  const data = await POST("pegawai", objectToFormdata(detailPegawai));
  console.log(data.lastId);
  account.id_pegawai = data.lastId;
  account.email = detailPegawai.email;
  account.name = detailPegawai.nm_pegawai;
  await POST("register", objectToFormdata(account));
  router.push(
    {
      name:"showPegawai"
    }
  )
}
</script>

<template>
  <main class="flex justify-center py-10 items-center w-fit">
    <RegisterForm @savedata="save">
      <template v-slot:inputField>
        <div class="flex gap-5">
          <div class="border-r border-black pr-2">
            <h1 class="text-xl font-semibold">Data Akun</h1>
            <InputField
              label="Nama"
              v-model="detailPegawai.nm_pegawai"
              placeholder="Masukan nama anda"
              typeInput="text"
              name="nm"
            />

            <InputField
              label="Email"
              v-model="detailPegawai.email"
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
          </div>
          <div class="class flex flex-col gap-2 items-center">
            <h1 class="text-xl text-center font-semibold">Data Diri</h1>
            <div class="grid items-center grid-cols-1 md:grid-cols-3 gap-2">
              <InputField
                label="Nik"
                v-model="detailPegawai.nik"
                placeholder="Masukan Nik anda"
                typeInput="text"
                name="nik"
              />
              <SelectField
                label="jenis kelamin"
                v-model="detailPegawai.jns_kelamin"
                placeholder="Pilih Jenis Kelamin"
                :options="selectOption"
                name="jk"
              />

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
          </div>
        </div>
      </template>
    </RegisterForm>
  </main>
</template>
