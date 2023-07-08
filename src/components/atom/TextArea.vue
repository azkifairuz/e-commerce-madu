<script setup>

const props = defineProps({
  label: String,
  placeholder: String,
  name: String,
  modelValue: String | Number,
});

const emit = defineEmits(['update:modelValue']);
</script>
<template>
  <div class="mb-6">
    <label :for="name" class="block mb-2 text-lg font-medium text-gray-900">{{
      label
    }}</label>
    <textarea
      :name="name"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :placeholder="placeholder"
      required
    ></textarea>
  </div>
</template>


