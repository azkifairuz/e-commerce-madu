<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import Api from "../config/api/Api";

const route = useRoute();
const produk = reactive({
  id: "",
  nm_produk: "",
  qty_produk: null,
  id_jns_produk: null,
  harga_jual: null,
  harga_beli: null,
});
const { GET, PUT } = Api();

async function getProductById() {
  const idProduct = route.params.produk;

  const data = await GET(`produk/${idProduct}`);
  console.log(data.data);
  if (!data.data) {
    console.log("data tidak ditemukan");
    return;
  }
  Object.keys(data.data).forEach((key) => {
    produk[key] = data.data[key];
  });
}
async function save(idProduct) {
  const data = await PUT(`produk/${idProduct}`,produk)
  console.log(data.data);
}

onMounted(() => {
  getProductById();
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>id jenis barang</h1>
    <input
      type="text"
      v-model="produk.id_jns_produk"
      class="border border-b-2"
    />
    <h1>Nama Produk</h1>
    <input type="text" v-model="produk.nm_produk" class="border border-b-2" />
    <h1>qty</h1>
    <input type="text" v-model="produk.qty_produk" class="border border-b-2" />
    <h1>harga beli</h1>
    <input type="text" v-model="produk.harga_jual" class="border border-b-2" />
    <h1>harga jual</h1>
    <input type="text" v-model="produk.harga_beli" class="border border-b-2" />
    <button type="button" @click="save(produk.id)">save</button>
  </div>
</template>
