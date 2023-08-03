<script setup>
import BtnComponent from "@/components/atom/BtnComponent.vue";
import Api from "@/config/api/Api";
import { useRoute } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { objectToData } from "@/utils/ObjectToData";
import { numberFormat } from "@/utils/NumberFormat";
import midtransClient from "midtrans-client";
import { useRouter } from "vue-router";

const { GET } = Api();
const route = useRoute();
const router = useRouter();
const invoice = ref("");
const nota = route.params.invoice;
async function getPayment() {
  const data = await GET(`invoice/${nota}`);
  // objectToData(invoice, data);
  invoice.value = data.data;
  console.log(data.data);
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
  console.log(transactionKey);
  const transactionToken = transactionKey.data; 
  console.log("Transaction Token:", transactionToken)
  window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}`
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
</template>


