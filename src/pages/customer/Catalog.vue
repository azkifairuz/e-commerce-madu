<script setup>
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import { numberFormat } from "@/utils/NumberFormat";
import CardProduct from "@/components/organism/CardProduct.vue";

const baseImageUrl =  import.meta.env.VITE_APP_BASE_IMG_URL;
const { GET } = Api();
const products = ref("");
async function getProduct() {
  try {
    const data = await GET("produk");
    products.value = data.data;
  } catch (error) {
    products.value = null;
  }
}
onMounted(() => {
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
        LIST MADU
      </h1>
    </header>
    <section class="mt-10 grid grid-cols-1 md:grid-cols-3 overflow-x-scroll content-center justify-items-center lg:grid-cols-5 gap-5">
      <CardProduct
        v-if="products != null"
        v-for="product in products"
        :key="product.id"
        :imageUrl="baseImageUrl + product.image"
        :title="product.nm_produk"
        :price="numberFormat(product.harga_jual)"
        :category="product.nm_jns_produk"
        :description="product.keterangan"
        :idProd="product.id"
        :qty="parseInt(product.qty_produk)"
        :isReady="parseInt(product.qty_produk) > 0 ? true:false"
      />
    </section>
  </main>
</template>
