<script setup>
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardCategory from "@/components/atom/CardCategory.vue";
import { useRouter } from "vue-router";

const { GET } = Api();
const categories = ref("");
async function getProduct() {
  try {
    const data = await GET("jnsproduk");
    categories.value = data.data;
  } catch (error) {
    categories.value = null;
  }
}
const router = useRouter()
function goToProductByCategory(id) {
  router.push({
    name: "productByCategory",
    params: { idCategory: id },
  });
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
        List Kategori Madu
      </h1>
    </header>
    <section class="mt-2 grid grid-cols-2 lg:grid-cols-5 gap-5">
      <card-category
        v-if="categories != null"
        v-for="category in categories"
        :key="category.id"
        @kategoriList="goToProductByCategory(category.id)"
        :label="category.nm_jns_produk"
      />
      <h1 v-else>categori kosong atau jaringan bermasalah</h1>
    </section>
  </main>
</template>
