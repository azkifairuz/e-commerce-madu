<script setup>
import Navbar from "@/components/organism/Navbar.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <Navbar />
  <main class="pt-10">
    <RouterView />
  </main>
</template>
