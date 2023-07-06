<script setup></script>
<template>
    <div class="w-[400px]">
    <div class="mb-6">
      <label
        for="nmProduct"
        class="block mb-2 text-lg font-medium text-gray-900"
      >
        Nama Produk
      </label>
      <input
        type="typeInput"
        id="nmProduct"
        v-model="produk.nm_produk"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukan Nama Produk"
        required
      />
    </div>
    <div class="mb-6">
      <label for="qty" class="block mb-2 text-lg font-medium text-gray-900">
        Jumlah
      </label>
      <input
        type="typeInput"
        id="qty"
        v-model="produk.qty_produk"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukan Jumlah"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="category"
        class="block mb-2 text-lg font-medium text-gray-900"
      >
        Jenis Produk
      </label>
      <input
        type="typeInput"
        id="category"
        v-model="produk.id_jns_produk"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Pilih Jenis Produk"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="sellPrice"
        class="block mb-2 text-lg font-medium text-gray-900"
      >
        Harga jual
      </label>
      <input
        type="typeInput"
        id="sellPrice"
        v-model="produk.harga_jual"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukan Nama Produk"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="buyprice"
        class="block mb-2 text-lg font-medium text-gray-900"
      >
        Harga Belii
      </label>

      <input
        type="typeInput"
        id="nameProduct"
        v-model="produk.harga_beli"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Masukan Nama Produk"
        required
      />
    </div>

    <button
      @click="save"
      class="bg-yellow-main hover:bg-yellow-hover text-black font-bold py-2 px-4 rounded"
    >
      Kirim
    </button>
  </div>
</template>