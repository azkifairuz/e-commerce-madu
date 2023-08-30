<script setup>
import formCard from "@/components/organism/FormCard.vue";
import InputField from "@/components/atom/InputField.vue";
import Api from "../../../config/api/Api";
import { reactive, onMounted } from "vue";
import { objectToFormdata } from "@/utils/ObjectToForm";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
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
    router.push(
      {
        name:"order"
      }
    )
    return

}
</script>
<template>
  <div class="flex justify-center items-center">
    <formCard headerText="Upload Bukti Resi" btnLabel="Kirim" @save="save">
      <template v-slot:inputField>
        <div class="flex flex-col gap-2">
          <label for="gambar" class="text-xl cursor-pointer">Upload Bukti Resi</label>
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
