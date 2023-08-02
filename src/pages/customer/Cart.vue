<script setup>
import { onMounted, ref, reactive } from "vue";
import BtnComponent from "@/components/atom/BtnComponent.vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { numberFormat } from "@/utils/NumberFormat";
import MidtransClient from "midtrans-client";
const { GET, DELETE, POST } = Api();
const router = useRouter();
const cartItem = ref();
const idUser = sessionStorage.getItem("sesIdUser");
const dateNow = new Date().toISOString().split("T")[0];

const order = reactive({
  id: null,
  no_nota: null,
  id_pelanggan: idUser,
  tgl: dateNow,
});

const detailOrder = reactive({
  id: null,
  id_pemesanan: order.id,
  id_produk: "",
  qty: null,
  harga: null,
});

async function getCart() {
  const data = await GET(`keranjang/${idUser}`);
  if (data.data.length == 0) {
    console.log("cart kosong");
    return;
  }
  cartItem.value = data.data;
}

async function deleteCartitem(id) {
  const iskeranjang = await GET(`keranjang/${idUser}`);
  if (iskeranjang.data.length == 1) {
    await DELETE(`keranjangbelanja/${iskeranjang.data[0].idKeranjang}`);
    await DELETE(`detailkeranjangbelanja/${id}`);
    setTimeout(() => {
      location.reload();
    }, 10);
    return;
  }

  await DELETE(`detailkeranjangbelanja/${id}`);
  setTimeout(() => {
    location.reload();
  }, 10);
}

async function checkout() {

  const idKeranjangArray = cartItem.value[0].idKeranjang;
  const data = await GET(`chackout/${idUser}`, {});
  console.log(data.data);
  router.push({
    path: "payment",
  });
}
function goToHome() {
  router.push({
    name: "madu",
  });
}

function CalculateSubTotal(qty, price) {
  return numberFormat(qty * price);
}

function calculateTotalPrice() {
  let total = 0;
  if (!cartItem.value) {
    return 0;
  }
  for (const cart of cartItem.value) {
    total += parseInt(cart.qty) * parseInt(cart.harga);
  }
  return numberFormat(total);
}
const baseImageUrl = "http://127.0.0.1:8000/storage/produk/";

onMounted(() => {
  getCart();
});
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div
      class="w-[1026px] h-[503px] bg-white py-[38px] px-2 rounded-xl flex flex-col justify-between"
    >
      <header class="font-bold z-10 text-xl text-center">Keranjang</header>
      <div class="h-full flex flex-col gap-[32px] mt-[48px] overflow-y-auto">
        <h1 v-show="!cartItem" class="text-2xl text-center">
          Keranjang Masih Kosong
        </h1>
        <div
          v-for="(cart, index) in cartItem"
          :key="index"
          class="card flex justify-between items-center"
        >
          <img
            :src="baseImageUrl + cart.image"
            class="rounded-xl bg-black w-[150px] h-[100px] bg-no-repeat bg-cover"
            alt=""
          />
          <h1 class="font-bold w-32 capitalize">{{ cart.nm_produk }}</h1>
          <h1>{{ cart.qty }}</h1>

          <p>Rp.{{ CalculateSubTotal(cart.qty, cart.harga) }}</p>
          <BtnComponent
            label="Hapus"
            primary-color="bg-red-500"
            hover-color="hover:bg-red-700"
            textColor="text-white"
            @some-event="deleteCartitem(cart.idDetKeranjang)"
          />
        </div>
      </div>
      <div class="self-end z-10 flex gap-[33px] items-center">
        <div class="text-center">
          <h1 class="text-base">Total(0 madu)</h1>
          <p class="font-bold text-xl">Rp.{{ calculateTotalPrice() }}</p>
        </div>
        <BtnComponent
          v-show="!cartItem"
          label="halaman belanja"
          @some-event="goToHome"
          primary-color="bg-btn-primary"
          hover-color="hover:bg-btn-hover"
          textColor="text-black"
        />
        <BtnComponent
          v-show="cartItem"
          label="Checkout"
          @some-event="checkout"
          primary-color="bg-btn-primary"
          hover-color="hover:bg-btn-hover"
          textColor="text-black"
        />
      </div>
    </div>
  </main>
</template>
