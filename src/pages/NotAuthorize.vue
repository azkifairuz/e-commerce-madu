<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isLogin = sessionStorage.getItem("isLogin");
const levelUser = sessionStorage.getItem("levelUser");
const isAdmin = ref("")
const countdown = ref(5); // Countdown awal 5 detik
const router = useRouter()

function cekLevel() {
  if (isLogin === "false") {
    router.push({
      name: "auth",
    });
    return;
  }
  if (levelUser != "cust") {
    isAdmin.value = "cust"
    return;
  }
  isAdmin.value = "admin"
  return;
}

onMounted(() => {
  cekLevel();
  const interval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value === 0) {
      clearInterval(interval);
      router.push({
        name: "auth",
      });
    }
  }, 1000); 
  
})
</script>

<template>
  <div class="w-screen h-screen">
    <p class="mx-auto w-fit my-10">
      Page ini hanya bisa diakses oleh {{ isAdmin }}. Redirect dalam {{ countdown }} detik.
    </p>
  </div>
</template>
