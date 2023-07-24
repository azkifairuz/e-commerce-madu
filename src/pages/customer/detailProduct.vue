<script setup>
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import CardProduct from "@/components/molecular/CardProduct.vue";
import {numberFormat} from "@/utils/NumberFormat"
const { GET } = Api();
const products = ref("");
async function getProduct() {
  const data = await GET("produk");
  products.value = data.data;
}
onMounted(() => {
  getProduct();
});
const baseImageUrl = "http://127.0.0.1:8000/storage/produk/"
const quantity = ref(1);
function addQuantity() {
  return quantity.value =  quantity.value+1
  
}

</script>
<template>
  <main class="px-10 py-10 flex flex-col gap-10">
    <div class="flex gap-5">
      <img
        class="w-[400px] h-[400px] rounded-lg"
        src="https://dummyimage.com/400x400/000/fff"
        alt=""
      />
      <div class="w-1/2 flex flex-col justify-evenly">
        <div>
          <h1 class="font-bold">title</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
            alias aperiam sapiente possimus impedit in adipisci laboriosam
            magnam beatae eius nemo ex, deserunt accusantium modi consequatur
            iste obcaecati commodi reprehenderit.
          </p>
        </div>
        <div>
          <h1>kuantitas</h1>
          <div class="flex gap-2">
            <button class="w-5 h-5 text-center bg-gray-400 p-1 flex justify-center items-center">-</button>
            <input type="text" class="w-10 h-5 text-center" v-model="quantity" />
            <button @click="addQuantity" class="w-5 h-5 bg-gray-400 text-center p-1  flex justify-center items-center">+</button>
          </div>
        </div>
        <div>
          <h1 class="font-bold">Harga</h1>
          <button
            class="bg-btn-primary hover:bg-btn-hover border border-black rounded-lg px-5 py-2"
          >
            Beli
          </button>
        </div>
      </div>
    </div>
    <section class="">
      <h1 class="font-bolc text-2xl">Produk Lainya</h1>
      <div class="grid grid-rows-1 grid-cols-5 overflow-hidden">
        <card-product
          v-if="products != null"
          v-for="product in products"
          :key="product.id"
          :imageUrl="baseImageUrl + product.image"
          :title="product.title"
          :price="numberFormat(product.harga_jual)"
          :category="product.nm_jns_produk"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
        />
        <h1 v-else>product kosong atau jaringan bermasalah</h1>
      </div>
    </section>
  </main>
</template>
