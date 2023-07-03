<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
  Value: String,
  placeholder: String,
  typeInput: String,
  for:String,
  name:String,
});
const inputValue = ref(props.Value);
watch(inputValue, (newValue) => {
      emit("input", newValue);
});

</script>
<template>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">{{
      label
    }}</label>
    <input
      :type=typeInput
      :id= name
      v-model= "inputValue"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :placeholder=placeholder
      required
    />
  </div>
</template>
