<script setup>
import { onMounted, ref, reactive } from "vue";
import BtnComponent from "@/components/atom/BtnComponent.vue";
import { useRouter } from "vue-router";
import Api from "@/config/api/Api";
import { numberFormat } from "@/utils/NumberFormat";
const { GET, DELETE, POST } = Api();
const router = useRouter();
const cartItem = ref();
const idPelanggan = sessionStorage.getItem("sesIdPelanggan");
const dateNow = new Date().toISOString().split("T")[0];

const order = reactive({
  id: null,
  no_nota: null,
  id_pelanggan: idPelanggan,
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
  const data = await GET(`keranjang/${idPelanggan}`);
  if (data.data.length == 0) {
    return;
  }
  cartItem.value = data.data;
}

async function deleteCartitem(id) {
  const iskeranjang = await GET(`keranjang/${idPelanggan}`);
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
  if (!cartItem.value) {
    console.log("kosong");
    return
  }
  const data = await GET(`chackout/${idPelanggan}`);
  router.push({
    name: "payment",
    params: { invoice: data.noNota },
  });
}
function goToHome() {
  router.push({
    name: "catalog",
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
function calculateTotalQty() {
  let totalQty = 0;
  if (!cartItem.value) {
    return 0;
  }
  for (const cart of cartItem.value) {
    totalQty += parseInt(cart.qty);
  }
  return totalQty;
}
const baseImageUrl = import.meta.env.VITE_APP_BASE_IMG_URL;

onMounted(() => {
  getCart();
});
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div
      class="w-full md:w-[1026px] h-full md:h-[503px] bg-white py-[38px] px-2 rounded-xl flex flex-col justify-between"
    >
      <header class="font-bold z-10 text-xl text-center">Keranjang</header>
      <div class="h-full flex flex-col gap-[32px] mt-[48px] overflow-y-auto">
        <h1 v-show="!cartItem" class="text-2xl text-center">
          Keranjang Masih Kosong
        </h1>
        <div
          v-for="(cart, index) in cartItem"
          :key="index"
          class="text-center flex justify-evenly items-center"
        >
          <img
            :src="baseImageUrl + cart.image"
            class="rounded-xl bg-black w-[150px] h-[100px] bg-no-repeat bg-cover"
            alt=""
          />

          <div
            class="flex flex-col md:flex-row justify-evenly md:gap-10 items-center"
          >
            <p class="font-bold w-32 capitalize">{{ cart.nm_produk }}</p>
            <div class="flex gap-2 justify-evenly md:gap-5">
              <p>{{ cart.qty }}</p>
              <p class="font-bold">x</p>
              <p>Rp.{{ numberFormat(cart.harga) }}</p>
            </div>
            <p class="font-bold">=</p>
            <p class="font-bold">
              Rp.{{ CalculateSubTotal(cart.qty, cart.harga) }}
            </p>
          </div>
          <BtnComponent
            label="Hapus"
            primary-color="bg-red-500"
            hover-color="hover:bg-red-700"
            textColor="text-white"
            @some-event="deleteCartitem(cart.idDetKeranjang)"
          />
        </div>
      </div>
      <div class="px-2 justify-between z-10 flex gap-[33px] items-center">
        <BtnComponent
          label="Lanjut Belanja"
          @some-event="goToHome"
          primary-color="bg-btn-primary"
          hover-color="hover:bg-btn-hover"
          textColor="text-black"
        />
        <div class="flex gap-[33px]">
          <div class="text-center">
            <h1 class="text-base">Total({{ calculateTotalQty() }} madu)</h1>
            <p class="font-bold text-xl">Rp.{{ calculateTotalPrice() }}</p>
          </div>
          <Button
            @click="checkout"
            :class="
              cartItem
                ? 'bg-btn-primary cursor-pointer hover:bg-btn-hover'
                : 'bg-yellow-200 cursor-not-allowed'
            "
            class="rounded-[4px] flex justify-center text-center gap-2 items-center px-5 py-3"
          >
            {{ cartItem ? "Checkout" : "Masih Kosong" }}
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>
