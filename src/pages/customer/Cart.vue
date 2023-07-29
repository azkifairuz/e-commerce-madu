<script setup>
import { onMounted, ref } from "vue";
import BtnComponent from "@/components/atom/BtnComponent.vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { numberFormat } from "@/utils/NumberFormat";
const { GET } = Api();
const router = useRouter();
const cartItem = ref();
const idUser = sessionStorage.getItem("sesIdUser");
async function getCart() {
  const data = await GET(`keranjang/${idUser}`);
  cartItem.value = data.data;
}
onMounted(() => {
  getCart();
});
function goToCheckout() {
  router.push({
    path: "payment",
  });
}

function CalculateSubTotal(qty,price){
    
    return numberFormat(qty * price)

}

function calculateTotalPrice() {
  let total = 0;
  if (!cartItem.value) {
    return "gagal"
  }
  for (const cart of cartItem.value) {
    total += parseInt(cart.qty) * parseInt(cart.harga);
  }
  return numberFormat(total);
}
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div
      class="w-[1026px] h-[503px] bg-white py-[38px] px-2 rounded-xl flex flex-col justify-between"
    >
      <header class="font-bold z-10 text-xl text-center">Keranjang</header>
      <div class="h-full flex flex-col gap-[32px] mt-[48px] overflow-y-auto">
        <div
          v-for="(cart, index) in cartItem "
          :key="index"
          
          class="card flex justify-between items-center"
        >
          <img
            src=""
            class="rounded-xl bg-black w-[150px] h-[100px] bg-no-repeat bg-cover"
            alt=""
          />
          <h1>{{ cart.nm_produk }}</h1>
          <h1>{{ cart.qty }}</h1>
          
          <p>Rp.{{ CalculateSubTotal(cart.qty,cart.harga) }}</p>
          <BtnComponent
            label="Hapus"
            primary-color="bg-red-500"
            hover-color="hover:bg-red-700"
            textColor="text-white"
          />
        </div>
      </div>
      <div class="self-end z-10 flex gap-[33px] items-center">
        <div class="text-center">
          <h1 class="text-base">Total(0 madu)</h1>
          <p class="font-bold text-xl">Rp.{{ calculateTotalPrice() }}</p>
        </div>
        <BtnComponent
          label="Checkout"
          @some-event="goToCheckout"
          primary-color="bg-btn-primary"
          hover-color="hover:bg-btn-hover"
          textColor="text-black"
        />
      </div>
    </div>
  </main>
</template>
