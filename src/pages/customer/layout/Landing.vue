<script setup>
import Jbtr from "@/components/atom/JumboTron.vue";
import CardCategory from "@/components/atom/CardCategory.vue";
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardProduct from "../../../components/molecular/CardProduct.vue";
import {numberFormat} from '@/utils/NumberFormat'
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
  <body>
    <div >
      <Jbtr />
      <main class="px-10 py-10">
        <section id="category" class="flex flex-col gap-5">
          <h1 class="text-2xl font-poppins font-bold">Jenis Madu</h1>
          <div id="categories section" class="flex gap-5">
            <card-category
              v-for="category in categories"
              :key="category.id"
              :label="category.nm_jns_produk"
            />
          </div>
        </section>
        <section id="product" class="flex flex-col mt-10 gap-5">
          <h1 class="text-2xl font-poppins font-bold">Produk Madu</h1>
          <div id="categories section" class="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 grid-rows-1 overflow-hidden gap-5">
            <card-product
              v-for="product in products"
              :key="product.id"
              :title="product.nm_produk"
              :price="numberFormat(product.harga_jual)"
              :category="product.nm_jns_produk"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
            />
          </div>
        </section>
      </main>
    </div>
  </body>
</template>
