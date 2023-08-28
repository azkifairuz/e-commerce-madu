<script setup>
import formCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import Api from "../../../config/api/Api";
import { reactive, onMounted } from "vue";
import { objectToFormdata } from "@/utils/ObjectToForm";
import { useRoute } from "vue-router";
const route = useRoute();
const idPemesanan = route.params.idPemesanan;

const { POST } = Api();
const status = reactive({
  id_pemesanan: idPemesanan,
  keterangan: "Sedang Dikirim",
  image: "",
});
function onImageChange(event) {
  const file = event.target.files[0];
  status.image = file;
}

async function save(){
    await POST(`statuskirim/${idPemesanan}`,objectToFormdata(status))
    return

}
</script>
<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <formCard headerText="Upload Bukti Pembayaran" btnLabel="Edit" @save="save">
      <template class="flex flex-col gap-6" v-slot:inputField>
        <div class="flex flex-col gap-2">
          <label for="gambar" class="text-xl cursor-pointer">Upload Bukti Pembayaran</label>
          <input
            class="py-2 px-5 g-white shadow-sm border-2 cursor-pointer rounded-md"
            type="file"
            id="gambar"
            ref="imageInput"
            accept="image/*"
            @change="onImageChange"
          />
        </div>
      </template>
    </formCard>
  </div>
</template>
