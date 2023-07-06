<script setup>
import { onMounted, reactive, ref } from "vue";
import InputField from "@/components/atom/InputField.vue";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const produk = reactive({
  id: null,
  nm_produk: "",
  qty_produk: null,
  id_jns_produk: null,
  harga_jual: null,
  harga_beli: null,
});
const errorMsg = ref("");
const { GET, POST } = Api();
async function getProductById() {
  try {
    const idProduct = route.params.product;
    if (!idProduct) {
      console.log("add");
      return;
    }

    const data = await GET(`produk/${idProduct}`);
    console.log("update");

    if (!data.data) {
      console.log("data tidak ditemukan");
      return;
    }

    Object.keys(data.data).forEach((key) => {
      produk[key] = data.data[key];
    });
  } catch (error) {}
}

onMounted(() => {
  getProductById();
});

async function save(id) {
  try {
    if (id != null) {
      await POST(`produk/${id}`, objectToFormdata(produk));
      router.push({
        name: "product",
      });
      return;
    }

    await POST(`produk`, objectToFormdata(produk));

    router.push({
      name: "product",
    });
  } catch (error) {
    console.error(error);
    errorMsg.value = "Input gagal";
  }
}
</script>

<template>
  <div class="w-[400px]">
    <div class="mb-6">
      <InputField
        label="Nama Madu"
        v-model="produk.nm_produk"
        placeholder="Masukan Nama Madu"
        typeInput="text"
        name="nmProduk"
      />
    </div>
    <div class="mb-6">
      <InputField
        label="Jumlah Produk"
        v-model="produk.qty_produk"
        placeholder="Masukan Jumlah Produk"
        typeInput="text"
        name="qty"
      />
    </div>
    <div class="mb-6">
      <InputField
        label="Jenis Madu"
        v-model="produk.id_jns_produk"
        placeholder="Pilih Jenis Madu"
        typeInput="text"
        name="category"
      />
    </div>
    <div class="mb-6">
      <InputField
        label="Harga Beli"
        v-model="produk.harga_beli"
        placeholder="Harga Beli "
        typeInput="text"
        name="buyingPrice"
      />
    </div>
    <div class="mb-6">
      <InputField
        label="Harga Jual"
        v-model="produk.harga_jual"
        placeholder="Harga Jual"
        typeInput="text"
        name="nmProduk"
      />
    </div>

    <button
      @click="save(produk.id)"
      class="bg-yellow-main hover:bg-yellow-hover text-black font-bold py-2 px-4 rounded"
    >
      Kirim
    </button>
  </div>
</template>
