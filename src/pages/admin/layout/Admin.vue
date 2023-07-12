<script setup>
import Sidebar from "../../../components/organism/Sidebar.vue";
</script>
<template>
  <div class="flex gap-28 ">
    <Sidebar />
    <main class="max-w-[80%]">
      <router-view></router-view>
    </main>
  </div>
</template>
