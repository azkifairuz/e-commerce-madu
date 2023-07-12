<script setup>
import { nextTick, onMounted, ref } from "vue";
import Api from "../../../config/api/Api";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useRouter } from "vue-router";

const orders = ref("");
const { GET, DELETE } = Api();
const router = useRouter();
const responseMsg = ref("");

onMounted(() => {
  getOrder();
});


async function getOrder() {
  const data = await GET("pemesanan");
  orders.value = data.data;
  console.log(data.data);
  dataTables();
}

function dataTables() {
  // Menghapus tabel yang sudah ada sebelumnya, jika ada
  if ($.fn.DataTable.isDataTable("#myTable")) {
    $("#myTable").DataTable().destroy();
    $("#myTable").empty();
  }

  // Menginisialisasi DataTable pada tabel
  nextTick(() => {
    // Menginisialisasi DataTable pada tabel
    $("#myTable").DataTable({
      searching: true,
      pageLength: 10,
      scrollY: 300,
      lengthMenu: ["5", "10", "15", "25"],
    });
  });
}
</script>

<template>
  <div class="h-[500px] overflow-y-auto px-5">
    <div class=" flex justify-between items-center mb-5">
      <h1>Data Penjualan</h1>
      <div v-if="responseMsg">
        <div
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">{{ responseMsg }}</strong>
        </div>
      </div>
    </div>
    <table id="myTable" class="bg-white w-full py-2 border border-gray-200">
      <thead class="bg-yellow-main text-center mt-10 border text-gray-800">
        <tr>
          <th class="px-6 py-3 whitespace-nowrap text-center">No</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">no nota</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">pembeli</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">tanggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.no_nota }}</td>
          <td>{{ order.id_pelanggan }}</td>
          <td>{{ order.tgl }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import "datatables.net-dt";
</style>

