<script setup>
import { onMounted, reactive } from "vue";
import InputField from "@/components/atom/InputField.vue";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import { useRoute, useRouter } from "vue-router";
const category = reactive({
  nm_jns_produk: "",
  ket_jns_produk: "",
});

const { GET,POST } = Api();
const route = useRoute();
const router = useRouter();
const idCategory = route.params.category;

onMounted(() => {
  getCategoryById();
});

async function getCategoryById() {
  const data = await GET(`jnsproduk/${idCategory}`);

  if (!data.data) {
    console.log("data tidak ditemukan");
    return;
  }

  Object.keys(data.data).forEach((key) => {
    category[key] = data.data[key];
  });
}

async function save() {
  try {

    if (idCategory != null) {
      await POST(`jnsproduk/${idCategory}`, objectToFormdata(category));
      router.push({
        name: "category",
      });
      return;
    }

    const data = await POST(`jnsproduk`, objectToFormdata(category));
    router.push({
      name: "category",
    });
  } catch (error) {}
}
</script>

<template>
  <div class="w-[500px] bg-white shadow-lg mb-5">
    <div class="bg-yellow-main py-4 px-5 rounded-t-md">
      <h1 v-if="idCategory" class="text-2xl font-bold font-poppins">Form Update kategori</h1>
      <h1 v-else class="text-2xl font-bold font-poppins">Form Tambah Kategori</h1>
    </div>
    <div class="p-5 flex flex-col gap-6">
        <InputField
          label="Kategori Madu"
          v-model="category.nm_jns_produk"
          placeholder="Masukan kategori Madu"
          typeInput="text"
          name="nmProduk"
        />
        <InputField
          label="keterangan"
          v-model="category.ket_jns_produk"
          placeholder="Masukan Keterangan"
          typeInput="text"
          name="qty"
        />
      <button
        @click="save"
        class="bg-yellow-main hover:bg-yellow-hover text-black font-bold py-2 px-4 rounded"
      >
        Kirim
      </button>
    </div>
  </div>
</template>
