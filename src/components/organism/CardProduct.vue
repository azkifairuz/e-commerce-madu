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
    <img :src="imageUrl" class="w-full bg-black h-48 object-cover" />
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

    <div class="flex mt-auto">
      <button
        class="px-5 py-2 text-black hover:bg-btn-hover bg-btn-primary w-full emnd justify-self-end"
      >
        Beli
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-10 h-10"
      >
        <path
          fill-rule="evenodd"
          d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>
