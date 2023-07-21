<script setup>
import BtnComponent from '@/components/atom/BtnComponent.vue';

</script>
<template>
  <div class="h-screen w-screen whitespace-nowrap p-10 flex justify-center items-center">
    <main class="min-w-[474px] p-[32px] flex bg-white shadow-[0px_2px_12px_0px_rgba(0_0_0_0.16)] rounded-2xl flex-col gap-[20px]">
      <h1 class="text-center font-bold text-xl">Pembayaran</h1>
      <div class="flex gap-2 items-center  justify-center">
        <h1 class="text-xl">Total:</h1>
        <p class="font-bold text-xl">Rp.10.0000</p>
      </div>
      <div class="flex flex-col gap-4">
        <h1>List Rekening Pembayaran</h1>
        <div class="py-3 px-4 items-center  flex gap-5 border border-black bg-white rounded-xl ">
          <h1 class="w-[15%]">BCA</h1>
          <p>109201809</p>
        </div>
        <div class="py-3 px-4 items-center flex gap-5 border border-black bg-white rounded-xl ">
          <h1 class="w-[15%]">BRI</h1>
          <p>109201809</p>
        </div>
        <div class="py-3 px-4 items-center flex gap-5 border border-black bg-white rounded-xl ">
          <h1 class="w-[15%]">DANA</h1>
          <p>109201809</p>
        </div>
        <div class="py-3 px-4 items-center flex gap-5 border border-black bg-white rounded-xl ">
          <h1 class="w-[15%]">GOPAY</h1>
          <p>109201809</p>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h1 class="text-center">Upload Bukti Pembayaran</h1>
        <label for="fileInput" class="text-center w-full py-3 px-4 h-20 border-dashed border rounded-md border-black  cursor-pointer">
          <h1 class="text-center">upload foto kesini</h1>
          <input id="fileInput" type="file" class="opacity-0" />
        </label>
      </div>
      <BtnComponent
          label="Kirim"
          primary-color="bg-btn-primary"
          hover-color="hover:bg-btn-hover"
          textColor="text-black"
        />
    </main>
  </div>
</template>
