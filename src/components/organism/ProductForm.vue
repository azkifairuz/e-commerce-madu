<script setup>
import { onMounted, reactive, ref } from "vue";
import InputField from "@/components/atom/InputField.vue";
import SelectField from "@/components/atom/SelectField.vue";
import TextArea from "@/components/atom/TextArea.vue";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const produk = reactive({
  id: null,
  id_jns_produk: null,
  nm_produk: "",
  qty_produk: null,
  harga_jual: null,
  harga_beli: null,
  keterangan: "",
  image: "",
});
const selectOption = ref([]);

const category = reactive({
  id: null,
  nm_jns_produk: "",
});
const errorMsg = ref("");
const { GET, POST } = Api();
const idProduct = route.params.product;

async function getProductById() {
  try {
    if (!idProduct) {
      return;
    }

    const data = await GET(`produk/${idProduct}`);

    if (!data.data) {
      errorMsg.value = "Data Tidak Ditemukan";
      return;
    }
    Object.keys(data.data).forEach((key) => {
      produk[key] = data.data[key];
    });
  } catch (error) {
    errorMsg.value = "Data Tidak Ditemukan";
    return console.log(error.message);
  }
}

async function listCategory() {
  try {
    const data = await GET(`jnsproduk`);

    if (!data.data) {
      errorMsg.value = "Data Category Tidak Ditemukan";
      return;
    }
    category.id = data.data[0].id;
    category.nm_jns_produk = data.data[0].nm_jns_produk;
    selectOption.value = data.data.map((cat) => ({
      value: cat.id,
      label: cat.nm_jns_produk,
    }));
  } catch (error) {
    errorMsg.value = "Data Category Tidak Ditemukan";
  }
}

console.log(category);
onMounted(() => {
  getProductById();
  listCategory();
});

function onImageChange(event) {
  const file = event.target.files[0];
  produk.image = file;
}

async function save() {
  try {
    if (idProduct != null) {
      await POST(`produk/${idProduct}`, objectToFormdata(produk));
      router.push({
        name: "product",
      });
      return;
    }

    await POST(`produk`, objectToFormdata(produk));

    router.push({
      name: "product",
    });
  } catch (error) {
    console.error(error);
    errorMsg.value = "Input gagal";
  }
}

</script>

<template>
  <div class="w-[500px] bg-white shadow-lg mb-5">
    <div class="bg-yellow-main py-4 px-5 rounded-t-md">
      <h1 v-if="idProduct" class="text-xl font-bold font-poppins">
        Form Update Produk
      </h1>
      <h1 v-else class="text-xl font-bold font-poppins">Form Tambah Produk</h1>
    </div>
    <div class="p-5 flex flex-col gap-6">
      <InputField
        label="Nama Madu"
        v-model="produk.nm_produk"
        placeholder="Masukan Nama Madu"
        typeInput="text"
        name="nmProduk"
      />

      <InputField
        label="Jumlah Produk"
        v-model="produk.qty_produk"
        placeholder="Masukan Jumlah Produk"
        typeInput="text"
        name="qty"
      />

      <SelectField
        label="jenis madu"
        v-model="produk.id_jns_produk"
        placeholder="Pilih Jenis Madu"
        :options="selectOption"
        name="jk"
      />

      <InputField
        label="Harga Beli"
        v-model="produk.harga_beli"
        placeholder="Harga Beli "
        typeInput="text"
        name="buyingPrice"
      />

      <InputField
        label="Harga Jual"
        v-model="produk.harga_jual"
        placeholder="Harga Jual"
        typeInput="text"
        name="nmProduk"
      />
      <TextArea
        label="Keterangan"
        v-model="produk.keterangan"
        placeholder="Keterangan"
        typeInput="text"
        name="nmProduk"
      />

      <div class="flex flex-col gap-2">
        <label for="gambar" class="text-xl cursor-pointer">Gambar</label>

        <input
          class="py-2 px-5 g-white shadow-sm border-2 cursor-pointer rounded-md"
          type="file"
          id="gambar"
          ref="imageInput"
          accept="image/*"
          @change="onImageChange"
        />
      </div>
      <button
        @click="save"
        class="bg-yellow-main hover:bg-yellow-hover text-black font-bold py-2 px-4 rounded"
      >
        Kirim
      </button>
    </div>
  </div>
</template>
