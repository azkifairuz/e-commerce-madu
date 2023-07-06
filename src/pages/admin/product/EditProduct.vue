<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import ProductForm from "@/components/molecular/ProductForm.vue";
const produk = reactive({
  id:null,
  nm_produk: "",
  qty_produk: null,
  id_jns_produk: null,
  harga_jual: null,
  harga_beli: null,
});
const {GET, POST } = Api();
const route = useRoute();

async function getProductById() {
  const idProduct = route.params.product;

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
onMounted(
  ()=>{
    getProductById()
  }
)
async function save(idProduct) {
  const data = await POST(`produk/${idProduct}`, objectToFormdata(produk));
  console.log(data);
}
</script>

<template>
<ProductForm />
</template>
