<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
  category: String,
  price: String,
  idProd:Number,
});
const isLogin = sessionStorage.getItem("isLogin");
const router = useRouter();

function goToDetailProduct(id) {
  if (isLogin != "true" ) {
    router.push({
    name: "loginUser",
  });
  return
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
    class="max-w-md bg-white rounded-md  overflow-hidden w-60 cursor-pointer p-2 hover:shadow-lg"
  >
    <img
      :src="imageUrl"
      class="w-full bg-black h-48 object-cover"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 line-clamp-1 hover:">{{ title }}</div>
      <p class="text-gray-700 text-base line-clamp-2 overflow-ellipsis">
        {{ description }}
      </p>
    </div>
    <div class="px-4 flex justify-between pt-4 pb-2">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >{{ category }}</span
      >
      <span
        class="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
        >Rp.{{ price }}</span
      >
    </div>
    <div class="px-6">
      <!-- <btnComponent
        label=""
        primary-color="bg-yellow-500 "
        hover-color="hover:bg-yellow-700"
        text-color="text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-6"
        >
          <path
            d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
          />
        </svg>
      </btnComponent> -->
    </div>
  </div>
</template>
