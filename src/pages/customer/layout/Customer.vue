<script setup>
import Navbar from "@/components/organism/Navbar.vue";
import Jbtr from "@/components/atom/JumboTron.vue";
import CardCategory from "@/components/atom/CardCategory.vue";
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";

const categories = ref("");
const { GET } = Api();

async function getCategory() {
  const data = await GET("jnsproduk");
  categories.value = data.data;
}

onMounted(() => {
  getCategory();
});
</script>
<template>
  <body>
    <Navbar />
    <div>
      <Jbtr />
      <main class="px-10 py-10">
        <section class="flex flex-col gap-5 ">
        <h1 class="text-2xl font-poppins font-bold ">Jenis Madu</h1>
        <div id="categories section" class="flex gap-5">
          <card-category
            v-for="category in categories"
            :key="category.id"
            :label="category.nm_jns_produk"
          />
        </div>
      </section>

      <router-view></router-view>
      </main>
      
    </div>
  </body>
</template>
