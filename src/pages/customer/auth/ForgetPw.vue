<script setup>
import FormCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive, ref, onMounted } from "vue";
import { objectToData } from "@/utils/ObjectToData";
import { objectToFormdata } from "@/utils/ObjectToForm";
import alertPopup from "@/components/molecular/alertPopup.vue";
import successPopup from "@/components/molecular/successPopup.vue";
import Api from "@/config/api/Api";
import { useRouter } from "vue-router";

const { GET, POST } = Api();

const responseMsg = ref(null);
// const idUser = sessionStorage.getItem("sesIdUser");
const idPelanggan = sessionStorage.getItem("sesIdPelanggan");
const isOpen = ref(true);
const router = useRouter();
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
// async function getProfile() {
//   const data = await GET(`user/${idUser}`);
//   if (idUser == null) {
//     return;
//   }
//   objectToData(user, data);
//   user.id_pelanggan = idPelanggan;
// }

// const userEmail = ref("");
async function saveNewPw() {
  if (!password.newPw && !password.confirmPw) {
    responseMsg.value = "password tidak boleh kosong";
    isOpen.value = true;
    return;
  }

  if (password.newPw != password.confirmPw) {
    responseMsg.value = "password tidak sama";
    isOpen.value = true;
    return;
  }
  user.id_pelanggan = idPelanggan;
  user.password = password.confirmPw;
  isOpen.value = true;
  const message = await POST(`user/${email.email}`, objectToFormdata(user));
  if (message.pesan === "User Tidak Ada") {
    responseMsg.value = "email tidak terdaftar";
    return;
  }
  responseMsg.value = "Berhasil mengubah";
  setTimeout(() => {
    router.push({
      name: "loginUser",
    });
  }, 2000);
}
const closeAlert = () => {
  isOpen.value = !isOpen.value;
};
// onMounted(() => {
//   getProfile();
// });
</script>

<template>
  <main class="my-10 flex justify-center items-center h-screen">
    <FormCard
      headerText="Masukan Password Baru"
      btnLabel="Save"
      @save="saveNewPw"
    >
      <template v-slot:inputField>
        <InputField
          label="email"
          v-model="email.email"
          placeholder="Masukan Email"
          typeInput="email"
          name="nm"
        />
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
            responseMsg !== null &&
            responseMsg !== 'berhasil mengubah'
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
