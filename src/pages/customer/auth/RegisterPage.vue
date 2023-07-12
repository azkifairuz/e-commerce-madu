<script setup>
import RegisterForm from "@/components/molecular/RegisterForm.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import SelectField from "@/components/atom/SelectField.vue";
import TextArea from "@/components/atom/TextArea.vue";
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
const router = useRouter()
const { POST } = Api();
async function save() {
  const data = await POST("pelanggan", objectToFormdata(detailCustomer));
  account.id_pelanggan = data.lastId;
  account.email = detailCustomer.email;
  account.name = detailCustomer.nm_pelanggan;
  await POST("register", objectToFormdata(account));
  router.push(
    {
      name:"loginUser"
    }
  )
}
</script>
<!-- <div class="flex gap-5">
  <div class="border-r border-black pr-2">
    <h1 class="text-xl font-semibold">Data Akun</h1>

  </div>
  <div class="class flex flex-col gap-2 items-center">
    <h1 class="text-xl text-center font-semibold">Data Diri</h1>
    <div class="grid items-center grid-cols-1 md:grid-cols-3 gap-2">

    </div>
  </div>
</div> -->
<template>
<RegisterForm @savedata="save">
  <template v-slot:inputField>
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
        <div class="flex gap-2" v-for="option in selectOption" :key="option.value">
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
