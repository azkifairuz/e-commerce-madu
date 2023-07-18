<script setup>
import { nextTick, onMounted, ref } from "vue";
import Api from "../../../config/api/Api";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useRouter } from "vue-router";

const employees = ref("");
const { GET } = Api();
const responseMsg = ref("");
const router = useRouter()
onMounted(() => {
  getEmployee();
});


async function getEmployee() {
  const data = await GET("pegawai");
  employees.value = data.data;
  console.log(data.data);
  dataTables();
}

function registerEmploye() {
    router.push(
      {
        name:"pegawai"
      }
    )
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
  <div class="h-[500px]  px-5">
    <div class=" flex justify-between items-center mb-5">
      <h1>Data Pegawai</h1>
      <div v-show="responseMsg">
        <div
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">{{ responseMsg }}</strong>
        </div>
      </div>
      <button
        @click="registerEmploye"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Daftarkan Pegawai
      </button>
    </div>
    <table id="myTable" class="bg-white w-full py-2 border border-gray-200">
      <thead class="bg-yellow-main text-center mt-10 border text-gray-800">
        <tr>
          <th class="px-6 py-3 text-center">No</th>
          <th class="px-6 py-3 text-center">NIK</th>
          <th class="px-6 py-3 text-center">Nama Pegawai</th>
          <th class="px-6 py-3 text-center">Alamat Pegawai</th>
          <th class="px-6 py-3 text-center">Tanggal Lahir</th>
          <th class="px-6 py-3 text-center">Tempat Lahir</th>
          <th class="px-6 py-3 text-center">Jenis Kelamin</th>
          <th class="px-6 py-3 text-center">Email</th>
          <th class="px-6 py-3 text-center">No Telpon</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="employee.id">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.nik }}</td>
          <td>{{ employee.nm_pegawai }}</td>
          <td>{{ employee.alamat_pegawai }}</td>
          <td>{{ employee.tgl_lahir }}</td>
          <td>{{ employee.tmp_lahir }}</td>
          <td>{{ employee.jns_kelamin }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.no_telp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import "datatables.net-dt";
</style>

