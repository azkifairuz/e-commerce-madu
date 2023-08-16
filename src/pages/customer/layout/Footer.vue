<script setup>
import { onMounted, ref } from 'vue';
import Api from '@/config/api/Api'
const {GET} = Api()
const categories = ref("");
async function getCategory() {
  try {
    const data = await GET("jnsproduk");
    categories.value = data.data;
  } catch (error) {
    categories.value = null;
  }
}

onMounted(() => {
  getCategory();
});
</script>
<template>
  <main class="bg-gray-400 px-10 py-5 flex justify-evenly flex-col md:flex-row gap-4">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">Contact</h1>
      <span>
        <a src="">08515511</a>
      </span>
      <span>
        <a src="">@maduapiari</a>
      </span>
      <span>
        <a src="">madu_apiari</a>
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">Kategori</h1>
      <ul
      v-if="categories != null"
      v-for="(categori, index) in categories.slice(0, 5)"
      >
      <li>{{ categori.nm_jns_produk }}</li>
      </ul>
    </div>
    <div class="flex flex-col gap-2">
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
    </div>
  </main>
</template>
