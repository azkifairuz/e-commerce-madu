<script setup>
import Jbtr from "@/components/atom/JumboTron.vue";
import CardCategory from "@/components/atom/CardCategory.vue";
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardProduct from "@/components/molecular/CardProduct.vue";
import { numberFormat } from "@/utils/NumberFormat";
import { useRouter } from "vue-router";
const categories = ref("");
const products = ref("");
const router = useRouter();
const { GET } = Api();
async function getCategory() {
  try {
    const data = await GET("jnsproduk");
    categories.value = data.data;
  } catch (error) {
    categories.value = null;
  }
}
async function getProduct() {
  try {
    const data = await GET("produk");
    products.value = data.data;
  } catch (error) {
    products.value = null;
  }
}
const baseImageUrl = "http://127.0.0.1:8000/storage/produk/";
function goToProductByCategory(id) {
  router.push({
    name: "productByCategory",
    params: { idCategory: id },
  });
}
function goToCategory() {
  router.push({
    name: "allCategory",
  });
}
function goToListMadu() {
  router.push({
    name: "catalog",
  });
}


onMounted(() => {
  getProduct();
  getCategory();

});
</script>

<template>
  <body>
    <div>
      <Jbtr />
      <main class="px-10 py-10">
        <section id="category" class="flex flex-col gap-5">
          <div  class="w-full flex justify-between">
            <h1 class="text-2xl font-poppins font-bold">Jenis Madu</h1>
            <h1 @click="goToCategory" class="text-2xl cursor-pointer text-blue-400">Lihat Semua-></h1>
          </div>
          <div id="categories h-40 section" class="flex gap-5">
            <card-category
              v-if="categories != null"
              v-for="category in categories"
              :key="category.id"
              @kategoriList="goToProductByCategory(category.id)"
              :label="category.nm_jns_produk"
            />
            <h1 v-else>categori kosong atau jaringan bermasalah</h1>
          </div>
        </section>
        <section id="product" class="flex flex-col mt-10 gap-5">
          <div class="w-full flex justify-between">
            <h1 class="text-2xl font-poppins font-bold">Madu </h1>
            <h1 @click="goToListMadu" class="text-2xl cursor-pointer text-blue-400">Lihat Semua-></h1>
          </div>
          <div
            id="categories section "
            class="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 grid-rows-1 overflow-hidden gap-5"
          >
            <card-product
              v-if="products != null"
              v-for="(product, index) in products.slice(0, 5)"
              :key="index"
              :imageUrl="baseImageUrl + product.image"
              :title="product.nm_produk"
              :price="numberFormat(product.harga_jual)"
              :category="product.nm_jns_produk"
              :description="product.keterangan"
              :qty="product.qty_produk"
              :isReady="product.qty_produk > 0 ? true:false"
              :idProd="product.id"
            />
            <h1 v-else>product kosong atau jaringan bermasalah</h1>
          </div>
        </section>
      </main>
    </div>
  </body>
</template>
