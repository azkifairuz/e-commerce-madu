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
const baseImageUrl = "http://127.0.0.1:8000/storage/produk/"
function goToProductByCategory(id) {
  router.push({
    name: "productByCategory",
    params: { idProduct: id },
  });
}
function goToDetailProduct(id) {
  router.push({
    name: "detailProduct",
    params: {idProduct:id}
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
          <h1 class="text-2xl font-poppins font-bold">Jenis Madu</h1>
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
          <h1 class="text-2xl font-poppins font-bold">Produk Madu</h1>
          <div
            id="categories section"
            class="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 grid-rows-1 overflow-hidden gap-5"
          >
            <card-product
              v-if="products != null"
              v-for="product in products"
              :key="product.id"
              :imageUrl="baseImageUrl+product.image"
              :title="product.title"
              :price="numberFormat(product.harga_jual)"
              :category="product.nm_jns_produk"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
              @goToDetail = "goToDetailProduct(product.id)"
            />
            <h1 v-else>product kosong atau jaringan bermasalah</h1>
          </div>
        </section>
      </main>
    </div>
  </body>
</template>
