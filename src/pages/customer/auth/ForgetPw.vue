<script setup>
import FormCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive, ref } from "vue";

const password = reactive({
  newPw: "",
  confirmPw: "",
});
const email = reactive({
  email: "",
});

const isEmailValid = ref(false);

async function cekEmail() {
  isEmailValid.value = !isEmailValid.value;
  return;
}

async function saveNewPw() {
  console.log("save");
  return;
}
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
      </template>
    </FormCard>
  </main>
</template>
