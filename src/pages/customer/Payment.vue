<script setup>
import BtnComponent from "@/components/atom/BtnComponent.vue";
import Api from "@/config/api/Api";
import { useRoute } from "vue-router";
import { reactive, onMounted,ref } from "vue";
import { objectToData } from "@/utils/ObjectToData";
import { numberFormat } from "@/utils/NumberFormat";
import Snap from "midtrans-client/lib/snap";


const { GET } = Api();
const route = useRoute();
const invoice = reactive({
  id_pemesanan: null,
  keterangan: "",
  no_nota: "",
  id_pelanggan: null,
  tgl: "2023-07-31",
  id_produk: 2,
  qty: 2,
  harga: 12000,
});
const nota = route.params.invoice;
async function getPayment() {
  const data = await GET(`invoice/${nota}`);
  objectToData(invoice, data);
}
async function startPayment() {
  const transactionKey = await GET(`bayar/${nota}`)
  console.log(transactionKey);
  const clientKey = "SB-Mid-client-FSW9QmR7K7z_JApj"; // Replace with your client key
  const transactionToken = transactionKey.data; // Replace with your transaction token
  console.log("Transaction Token:", transactionToken);
  const snap = new Snap({
    clientKey,
    env: "production", // Change to "production" for production environment
  });
  
  snap.pay(transactionToken, {
    onSuccess: function (result) {
      /* You may add your own implementation here */
      alert("payment success!");
      console.log(result);
    },
    onPending: function (result) {
      /* You may add your own implementation here */
      alert("waiting for your payment!");
      console.log(result);
    },
    onError: function (result) {
      /* You may add your own implementation here */
      alert("payment failed!");
      console.log(result);
    },
    onClose: function () {
      /* You may add your own implementation here */
      alert("you closed the popup without finishing the payment");
    },
  });
}
onMounted(() => {
  getPayment();
});
</script>
<template>
  <div
    class="h-screen w-screen whitespace-nowrap p-10 flex justify-center items-center"
  >
    <main
      class="min-w-[474px] p-[32px] flex bg-white shadow-[0px_2px_12px_0px_rgba(0_0_0_0.16)] rounded-2xl flex-col gap-[20px]"
    >
      <h1 class="text-center font-bold text-xl">Pembayaran</h1>
      <div class="flex gap-2 items-center justify-center">
        <h1 class="text-xl">Total:</h1>
        <p class="font-bold text-xl">{{ numberFormat(invoice.harga) }}</p>
      </div>
      <div class="flex flex-col gap-4">
        <h1>List Rekening Pembayaran</h1>
        <div
          class="py-3 px-4 items-center flex gap-5 border border-black bg-white rounded-xl"
        >
          <h1 class="w-[15%]">BCA</h1>
          <p>109201809</p>
        </div>
        <div
          class="py-3 px-4 items-center flex gap-5 border border-black bg-white rounded-xl"
        >
          <h1 class="w-[15%]">BRI</h1>
          <p>109201809</p>
        </div>
        <div
          class="py-3 px-4 items-center flex gap-5 border border-black bg-white rounded-xl"
        >
          <h1 class="w-[15%]">DANA</h1>
          <p>109201809</p>
        </div>
        <div
          class="py-3 px-4 items-center flex gap-5 border border-black bg-white rounded-xl"
        >
          <h1 class="w-[15%]">GOPAY</h1>
          <p>109201809</p>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h1 class="text-center">Upload Bukti Pembayaran</h1>
        <label
          for="fileInput"
          class="text-center w-full py-3 px-4 h-20 border-dashed border rounded-md border-black cursor-pointer"
        >
          <h1 class="text-center">upload foto kesini</h1>
          <input id="fileInput" type="file" class="opacity-0" />
        </label>
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
</template>
