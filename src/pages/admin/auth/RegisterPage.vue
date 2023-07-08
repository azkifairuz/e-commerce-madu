<script setup>
import RegisterForm from "@/components/molecular/RegisterForm.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";

const detailPegawai = reactive({
  nik: "",
  nm_pegawai: "",
  jns_kelamin: "",
  alamat_pegawai: "",
  tgl_lahir: "",
  temp_lahir: "",
  email: "",
  no_telp: "",
});

const account = reactive({
  id_pelanggan: 0,
  id_pegawai: null,
  name: "",
  email: "",
  password: "",
  level: "admin",
});

const {POST} = Api()
async function save() {
  const data = await POST("pegawai", objectToFormdata(detailPegawai));
  console.log(data.lastId);
  account.id_pegawai = data.lastId;
  account.email = detailPegawai.email;
  account.name = detailPegawai.nm_pegawai;
  await POST("register", objectToFormdata(account));
}
</script>

<template>
  <RegisterForm>
    <template v-slot:inputField>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
        </div>
        <div>
          <InputField
            label="Nik"
            v-model="detailPegawai.nik"
            placeholder="Masukan Nik anda"
            typeInput="text"
            name="email"
          />
        </div>
        <div>
          <InputField
            label="Nama"
            v-model="detailPegawai.nm_pegawai"
            placeholder="Masukan nama anda"
            typeInput="text"
            name="email"
          />
        </div>
        <div>
          <InputField
            label="jenis kelamin"
            v-model="detailPegawai.jns_kelamin"
            placeholder="Masukan Jenis Kelamin anda"
            typeInput="text"
            name="email"
          />
        </div>
        <div>
          <InputField
            label="alamat"
            v-model="detailPegawai.alamat_pegawai"
            placeholder="Masukan alamat anda"
            typeInput="text"
            name="email"
          />
        </div>
        <div>
          <InputField
            label="Tanggal Lahir"
            v-model="detailPegawai.tgl_lahir"
            placeholder="Masukan tgl lahir anda"
            typeInput="date"
            name="email"
          />
        </div>
        <div>
          <InputField
            label="Tempat Lahir"
            v-model="detailPegawai.tmp_lahir"
            placeholder="Masukan Tempat Lahir anda"
            typeInput="text"
            name="email"
          />
        </div>
        <div>
          <InputField
            label="Nomor Hp"
            v-model="detailPegawai.no_telp"
            placeholder="Masukan Nomor Hp anda"
            typeInput="text"
            name="email"
          />
        </div>
        <div>
          <InputField
            label="Email"
            v-model="detailPegawai.email"
            placeholder="Masukan Email anda"
            typeInput="text"
            name="email"
          />
        </div>

        <div>
          <InputField
            label="Password"
            v-model="account.password"
            placeholder="Masukan Password anda"
            typeInput="password"
            name="nmProduk"
          />
        </div>
        <div class="text-sm mb-5 -mt-5">
          <button
            @click="forgetPw"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </button>
        </div>
        <div>
          <button
            @click="save"
            class="flex w-full justify-center rounded-md bg-btn-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-btn-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Daftar
          </button>
        </div>

        <p v-if="isCustomer" class="mt-10 text-center text-sm text-gray-500">
          sudah ada Akun?
          <button
            @click="goToLogin"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            daftar
          </button>
        </p>
      </div>
    </template>
  </RegisterForm>
</template>
