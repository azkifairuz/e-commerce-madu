<script setup>
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardProduct from "@/components/organism/CardProduct.vue";
import { numberFormat } from "@/utils/NumberFormat";
import { useRoute, useRouter } from "vue-router";

const { GET } = Api();
const router = useRouter();
const products = ref("");
const category = ref("");
const route = useRoute();
const idCategory = route.params.idCategory;
const status = ref();
async function getCategory() {
  const data = await GET(`jnsproduk/${idCategory}`);
  if (!data.data) {
    console.log("data kosong");
    return;
  }
  category.value = data.data;
}
async function getProduct() {
  const data = await GET(`katproduk/${idCategory}`);
  if (data.data.length === 0) {
    status.value = `madu ${category.value.nm_jns_produk} kosong`;
    return;
  }
  status.value = `madu ${category.value.nm_jns_produk}`;
  products.value = data.data;
  console.log("product:",products.value);
}

const baseImageUrl =  import.meta.env.VITE_APP_BASE_IMG_URL;

onMounted(() => {
  getCategory();
  getProduct();
});
</script>

<template>
  <main class="p-6 mt-6">
    <header
      class="w-full bg-yellow-dark rounded-md text-black flex items-center justify-center h-[200px]"
    >
      <h1
        class="font-bold text-xl md:text-2xl lg:text-4xl capitalize text-center"
      >
        {{ status }}
      </h1>
    </header>
    <section class="mt-2 grid grid-cols-2 lg:grid-cols-5 gap-5">
      <CardProduct
        v-if="products != null"
        v-for="(product, index) in products"
        :key="index"
        :imageUrl="baseImageUrl + product.image"
        :title="product.nm_produk"
        :price="numberFormat(product.harga_jual)"
        :category="product.nm_jns_produk"
        :description="product.keterangan"
        :qty="parseInt(product.qty_produk)"
        :isReady="parseInt(product.qty_produk) > 0 ? true : false"
        :idProd="product.id"
      />
    </section>
  </main>
</template>
