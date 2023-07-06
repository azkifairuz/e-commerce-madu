<script setup>
import { reactive } from "vue";
import InputField from "@/components/atom/InputField.vue";
import Api from "@/config/api/Api";
import { objectToFormdata } from "@/utils/ObjectToForm";
import { useRouter } from "vue-router";
import ProductForm from "@/components/molecular/ProductForm.vue";
const router = useRouter()
const produk = reactive({
  nm_produk: "",
  qty_produk: null,
  id_jns_produk: null,
  harga_jual: null,
  harga_beli: null,
});

const { POST } = Api();
async function save() {
  const data = await POST(`produk`, objectToFormdata(produk));
  router.push(
    {
      name:'product'
    }
  )
}
</script>

<template>
  <ProductForm/>
</template>
