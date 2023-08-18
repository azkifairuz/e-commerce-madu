<script setup>
import FormCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive } from "vue";

const password = reactive({
  newPw: "",
  confirmPw: "",
});

async function saveNewPw() {}
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
          label="Password Baru"
          v-model="password.nm_pegawai"
          placeholder="Masukan Password Baru"
          typeInput="text"
          name="nm"
        />
        <InputField
          label="Konfirmasi"
          v-model="password.nm_pegawai"
          placeholder="Konfirmasi"
          typeInput="text"
          name="nm"
        />
      </template>
    </FormCard>
  </main>
</template>
