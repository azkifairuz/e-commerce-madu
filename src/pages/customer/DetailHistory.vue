<script setup>
import BtnComponent from "@/components/atom/BtnComponent.vue";
import Api from "@/config/api/Api";
import { useRoute } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { objectToData } from "@/utils/ObjectToData";
import { numberFormat } from "@/utils/NumberFormat";

const { GET } = Api();
const route = useRoute();
const invoice = ref("");
const customers = reactive({
  nm_pelanggan: "",
  nik: null,
  alamat_pelanggan: "",
  tgl_lahir: "",
  tmp_lahir: "",
  jns_kelamin: "",
  email: "",
  no_telp: "",
});
const image = route.params.image
const nota = route.params.nota;
const status = route.params.status;
const idPelanggan = sessionStorage.getItem("sesIdPelanggan");
const baseImageUrl = import.meta.env.VITE_APP_BASE_IMG_URL;

async function getPayment() {
  const data = await GET(`detailpemesanan/${nota}`);
  // objectToData(invoice, data);
  invoice.value = data.data;
  console.log(invoice.value);
}

async function getPelanggan() {
    const user = await GET(`pelanggan/${idPelanggan}`);
    objectToData(customers, user);
}

function CalculateSubTotal(qty, price) {
  return numberFormat(qty * price);
}

function calculateTotalPrice() {
  let total = 0;
  if (!invoice.value) {
    return 0;
  }
  for (const item of invoice.value) {
    total += parseInt(item.qty) * parseInt(item.harga);
  }
  return numberFormat(total);
}


onMounted(() => {
  getPelanggan();
  getPayment();
});
</script>
<template>
  <main class="flex flex-col justify-center my-20 lg:flex-row gap-5">
    <aside class="bg-white mx-auto lg:mx-0 rounded-md  w-full md:w-1/2 lg:w-1/4 p-5">
      <h1 class="text-xl font-bold capitalize">Detail Tagihan</h1>
      <div class="px-2 mt-2 flex flex-col gap-5">
        <span class="bg-slate-100 p-2 rounded-md">
          <h1 class="font-bold">Nota</h1>
          <p>{{ nota }}</p>
        </span>
        <span class="bg-slate-100 p-2 rounded-md">
          <h1 class="font-bold">Nama Penerima</h1>
          <p>{{ customers.nm_pelanggan }}</p>
        </span>
        <span class="bg-slate-100 p-2 rounded-md">
          <h1 class="font-bold">Email</h1>
          <p>{{ customers.email }}</p>
        </span>
        <span class="bg-slate-100 p-2 rounded-md">
          <h1 class="font-bold">Telepon</h1>
          <p>{{ customers.no_telp }}</p>
        </span>
        <span class="bg-slate-100 p-2 rounded-md">
          <h1 class="font-bold">Alamat</h1>
          <p>{{ customers.alamat_pelanggan }}</p>
        </span>
      </div>
    </aside>

    <aside class="bg-white rounded-md mx-auto lg:mx-0   w-full md:w-1/2 lg:w-1/4 p-5 flex flex-col justify-between">
      <h1 class="text-xl font-bold capitalize">Pesanan</h1>
      <div class="px-2 mt-2 flex flex-col gap-5 overflow-y-scroll mb-2">
        <span v-for="(item, index) in invoice" :key="index" class="flex gap-4">
          <img
            class="w-12 h-12 border bg-black rounded-sm"
            :src="baseImageUrl + item.image"
            alt=""
          />
          <div>
            <h1 class="font-semibold">{{ item.nm_produk }}</h1>
            <p class="text-gray-400">
              Rp.{{ numberFormat(item.harga) }} x
              <span class="font-semibold">{{ item.qty }}</span>
            </p>
          </div>
          <span class="self-end ml-auto">
            Rp.{{ CalculateSubTotal(item.qty,item.harga) }}
          </span>
        </span>
      </div>
      <div class="flex justify-between px-2 mb-2 mt-auto">
        <p class="font-semibold">Total</p>
        <p class="text-slate-950 font-semibold">Rp.{{ calculateTotalPrice() }}</p>
      </div>
      <span class="rounded-[4px] flex bg-btn-primary justify-center text-center gap-2 items-center px-5 py-3">
        {{ status }}
      </span>
    </aside>
    <span v-if="image === 'tidak ada' "></span>
    <img v-else :src="baseImageUrl + image " alt="" class="bg-black rounded-sm" >
  </main>
</template>
