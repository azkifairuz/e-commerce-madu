<script setup>
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
const {GET} = Api();
const product = ref("")
async function getProduct(){

  const data = await GET('produk')
  product.value = data.data
  console.log(data.data);

}

onMounted(
()=>{
  getProduct()
}
)
</script>
<template>
  <main class="flex gap-5 px-10 ">
    <img
    class="w-[400px] h-[400px] rounded-lg " 
    src="https://dummyimage.com/400x400/000/fff"
    alt="">
    <div class="w-1/2">
      <h1 class="font-bold">title</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus alias aperiam sapiente possimus impedit in adipisci laboriosam magnam beatae eius nemo ex, deserunt accusantium modi consequatur iste obcaecati commodi reprehenderit.</p>
      <h1 class="font-bold">Harga</h1>
      <button>Beli</button>
    </div>
  </main>
 
</template>