<script setup>
import Jbtr from "@/components/atom/JumboTron.vue";
import CardCategory from "@/components/atom/CardCategory.vue";
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardProduct from "@/components/organism/CardProduct.vue";
import { numberFormat } from "@/utils/NumberFormat";
import { useRouter } from "vue-router";
import Footer from "./Footer.vue";
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
      <main class="px-5 pt-10">
        <section
          id="pamer"
          class="bg-yellow-secondary py-10 p-6 rounded-lg mb-12"
        >
          <div class="container mx-auto">
            <div class="grid grid-cols-1 gap-5 items-center md:grid-cols-3">
              <div class="flex flex-col gap-4 items-center">
                <img
                  class="w-24"
                  src="data:image/png;base64,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"
                  alt="image 1"
                />
                <p class="text-[#CF9443]">Teruji BPOM</p>
              </div>
              <div class="flex flex-col gap-4 items-center">
                <img
                  class="w-24"
                  src="data:image/png;base64,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"
                  alt="image 2"
                />
                <p class="text-[#CF9443]">Teruji BPOM</p>
              </div>
              <div class="flex flex-col gap-4 items-center">
                <img class="w-24" src="/assets/blokmadu.png" alt="image 3" />
                <p class="text-[#CF9443]">Teruji BPOM</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="category"
          class="bg-yellow-secondary p-6 rounded-lg mb-12 flex flex-col gap-5"
        >
          <div class="w-full flex justify-center items-center">
            <h1
              class="text-2xl font-poppins font-bold text-center text-[#C17E5C]"
            >
              Kategori Teratas
            </h1>
          </div>
          <div
            v-if="categories != null"
            id="categories section"
            class="grid gap-10 md:gap-20 grid-cols-2 mx-auto md:grid-cols-5 justify-items-center content-center"
          >
            <card-category
              v-for="category in categories.slice(0, 5)"
              :key="category.id"
              @kategoriList="goToProductByCategory(category.id)"
              :label="category.nm_jns_produk"
            />
          </div>
          <h1 class="text-center font-bold  text-xl md:text-2xl capitalize w-full" v-else>
            categori kosong atau jaringan bermasalah
          </h1>
        </section>
        <section
          id="product"
          class="bg-yellow-secondary p-6 rounded-lg mb-12 flex flex-col gap-5"
        >
          <div class="w-full flex justify-center items-center">
            <h1
              class="text-2xl font-poppins font-bold text-center text-[#C17E5C]"
            >
              Madu Teratas
            </h1>
          </div>
          <div
            v-if="products != null"
            id="product section "
            class="grid gap-10 grid-cols-1 md:gap-20 md:grid-cols-3  mx-auto lg:grid-cols-5 justify-items-center content-center"
          >
            <card-product
              v-for="(product, index) in products.slice(0, 5)"
              :key="index"
              :imageUrl="baseImageUrl + product.image"
              :title="product.nm_produk"
              :price="numberFormat(product.harga_jual)"
              :category="product.nm_jns_produk"
              :description="product.keterangan"
              :qty="product.qty_produk"
              :isReady="product.qty_produk > 0 ? true : false"
              :idProd="product.id"
            />
          </div>
          <h1 class="text-xl md:text-2xl font-bold capitalize text-center" v-else>product kosong atau jaringan bermasalah</h1>
        </section>
      </main>
    </div>
  </body>
</template>
