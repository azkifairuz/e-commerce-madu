<script setup>
import { reactive } from "vue";
import Gundar from "@/assets/Gunadarma.png";
import Logo from "@/assets/logo.png";
import Kedai from "@/assets/kedaireka.png";
import kemendikbud from "@/assets/kemendikbud.png";
import Umj from "@/assets/Umj.png";
const documents = reactive([
  { name: "NIB" },
  { name: "IUI" },
  { name: "TDP" },
  { name: "SIUP" },
  { name: "IUKOT" },
  { name: "IKOS" },
  { name: "Sertifikat CPOTB" },
  { name: "Sertifikat CPKB A" },
  { name: "Sertifikat HALAL" },
  { name: "16 Sertifikat PIRT" },
  { name: "20 Nomor Izin Edar Kosmetik" },
  { name: "Nomor Izin Edar TR" },
  { name: "Nomor Izin Edar MD" },
  { name: "Hak Cipta Logo dan Lebah" },
]);
const sponsors = reactive([
  { logoUrl: Gundar, name: "gundar" },
  { logoUrl: Kedai, name: "kedaireka" },
  { logoUrl: kemendikbud, name: "kemendikbut=d" },
  { logoUrl: Logo, name: "madu" },
  { logoUrl: Umj, name: "umj" },
]);
const missions = reactive([
  {
    misi: "Menerapkan proses produksi yang higienis untuk menghasilkan produk olahan madu yang aman dikonsumsi",
  },
  {
    misi: "Menjadi perusahaan yang mengutamakan kekeluargaan dan kepuasan pelanggan",
  },
  {
    misi: "Menyadarkan masyarakat akan pentingnya obat dan kosmetik alami untuk kesehatan",
  },
  {
    misi: "Mengurangi pengangguran minimal di lingkungan sekitar",
  },
  {
    misi: "Mengamalkan yang sudah terkandung dalam kitab suci AL-Quran",
  },
]);
</script>

<template>
  <div class="container mx-auto p-8">
    <div class="mb-8">
      <h1 class="text-2xl font-semibold mb-4">Tentang Kami</h1>
      <p>
        CV. Madu Apiari Mutiara berdiri pada tanggal 01 April 2010, yang
        dipimpin oleh Bapak H. Sri Hidayat, dan terdaftar dalam Akta Notaris
        Winda Utami, S.H. pada tanggal 19 Februari 2009 dengan jumlah karyawan
        16 orang.
      </p>
      <p>
        CV Madu Apiari Mutiara adalah perusahaan yang bergerak dalam Industri
        Pangan, industri kecil Obat Tradisional, dan Industri Kosmetik.
      </p>
    </div>
    <div class="mb-8">
      <p>
        Sejak tahun 2022 CV. Madu Apiari Mutiara adalah salah satu perusahaan
        Binaan Universitas Muhammadiyah Jakarta dan binaan UMKM Kota Depok.
        Memiliki izin legalitas seperti:
      </p>
      <div class="grid grid-cols-2 text-center md:grid-cols-4 gap-4">
        <div
          v-for="(document, index) in documents"
          :key="index"
          class="bg-yellow-300 p-4"
        >
          {{ document.name }}
        </div>
      </div>
    </div>
    <div class="mb-8">
      <p>
        Saat ini CV. Madu Apiari Mutiara memiliki kantor di Jln. Putri Tunggal
        Komplek Cassa Soronza RT 002 RW 003 Harjamukti Cimanggis Kota Depok. Dan
        memiliki pabrik kosmetik dan UKOT di Jln. Gatot Kaca Kp. Pedurenan RT
        008 RW 003 Harjamukti Cimanggis Kota Depok.
      </p>
    </div>
    <div class="mb-8">
      <p>
        Dalam perjalanannya, CV. Madu Apiari Mutiara berkomitmen untuk selalu
        memberikan yang terbaik bagi setiap konsumen dengan menjaga kualitas dan
        mutu produk.
      </p>
    </div>
    <div class="flex flex-col md:flex-row gap-5 justify-center">
      <div class="">
        <h2 class="text-2xl font-semibold mb-2">Visi</h2>
        <p>
          Memproduksi produk-produk lebah yang berguna untuk masyarakat dengan
          mengedepankan keamanan, kualitas, dan kejujuran.
        </p>
      </div>
      <div class=" ">
        <h2 class="text-2xl font-semibold mb-2">Misi</h2>
        <ul class="list-disc ml-6">
          <li v-for="(mision, index) in missions" :key="index">
            {{ mision.misi }}
          </li>
        </ul>
      </div>
    </div>
    <div class="my-10">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          v-for="(sponsor, index) in sponsors"
          :key="index"
          class="flex items-center justify-center bg-yellow-300 p-4"
        >
          <img :src="sponsor.logoUrl" :alt="sponsor.name" class="max-h-24" />
        </div>
      </div>
    </div>
  </div>
</template>
