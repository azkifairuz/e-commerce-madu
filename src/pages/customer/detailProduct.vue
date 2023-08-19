<script setup>
import Api from "@/config/api/Api";
import { onMounted, reactive, ref } from "vue";
import CardProduct from "@/components/organism/CardProduct.vue";
import { numberFormat } from "@/utils/NumberFormat";
import { objectToFormdata } from "@/utils/ObjectToForm";
import BtnComponent from "@/components/atom/BtnComponent.vue";
import { useRoute, useRouter } from "vue-router";

const { GET, POST } = Api();
const products = ref("");
const route = useRoute();
const router = useRouter();
const idUser = sessionStorage.getItem("sesIdUser");
const idPelanggan = sessionStorage.getItem("sesIdPelanggan");
const idProduct = route.params.idProduct;
const dateNow = new Date().toISOString().split("T")[0];
const product = reactive({
  id: null,
  nm_produk: "",
  qty_produk: "",
  id_jns_produk: null,
  harga_jual: null,
  harga_beli: null,
  keterangan: null,
  image: null,
});

const cart = reactive({
  id: null,
  id_pelanggan: idPelanggan,
  tgl: dateNow,
});
console.log(idUser);
const detailCart = reactive({
  id: null,
  id_keranjang_belanja: null,
  id_pelanggan: idPelanggan,
  id_produk: idProduct,
  qty: 1,
  harga: product.harga_jual,
});

async function getProduct() {
  const data = await GET("produk");
  products.value = data.data;
}

async function getProductById() {
  const data = await GET(`produk/${idProduct}`);
  detailCart.harga = data.data.harga_jual;
  Object.keys(data.data).forEach((key) => {
    product[key] = data.data[key];
  });
}

onMounted(() => {
  getProduct();
  getProductById();
});

const baseImageUrl = "http://127.0.0.1:8000/storage/produk/";
function addQuantity() {
  if (detailCart.qty >= product.qty_produk) {
    return;
  }
  return (detailCart.qty = detailCart.qty + 1);
}
const isPopup = ref(false);
function popUphandle() {
  isPopup.value = !isPopup.value;
}
function decreaseQuantity() {
  if (detailCart.qty <= 0) {
    return;
  }
  return (detailCart.qty = detailCart.qty - 1);
}
async function addToCart() {
  const iskeranjang = await GET(`keranjang/${idPelanggan}`);
  if (iskeranjang.data.length == 0) {
    popUphandle();
    const data = await POST("keranjangbelanja", objectToFormdata(cart));
    const lastId = data.lastId;

    detailCart.id_keranjang_belanja = lastId;
    await POST("detailkeranjangbelanja", objectToFormdata(detailCart));

    product.qty_produk = product.qty_produk - detailCart.qty;
    await POST(`produk/${idProduct}`, objectToFormdata(product));
    return;
  }

  popUphandle();
  detailCart.id_keranjang_belanja = iskeranjang.data[0].idKeranjang;
  await POST("detailkeranjangbelanja", objectToFormdata(detailCart));
  product.qty_produk = product.qty_produk - detailCart.qty;
  await POST(`produk/${idProduct}`, objectToFormdata(product));
}
async function buy() {
  const iskeranjang = await GET(`keranjang/${idPelanggan}`);
  if (iskeranjang.data.length == 0) {
    const data = await POST("keranjangbelanja", objectToFormdata(cart));
    const lastId = data.lastId;
    detailCart.id_keranjang_belanja = lastId;
    await POST("detailkeranjangbelanja", objectToFormdata(detailCart));
    product.qty_produk = product.qty_produk - detailCart.qty;
    await POST(`produk/${idProduct}`, objectToFormdata(product));
    router.push({
      name: "cart",
    });
    return;
  }

  detailCart.id_keranjang_belanja = iskeranjang.data[0].idKeranjang;
  await POST("detailkeranjangbelanja", objectToFormdata(detailCart));
  product.qty_produk = product.qty_produk - detailCart.qty;
  await POST(`produk/${idProduct}`, objectToFormdata(product));
  router.push({
    name: "cart",
  });
}
</script>
<template>
  <div
    :class="isPopup ? 'flex' : 'hidden'"
    class="w-screen flex fixed justify-center items-center h-screen bg-black bg-opacity-50 z-10"
  >
    <div class="w-[500px] rounded-lg bg-white">
      <header
        class="w-full font-bold text-xl flex justify-between items-center p-5 bg-yellow-main rounded-t-lg"
      >
        <h1>Info</h1>
        <span @click="popUphandle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </header>
      <div class="p-5">Berhasil Masuk Keranjang</div>
      <footer class="px-5 py-1 flex justify-end w-full"></footer>
    </div>
  </div>
  <main class="px-4 py-4 md:px-10 md:py-10 flex flex-col gap-10">
    <div
      class="flex flex-col bg-white rounded-lg p-10 gap-10 md:flex-row md:gap-10"
    >
      <img
        class="w-full border md:w-1/2 h-[400px] rounded-lg"
        :src="baseImageUrl + product.image"
        alt=""
      />
      <div class="w-full md:w-1/2 flex flex-col gap-5">
        <h1 class="text-5xl capitalize text-gray-950 font-poppins">
          {{ product.nm_produk }}
        </h1>
        <h1 class="text-4xl">Rp.{{ numberFormat(product.harga_jual) }}</h1>
        <h1 class="text-2xl text-gray-700">
          Stok: <span>{{ detailCart.qty }}</span>
        </h1>
        <div class="mt-auto">
          <h1 class="text-xl font-semibold capitalize text-gray-900">
            kuantitas
          </h1>
          <div class="flex gap-2">
            <button
              @click="decreaseQuantity"
              :class="
                detailCart.qty === 0 ? ' cursor-not-allowed' : 'cursor-pointer'
              "
              class="w-10 h-10 text-center bg-yellow-main rounded-md p-1 flex justify-center items-center"
            >
              -
            </button>
            <input
              readonly
              type="text"
              class="w-20 h-10 text-center rounded-md border-2 p-2 border-yellow-light outline-none"
              v-model="detailCart.qty"
            />
            <button
              @click="addQuantity"
              :class="
                detailCart.qty >= product.qty_produk
                  ? ' cursor-not-allowed'
                  : 'cursor-pointer'
              "
              class="w-10 h-10 bg-yellow-main rounded-md text-center p-1 flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <div class="w-full mt-auto">
          <div class="flex gap-2 w-full">
            <div class="w-1/2">
              <BtnComponent
                label="Beli"
                @someEvent="buy"
                primary-color="bg-yellow-500 "
                hover-color="hover:bg-yellow-700"
                text-color="text-black"
              />
            </div>
            <BtnComponent
              label=""
              @someEvent="addToCart"
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
            </BtnComponent>
          </div>
        </div>
      </div>
    </div>
    <section class="">
      <h1 class="font-bolc text-2xl">Produk Lainya</h1>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <card-product
          v-if="products != null"
          v-for="(product, index) in products.slice(0, 5)"
          :key="index"
          :imageUrl="baseImageUrl + product.image"
          :title="product.nm_produk"
          :price="numberFormat(product.harga_jual)"
          :category="product.nm_jns_produk"
          :description="product.keterangan"
          :idProd="product.id"
          :qty="product.qty_produk"
          :isReady="product.qty_produk > 0 ? true : false"
        />
        <h1 v-else>product kosong atau jaringan bermasalah</h1>
      </div>
    </section>
  </main>
</template>
