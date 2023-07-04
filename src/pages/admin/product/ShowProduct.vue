<script setup>
import { onMounted, ref } from "vue";
import numeral from "numeral";
import Api from "../../../config/api/Api";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useRouter } from "vue-router";

const products = ref("");
const { GET } = Api();
const router = useRouter();

onMounted(() => {
  getProduct();
});

function numberFormat(harga) {
  const formattedAmount = numeral(harga).format("0,0");
  return formattedAmount;
}

function goToAdd() {
  router.push({
    name: "addProduct",
  });
}

async function getProduct() {
  const data = await GET("produk");
  products.value = data.data;
  console.log(products.value);
  dataTables();
}

function goToEdit(id) {
  router.push({
    name: "editProduct",
    params: { product: id },
  });
  console.log(id);
}

function dataTables() {
  // Menghapus tabel yang sudah ada sebelumnya, jika ada
  if ($.fn.DataTable.isDataTable("#myTable")) {
    $("#myTable").DataTable().destroy();
    $("#myTable").empty();
  }

  // Menginisialisasi DataTable pada tabel
  $("#myTable").DataTable({
    data: products.value, // Menggunakan data yang diperoleh dari API
    searching: true,
    pageLength: 10,
    columns: [
      { data: null, render: (data, type, row, meta) => meta.row + 1 },
      { data: "nm_produk" },
      { data: "nm_jns_produk" },
      { data: "qty_produk" },
      {
        data: "harga_beli",
        render: function (data) {
          return `Rp.${numberFormat(data)}`;
        },
      },
      {
        data: "harga_jual",
        render: function (data) {
          return `Rp.${numberFormat(data)}`;
        },
      },
      {
        data: "id",
        render: function (data, type, row) {
          return `
            <div class="flex flex-row gap-2">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="${() => {goToEdit(data)}}">Edit</button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
          `;
        },
      },
    ],
  });
}
</script>

<template>
  <div class="h-[500px] overflow-y-auto px-5">
    <div class="w-full flex justify-between items-center mb-5">
      <h1>Data Produk</h1>
      <button
        @click="goToAdd"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Tambah Data
      </button>
    </div>
    <table id="myTable" class="bg-white py-2 border border-gray-200">
      <thead class="bg-yellow-main text-center mt-10 border text-gray-800">
        <tr>
          <th class="px-6 py-3 whitespace-nowrap text-center">No</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Nama Produk</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Kategori</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Stok</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Harga Beli</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Harga Jual</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Aksi</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style>
@import 'datatables.net-dt';
</style>