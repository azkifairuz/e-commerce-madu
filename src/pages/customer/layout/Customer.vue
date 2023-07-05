<script setup>
import Navbar from "@/components/organism/Navbar.vue";
import Jbtr from "@/components/atom/JumboTron.vue";
import LabelCategory from "@/components/atom/labelCategory.vue";
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
  <main>
    <Navbar />
    <div>
      <Jbtr />
      <div class="px-10 my-10 flex gap-5">
        <label-category  v-for="category in categories" :key="category.id" :label="category.nm_jns_produk" />
      </div>
      <router-view></router-view>
    </div>
  </main>
</template>
