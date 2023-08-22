<script setup>
import FormCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive, ref, onMounted } from "vue";
import { objectToData } from "@/utils/ObjectToData";
import { objectToFormdata } from "@/utils/ObjectToForm";
import alertPopup from "@/components/molecular/alertPopup.vue";
import successPopup from "@/components/molecular/successPopup.vue";
import Api from "@/config/api/Api";

const { GET, POST } = Api();

const responseMsg = ref(null);
const idUser = sessionStorage.getItem("sesIdUser");
const idPelanggan = sessionStorage.getItem("sesIdPelanggan");
const isOpen = ref(true);

const password = reactive({
  newPw: "",
  confirmPw: "",
});

const user = reactive({
  id_pelanggan: "",
  id_pegawai: 0,
  name: "",
  email: "",
  password: password.confirmPw,
  level: "cust",
});

const email = reactive({
  email: "",
});
async function getProfile() {
  const data = await GET(`user/${idUser}`);
  if (idUser == null) {
    return;
  }
  objectToData(user, data);
  user.id_pelanggan = idPelanggan;
}

const isEmailValid = ref(false);

async function cekEmail() {
  if (!email.email) {
    isEmailValid.value = false;
    responseMsg.value = "email tidak boleh kosong";
    isOpen.value = !isOpen.value;

    return;
  }
  if (email.email != user.email) {
    isEmailValid.value = false;
    responseMsg.value = "email tidak sama";
    isOpen.value = !isOpen.value;

    return;
  }
  isEmailValid.value = true;
  return;
}

async function saveNewPw() {
  if (!password.newPw && !password.confirmPw) {
    responseMsg.value = "password tidak boleh kosong";
    isOpen.value = !isOpen.value;
    return;
  }

  if (password.newPw != password.confirmPw) {
    responseMsg.value = "password tidak sama";
    isOpen.value = !isOpen.value;
    return;
  }
  user.id_pelanggan = idPelanggan;
  user.password = password.confirmPw;
  responseMsg.value = "berhasil mengubah";
  isOpen.value = !isOpen.value;
  await POST(`user/${idUser}`, objectToFormdata(user));
}
const closeAlert = () => {
  isOpen.value = !isOpen.value;
};
onMounted(() => {
  getProfile();
});
</script>

<template>
  <main class="my-10 flex justify-center items-center h-screen">
    <FormCard
      v-show="isEmailValid === false"
      headerText="Masukan Password Baru"
      btnLabel="Next"
      @save="cekEmail"
    >
      <template v-slot:inputField>
        <InputField
          label="email"
          v-model="email.email"
          placeholder="Masukan Email"
          typeInput="email"
          name="nm"
        />
        <alertPopup
          v-if="isOpen == true && responseMsg != null"
          :message="responseMsg"
          :isOpen="isOpen"
          @close="closeAlert"
        />
      </template>
    </FormCard>
    <FormCard
      v-show="isEmailValid === true"
      headerText="Masukan Password Baru"
      btnLabel="Save"
      @save="saveNewPw"
    >
      <template v-slot:inputField>
        <InputField
          label="Password Baru"
          v-model="password.newPw"
          placeholder="Masukan Password Baru"
          typeInput="text"
          name="nm"
        />
        <InputField
          label="Konfirmasi"
          v-model="password.confirmPw"
          placeholder="Konfirmasi"
          typeInput="text"
          name="nm"
        />
        <alertPopup
          v-if="
            isOpen == true &&
            responseMsg != null &&
            responseMsg != 'berhasil mengubah'
          "
          :message="responseMsg"
          :isOpen="isOpen"
          @close="closeAlert"
        />
        <successPopup
          v-if="isOpen == true && responseMsg == 'berhasil mengubah'"
          :message="responseMsg"
          :isOpen="isOpen"
          @close="closeAlert"
        />
      </template>
    </FormCard>
  </main>
</template>
