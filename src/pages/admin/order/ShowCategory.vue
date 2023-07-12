<script setup>
import { nextTick, onMounted, ref } from "vue";
import Api from "../../../config/api/Api";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useRouter } from "vue-router";

const products = ref("");
const { GET, DELETE } = Api();
const router = useRouter();
const responseMsg = ref("");

onMounted(() => {
  getCategory();
});

function goToAdd() {
  router.push({
    name: "addCategory",
  });
}

async function getCategory() {
  const data = await GET("jnsproduk");
  products.value = data.data;
  dataTables();
}

async function deleteProduct(id) {
  try {
    await DELETE(`jnsproduk/${id}`);
    responseMsg.value = "Berhasil Menghapus";
    setTimeout(() => {
      router.push({
        name: "showCategory",
      });
    }, 2000);
  } catch (error) {
    console.error(error);
    responseMsg.value = "Gagal Menghapus";
  }
}

function goToEdit(id) {
  router.push({
    name: "editCategory",
    params: { category: id },
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
    <div class="w-full flex justify-between items-center mb-5">
      <h1>Data Kategori</h1>
      <div v-if="responseMsg">
        <div
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">{{ responseMsg }}</strong>
        </div>
      </div>
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
          <th class="px-6 py-3 whitespace-nowrap text-center">Kategori</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Keterangan</th>
          <th class="px-6 py-3 whitespace-nowrap text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.nm_jns_produk }}</td>
          <td>{{ product.ket_jns_produk }}</td>
          <td>
            <div class="flex flex-row gap-2">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="goToEdit(product.id)"
              >
                Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="deleteProduct(product.id)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import "datatables.net-dt";
</style>

