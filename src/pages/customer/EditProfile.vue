<script setup>
import formCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import { reactive } from "vue";
const profil = reactive({
  name: "",
  alamat:"",
});
function save() {
  console.log("save");
  return;
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <formCard headerText="Masukan Email" btnLabel="Edit" @save="save">
      <template class="flex flex-col gap-6" v-slot:inputField>
        <InputField
          label="Nama"
          v-model="profil.name"
          placeholder="Masukan nama"
          typeInput="text"
          name="nm"
        />
        <InputField
          label="Alamat"
          v-model="profil.alamat"
          placeholder="Masukan Alamat"
          typeInput="text"
          name="nm"
        />
      </template>
    </formCard>
  </div>
</template>
