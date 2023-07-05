<script setup>
import Navbar from "@/components/organism/Navbar.vue";
import Jbtr from "@/components/atom/JumboTron.vue";
import LabelCategory from "@/components/atom/labelCategory.vue";
import Api from "@/config/api/Api"



</script>
<template>
  <Navbar/>
  <Jbtr/>
  <label-category />
  <router-view></router-view>
</template>