<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "../config/api/Api";
const produks = ref('');
const api = Api();
const router = useRouter()
onMounted(() => {
  getKatProduk();
});
async function getKatProduk() {
  const produk = await api.GET("produk");
  produks.value = produk.data;
}
function goToEdit(id){
  router.push({
    name:'edit',
    params:{ produk: id}
  })
  console.log(id);
}
async function deleteProduct(id){
  await api.DELETE(`produk/${id}`)
}
</script>
<template>
  <div>
    <div class="kategori" v-for="produk in produks" :key="produk.id">
      <h2>{{ produk.nm_produk }}</h2>
      <p>{{ produk.qty_produk }}</p>
      <button @click="goToEdit(produk.id)">edit</button>
      <button @click="deleteProduct(produk.id)">delete</button>
    </div>
  </div>
</template>


