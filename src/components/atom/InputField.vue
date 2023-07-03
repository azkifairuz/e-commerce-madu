<script setup>
import { ref,watch } from "vue";

const props = defineProps({
  label: String,
  value: String,
  placeholder: String,
  typeInput: String,
  name: String,
});

const inputValue = ref(props.value);
watch(inputValue, (newValue) => {
  emit("input", newValue);
});

const handleInput = (event) => {
  inputValue.value = event.target.value;
};


</script>
<template>
  <div class="mb-6">
    <label :for="name" class="block mb-2 text-lg font-medium text-gray-900">{{
      label
    }}</label>
    <input
      :type="typeInput"
      :id="name"
      :name="name"
      v-model="inputValue"
      @input="handleInput"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :placeholder="placeholder"
      required
    />
  </div>
</template>
