<script setup>
import Sidebar from "../../../components/Sidebar.vue";
</script>
<template>
  <div class="flex gap-28">
    <Sidebar />
    <main>
      <nav class="my-5">
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      </nav>
      <router-view></router-view>
    </main>
  </div>
</template>
