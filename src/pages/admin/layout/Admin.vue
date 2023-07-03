<script setup>
import Sidebar from "../../../components/Sidebar.vue";
</script>
<template>
  <div class="flex gap-28">
    <Sidebar />
    <main>

      <router-view></router-view>
    </main>
  </div>
</template>
