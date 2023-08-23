<script setup>
import Api from "@/config/api/Api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const idPelanggan = sessionStorage.getItem("sesIdPelanggan");
const { GET } = Api();
const history = ref("");
const status = [];
const image = [];
const statusRef = ref([]);
const imageRef = ref([]);
const router = useRouter();
async function getHistory() {
  const dataHistori = await GET(`historibelanja/${idPelanggan}`);
  history.value = dataHistori.data;
  for (const item of history.value) {
    status.push(await getSatus(item.id));
    image.push(await getImage(item.id))
  }

  statusRef.value = status;
  imageRef.value = image;
}
async function getSatus(itemId) {
  const dataStatus = await GET(`statusnota/${itemId}`);
  status.value = dataStatus.data;

  return dataStatus.data[0].keterangan;
}
async function getImage(itemId) {
  const dataStatus = await GET(`statusnota/${itemId}`);
  image.value = dataStatus.data;

  return dataStatus.data[0].image;
}
function goToDetailHistory(itemId, status, image) {
  if (image === null) {
    router.push({
      name: "detailHistory",
      params: { nota: itemId, status: status, image: "tidak ada" },
    });
    return;
  }
  router.push({
    name: "detailHistory",
    params: { nota: itemId, status: status, image: image },
  });
}
onMounted(() => {
  getHistory();
});
</script>
<template>
  <main
    class="h-screen flex flex-col gap-2 px-5 py-2 my-10 bg-white md:w-1/2 lg:w-1/4 md:mx-auto rounded-md"
  >
    <h1 class="text-2xl font-semibold">Riwayat Transaksi</h1>
    <div
      v-for="(item, index) in history"
      :key="item.id"
      @click="goToDetailHistory(item.no_nota, statusRef[index], imageRef[index])"
      class="flex flex-col gap-2 cursor-pointer hover:shadow hover:shadow-gray-400 bg-yellow-secondary rounded-md py-2 px-5"
    >
      <div class="flex justify-between">
        <div>
          <h1 class="font-semibold">No Nota</h1>
          <p class="">{{ item.no_nota }}</p>
        </div>
        <div>
          <h1 class="font-semibold">Tanggal</h1>
          <p class="">{{ item.tgl }}</p>
        </div>
      </div>
      <p class="text-sm">
        Status : <span class="font-bold">{{ statusRef[index] }}</span>
      </p>
    </div>
  </main>
</template>
