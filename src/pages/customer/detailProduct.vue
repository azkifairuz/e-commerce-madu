<script setup>
import { ref } from 'vue';

const quantity = ref("1")

</script>
<template>
  <main class="px-10 py-10">
    <div class="flex gap-5">
      <img
        class="w-[400px] h-[400px] rounded-lg"
        src="https://dummyimage.com/400x400/000/fff"
        alt=""
      />
      <div class="w-1/2 flex flex-col justify-evenly">
        <div>
          <h1 class="font-bold">title</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
            alias aperiam sapiente possimus impedit in adipisci laboriosam
            magnam beatae eius nemo ex, deserunt accusantium modi consequatur
            iste obcaecati commodi reprehenderit.
          </p>
        </div>
        <div>
          <h1>kuantitas</h1>
          <div class="flex gap-2 ">
            <button class="w-5 h-5 bg-gray-400">+</button>
            <input type="text" class="w-10 h-5" v-model="quantity">
            <button class="w-5 h-5 bg-gray-400">-</button>
          </div>
        </div>
        <div>
          <h1 class="font-bold">Harga</h1>
          <button
            class="bg-btn-primary  hover:bg-btn-hover border border-black rounded-lg px-5 py-2"
          >
            Beli
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
