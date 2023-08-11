<script setup>
import BtnComponent from "@/components/atom/BtnComponent.vue"
const props = defineProps({
  headerText: String,
  btnLabel:String
});

const emit = defineEmits(["save"])

const save = () => {
  emit("save")
}
</script>
<template>
  <div class="w-[500px] bg-white shadow-lg mb-5">
    <div class="bg-yellow-main py-4 px-5 rounded-t-md">
      <h1 class="text-xl  font-bold capitalize font-poppins">
        {{ headerText }}
      </h1>
    </div>
    <div class="p-5 flex flex-col gap-6">
      <slot name="inputField"></slot>

      <BtnComponent
      :label="btnLabel"
      primary-color="bg-btn-primary"
      hover-color="hover:bg-btn-hover"
      @someEvent="save"
      />
    </div>
  </div>
</template>
