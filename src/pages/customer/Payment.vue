<script setup>
import BtnComponent from "@/components/atom/BtnComponent.vue";
import Api from "@/config/api/Api";
import { useRoute } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { objectToData } from "@/utils/ObjectToData";
import { numberFormat } from "@/utils/NumberFormat";
// import midtransClient from "midtrans-client";
import { useRouter } from "vue-router";

const { GET } = Api();
const route = useRoute();
const router = useRouter();
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
const nota = 123hask2

const idPelanggan = sessionStorage.getItem("sesIdPelanggan");
const baseImageUrl = import.meta.env.VITE_APP_BASE_IMG_URL;
async function getPayment() {
  const data = await GET(`invoice/${nota}`);
  // objectToData(invoice, data);
  invoice.value = data.data;
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

async function startPayment() {
  const transactionKey = await GET(`bayar/${nota}`);
  const transactionToken = transactionKey.data;
  console.log("Transaction Token:", transactionToken);
  window.location.href = transactionKey.redirect_url;
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

    <aside class="bg-white rounded-md mx-auto lg:mx-0  w-full md:w-1/2 lg:w-1/4 p-5 flex flex-col justify-between">
      <h1 class="text-xl font-bold capitalize">Pesanan</h1>
      <div class="px-2 mt-2 flex flex-col gap-5 mb-2">
        <span v-for="(item, index) in invoice" :key="index" class="flex gap-4">
          <img
            class="w-12 h-12 border bg-black rounded-sm"
            :src="baseImageUrl + item.image"
            alt="product image"
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
        <p class="text-gray-400">Rp.{{ calculateTotalPrice() }}</p>
      </div>
      <BtnComponent
        label="Bayar"
        @some-event="startPayment()"
        primary-color="bg-btn-primary"
        hover-color="hover:bg-btn-hover"
        textColor="text-black"
      />
    </aside>
  </main>
</template>
<!-- <template>
  <div
    class="h-screen w-screen whitespace-nowrap p-10 flex justify-center items-center"
  >
    <main
      class="min-w-[474px] p-[32px] flex bg-white shadow-[0px_2px_12px_0px_rgba(0_0_0_0.16)] rounded-2xl flex-col gap-[20px]"
    >
      <h1 class="text-center font-bold text-xl">invoice</h1>
      <div class="flex gap-2 items-center justify-center">
        <table class="text-center w-full border-collapse my-5">
          <tr class="py-2 px-5">
            <th class="py-2 px-4">No</th>
            <th class="py-2 px-4">Madu</th>
            <th class="py-2 px-4">Harga</th>
            <th class="py-2 px-4">Jumlah</th>
            <th class="py-2 px-4">Total</th>
          </tr>
          <tr v-for="(item, index) in invoice" :key="index" class="py-2 px-5">
            <td class="py-2 px-4">{{ index }}</td>
            <td class="py-2 px-4">{{ item.id_produk }}</td>
            <td class="py-2 px-4">Rp.{{ numberFormat(item.harga) }}</td>
            <td class="py-2 px-4">{{ item.qty }}</td>
            <td class="py-2 px-4">
              Rp.{{ numberFormat(parseInt(item.harga * parseInt(item.qty))) }}
            </td>
          </tr>
        </table>
      </div>
      <div class="flex justify-end gap-2 items-center">
        <h1 class="text-xl font-bold">Total Bayar:</h1>
        <p class="text-xl">Rp.{{ calculateTotalPrice() }}</p>
      </div>

      <BtnComponent
        label="Bayar"
        @some-event="startPayment()"
        primary-color="bg-btn-primary"
        hover-color="hover:bg-btn-hover"
        textColor="text-black"
      />
    </main>
  </div>
</template> -->
