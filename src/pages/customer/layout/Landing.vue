<script setup>
import Jbtr from "@/components/atom/JumboTron.vue";
import CardCategory from "@/components/atom/CardCategory.vue";
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardProduct from "@/components/organism/CardProduct.vue";
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
const baseImageUrl = import.meta.env.VITE_APP_BASE_IMG_URL;
function goToProductByCategory(id) {
  router.push({
    name: "productByCategory",
    params: { idCategory: id },
  });
}
// function goToCategory() {
//   router.push({
//     name: "allCategory",
//   });
// }
// function goToListMadu() {
//   router.push({
//     name: "catalog",
//   });
// }

onMounted(() => {
  getProduct();
  getCategory();
  console.log(baseImageUrl);
});
</script>

<template>
  <body>
    <div>
      <Jbtr />
      <main class="px-5 pt-10">
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
            class="grid gap-10 grid-cols-1 md:gap-20 md:grid-cols-3  mx-auto lg:grid-flow-col justify-items-center content-center"
          >
            <card-product
              v-for="(product, index) in products.slice(0, 5)"
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
          </div>
          <h1 class="text-xl md:text-2xl font-bold capitalize text-center" v-else>product kosong atau jaringan bermasalah</h1>
        </section>
      </main>
    </div>
  </body>
</template>
