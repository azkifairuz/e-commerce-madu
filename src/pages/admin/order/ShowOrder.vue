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
  dataTables();
}

async function Packing(idPemesanan) {
  const data = await GET(`statuspaking/${idPemesanan}`);
  responseMsg.value = "Status Berhasil Di ubah";

  setTimeout(() => {
    location.reload();
  }, 1000);
}
async function Kirim() {}
async function Detail(nota, status, idPelanggan) {
  router.push({
    name: "detailOrder",
    params: {
      nota: nota,
      status: status,
      idPelanggan: idPelanggan,
    },
  });
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
    <div class="flex justify-between items-center mb-5">
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
          <th class="px-6 py-3 whitespace-nowrap text-center">Status</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Packing</th>
          <th class="whitespace-nowrap text-center">aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.no_nota }}</td>
          <td>{{ order.nm_pelanggan }}</td>
          <td>{{ order.tgl }}</td>
          <td>{{ order.keterangan }}</td>
          <td>
            <button
              :class="order.keterangan === 'Sedang Dikemas' ? 'bg-blue-200 hover:bg-blue-200 cursor-not-allowed' : ' bg-blue-500 hover:bg-blue-700'"
              class=" text-white font-bold py-2 px-4 rounded"
              @click="Packing(order.id)"
            >
              Packing
            </button>
          </td>
          <td class="flex gap-2">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              @click="
                Detail(order.no_nota, order.keterangan, order.id_pelanggan)
              "
            >
              Detail
            </button>
            <button
              class="border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-2 px-4 rounded"
              @click="Kirim(order.no_nota)"
            >
              Kirim
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import "datatables.net-dt";
</style>
