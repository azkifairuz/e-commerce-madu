<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import InputField from "../../../components/atom/InputField.vue";
import Api from "../../../config/api/Api";
import { objectToFormdata } from "../../../utils/ObjectToForm";

const category = reactive({
  id:null,
  nm_jns_produk: "",
  ket_jns_produk: "",
});

onMounted(() => {
  getCategoryById();
});

const { POST, GET } = Api();
const route = useRoute();

async function getCategoryById() {
  const idCategory = route.params.category;
  const data = await GET(`jnsproduk/${idCategory}`);
  console.log(data.data);
  if (!data.data) {
    console.log("data tidak ditemukan");
    return;
  }
  Object.keys(data.data).forEach((key) => {
    category[key] = data.data[key];
  });
  console.log(data.data);
}
async function save(id) {
  const data = await POST(`jnsproduk/${id}`, objectToFormdata(category));
  console.log(data);
}
</script>

<template>
  <div class="w-[400px]">
    <div class="mb-6">
      <label
        for="nmProduct"
        class="block mb-2 text-lg font-medium text-gray-900"
      >
        Nama kategori
      </label>
      <input
        type="text"
        id="nmProduct"
        v-model="category.nm_jns_produk"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukan Nama Kategori"
        required
      />
    </div>
    <div class="mb-6">
      <label for="qty" class="block mb-2 text-lg font-medium text-gray-900">
        Keterangan
      </label>
      <textarea
        rows="7"
        id="qty"
        v-model="category.ket_jns_produk"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Keterangan "
        required
      ></textarea>
    </div>

    <button
      @click="save(category.id)"
      class="bg-yellow-main hover:bg-yellow-hover text-black font-bold py-2 px-4 rounded"
    >
      Kirim
    </button>
  </div>
</template>
