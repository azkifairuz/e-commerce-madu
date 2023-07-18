<script setup>
import Navbar from "@/components/organism/Navbar.vue";
import Jbtr from "@/components/atom/JumboTron.vue";
import CardCategory from "@/components/atom/CardCategory.vue";
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardProduct from "@/components/molecular/CardProduct.vue";
import dummy from "@/assets/honey-jar.png"
import {numberFormat} from '@/utils/NumberFormat'
import { RouterView } from "vue-router";
const categories = ref("");
const products = ref("");
const { GET } = Api();

async function getCategory() {
  const data = await GET("jnsproduk");
  categories.value = data.data;
}
async function getProduct() {
  const data = await GET("produk");
  products.value = data.data;
}

onMounted(() => {
  getProduct();
  getCategory();
});
</script>
<template>
  <Navbar />
  <main class="py-10">
      <RouterView/>
  </main>
</template>
