<script setup>
import honeyJar from '@/assets/honey-jar.webp'
import produk from '@/assets/blokmadu.png'
import { useRouter } from 'vue-router';
import Api from "@/config/api/Api";
import { onMounted, ref } from 'vue';
const category = ref("");
const orders = ref("");
const employees = ref("");
const products = ref("");
const customers = ref("");

const { GET, DELETE } = Api();
const router = useRouter()
function navigation(path) {
  router.push({
    name: path,
  });
}
async function getEmployee() {
  const data = await GET("pegawai");
  employees.value = data.data;

}
async function getCustomer() {
  const data = await GET("pelanggan");
  customers.value = data.data;
}
async function getProduct() {
    const data = await GET("produk");
    products.value = data.data;

}
async function getOrder() {
  const data = await GET("pemesanan");
  orders.value = data.data;

}
async function getCategory() {
  const data = await GET("jnsproduk");
  category.value = data.data;
}

onMounted(() => {
  getCategory();
  getOrder()
  getEmployee()
  getCustomer()
  getProduct()
});
</script>
<template>
  <h1 class="text-2xl font-semibold my-5">Selamat Datang DI Dashboard Admin Madu Apiari Mutiara</h1>
  <div class="grid gird-cols-2 lg:grid-cols-5 justify-evenly gap-5">
    <div @click="navigation('category')" class="flex px-5 py-2 h-24 cursor-pointer hover:shadow justify-center items-center gap-5 rounded-md  bg-yellow-main">
       <h1>Kategori Madu (<span class="font-semibold">{{category.length}}</span>)</h1>
       <img :src="honeyJar" alt="" class="w-14 h-14">
        
    </div>
    <div @click="navigation('product')"  class="flex px-5 py-2 h-24 cursor-pointer hover:shadow justify-center items-center gap-5 rounded-md  bg-yellow-main">
        <h1>produk madu (<span class="font-semibold">{{products.length}}</span>)</h1>
       <img :src="produk" alt="" class="w-14 h-14">

    </div>
    <div @click="navigation('dataCustomer')"  class="flex px-5 py-2 h-24 cursor-pointer hover:shadow justify-center items-center gap-5 rounded-md  bg-yellow-main">
        <h1>pelanggan (<span class="font-semibold">{{customers.length}}</span>)</h1>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

    </div>
    <div @click="navigation('employee')"  class="flex px-5 py-2 h-24 cursor-pointer hover:shadow justify-center items-center gap-5 rounded-md  bg-yellow-main">
        <h1>pegawai (<span class="font-semibold">{{employees.length}}</span>)</h1>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>


    </div>
    <div @click="navigation('order')"  class="flex px-5 py-2 h-24 cursor-pointer hover:shadow justify-center items-center gap-5 rounded-md  bg-yellow-main">
        <h1>penjualan(<span class="font-semibold">{{orders.length}}</span>)</h1>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
</svg>


    </div>
  </div>
</template>