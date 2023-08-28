<script setup>
import { onMounted, reactive, ref } from "vue";
import Api from "@/config/api/Api";
import { useRouter } from "vue-router";
import Gundar from "@/assets/Gunadarma.webp";
import Kedai from "@/assets/kedaireka.webp";
import kemendikbud from "@/assets/kemendikbud.webp";
import Umj from "@/assets/Umj.webp";

const { GET } = Api();
const categories = ref("");
async function getCategory() {
  try {
    const data = await GET("jnsproduk");
    categories.value = data.data;
  } catch (error) {
    categories.value = null;
  }
}

const router = useRouter()

const contacts = reactive([
  {
    text: "Whatsapp",
    link: " https://wa.me/085155119213",
  },
  {
    text: "email",
    link: "mailto:azkiajmal@gmail.com",
  },
]);

const shops = reactive([
  {
    text: "Kategori",
    link: "allCategory",
  },
  {
    text: "Produk Madu",
    link: "catalog",
  },
]);

const companies = reactive([
  {
    text: "Tentang Kami",
    link: "madu/aboutus",
  },
  {
    text: "Lokasi",
    link: "https://goo.gl/maps/7TkBbp5SE3EP4nwUA",
  },
]);

const supports = reactive([
  { logoUrl: Gundar, name: "gundar" },
  { logoUrl: Kedai, name: "kedaireka" },
  { logoUrl: kemendikbud, name: "kemendikbut=d" },
  { logoUrl: Umj, name: "umj" },
]);

async function redirectShops(name) {
  router.push(
    {
      name:name
    }
  )
}
onMounted(() => {
  getCategory();
});
</script>
<template>
  <main class="bg-black text-white px-10 py-5 flex flex-col gap-5">
    <header class="grid grid-cols-1 text-center md:text-start md:grid-cols-2 lg:grid-cols-4 gap-20">
      <div class="flex flex-col  gap-4 items-center">
        <img class="w-20" src="/assets/logoNavbar.png" alt="logo" />
        <h1 class="text-sm text-center">
          Madu lokal berkelas internasional Berasal dari perternakan sendiri
        </h1>
        <div class="flex gap-4">
          <a
            href="https://www.instagram.com/madumutiara_official"
            target="blank"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              class="cursor-pointer"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/madumutiara_official"
            target="blank"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              style="cursor: pointer"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/madumutiara_official"
            target="blank"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              style="cursor: pointer"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M941.3 296.1a112.3 112.3 0 0 0-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0 0 82.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/madumutiara_official"
            target="blank"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              class="cursor-pointer"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div>
        <h1 class="font-semibold">Perusahaan</h1>
        <ul class="flex flex-col gap-2 mt-2">
          <li v-for="(company, index) in companies" :key="index">
            <a class="text-gray-400 text-sm cursor-pointer" :href="company.link">{{ company.text }}</a>
          </li>
        </ul>
      </div>
      <div>
        <h1 class="font-semibold">Belanja</h1>
        <ul class="flex flex-col gap-2 mt-2">
          <li v-for="(shop, index) in shops" :key="index">
            <a class="text-gray-400 text-sm cursor-pointer" @click="redirectShops(shop.link)">{{ shop.text }}</a>
          </li>
        </ul>
      </div>
      <div>
        <h1 class="font-semibold">Kontak</h1>
        <ul class="flex flex-col gap-2 mt-2">
          <li v-for="(contact, index) in contacts" :key="index">
            <a class="text-gray-400 text-sm cursor-pointer" :href="contact.link">{{ contact.text }}</a>
          </li>
        </ul>
      </div>
    
    </header>
    <footer class="w-full flex flex-col gap-10 mt-10">
      <div class="grid grid-cols-1 md:grid-cols-4 w-full gap-5 content-center justify-items-center">
          <img class="h-10 md:h-10" v-for="(support, index) in supports" :key="index" :src="support.logoUrl" :alt="support.name" >
      </div>
      <h1 class="w-full text-gray-400 text-center">
        © 2023 CV. Madu Apiari Mutiara
      </h1>
    </footer>
  </main>
</template>
<!-- <div class="flex flex-col gap-2">
  <h1 class="text-2xl font-bold">Maps</h1>
  <div
    style="
      max-width: 100%;
      list-style: none;
      transition: none;
      overflow: hidden;
      width: 300px;
      height: 200px;
    "
  >
    <div
      id="embedded-map-display"
      style="height: 100%; width: 100%; max-width: 100%"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1426244706795!2d106.88296077541919!3d-6.375582345873461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eb6023b84cf1%3A0xc046caccfae4729e!2sCV.%20Madu%20Apiari%20Mutiara%20-%20Cimanggis%2C%20Depok!5e0!3m2!1sid!2sid!4v1691748430557!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style="border: 0"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div> -->
