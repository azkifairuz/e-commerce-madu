<script setup>
import { useRouter, useRoute } from "vue-router";
const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
  category: String,
  price: String,
  qty: Number,
  idProd: Number,
  isReady: Boolean,
});
const isProdReady = props["isReady"];
const isLogin = sessionStorage.getItem("isLogin");
const router = useRouter();
const route = useRoute();
function goToDetailProduct(id) {
  if (isLogin != "true") {
    router.push({
      name: "loginUser",
    });
    return;
  }
  if (!isProdReady) {
    return;
  }
  if (route.name == "detailProduct") {
    router.push({
      name: "detailProduct",
      params: { idProduct: id },
    });
    setTimeout(() => {
      location.reload();
    }, 10);
    return;
  }
  router.push({
    name: "detailProduct",
    params: { idProduct: id },
  });
}
</script>

<template>
  <div
    @click="goToDetailProduct(idProd)"
    :class="isProdReady ? 'cursor-pointer' : 'cursor-not-allowed'"
    class="w-full md:w-52 bg-white rounded-md p-2 flex flex-col gap-2 justify-start hover:shadow-lg"
  >
    <img :src="imageUrl" class="w-full bg-black h-48 object-scale-down" />
    <div class="px-6 py-4">
      <h1 class="font-bold text-xl mb-2">{{ title }}</h1>
      <p class="text-gray-500">
        Stok: <span class="font-bold">{{ qty }}</span>
      </p>
      <p class="mt-2 text-yellow-600 font-semibold">RP.{{ price }}</p>
      <p class="mt-2 text-sm text-gray-500">{{ category }}</p>
    </div>

    <span
      v-show="!isReady"
      class="inline-block mx-4 bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
      >habis</span
    >
  </div>
</template>
