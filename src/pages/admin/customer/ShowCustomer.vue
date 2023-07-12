<script setup>
import { nextTick, onMounted, ref } from "vue";
import Api from "../../../config/api/Api";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useRouter } from "vue-router";

const customers = ref("");
const { GET, DELETE } = Api();
const router = useRouter();
const responseMsg = ref("");

onMounted(() => {
  getCustomer();
});

function goToAdd() {
  router.push({
    name: "addCategory",
  });
}

async function getCustomer() {
  const data = await GET("pelanggan");
  customers.value = data.data;
  dataTables();
}

async function deleteCustomer(id) {
  try {
    await DELETE(`pelanggan/${id}`);
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
      scrollx: 500,
      lengthMenu: ["5", "10", "15", "25"],
    })
  });
}
</script>

<template>
  <div class="h-[500px] w-full px-5">
    <div class="w-full flex justify-between items-center mb-5">
      <h1>Data Customer</h1>
      <div v-if="responseMsg">
        <div
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">{{ responseMsg }}</strong>
        </div>
      </div>
   
    </div>
    <table id="myTable" class="bg-white py-2 border w-full border-gray-200">
      <thead class="bg-yellow-main text-center mt-10 border text-gray-800">
        <tr>
          <th class="px-6 py-3  text-center">No</th>
          <th class="px-6 py-3  text-center">NIK</th>
          <th class="px-6 py-3  text-center">Nama Pelanggan</th>
          <th class="px-6 py-3  text-center">Alamat Pelanggan</th>
          <th class="px-6 py-3  text-center">Tanggal Lahir</th>
          <th class="px-6 py-3  text-center">Tempat Lahir</th>
          <th class="px-6 py-3  text-center">Jenis Kelamin</th>
          <th class="px-6 py-3  text-center">Email</th>
          <th class="px-6 py-3  text-center">No Telpon</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="customer.id">
          <td>{{ index + 1 }}</td>
          <td>{{ customer.nik }}</td>
          <td>{{ customer.nm_pelanggan }}</td>
          <td>{{ customer.alamat_pelanggan }}</td>
          <td>{{ customer.tgl_lahir }}</td>
          <td>{{ customer.tmp_lahir }}</td>
          <td>{{ customer.jns_kelamin }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.no_telp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import "datatables.net-dt";

</style>

