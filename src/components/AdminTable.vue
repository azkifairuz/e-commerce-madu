<script setup>
import { computed, onMounted, ref } from "vue";

const items = ref([props.data]);
const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const searchKeys = Object.values(item).join("|");
    const regex = new RegExp(searchTerm.value, "i");
    return regex.test(searchKeys);
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage);
});
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage;
  return filteredItems.value.slice(startIndex, endIndex);
});

onMounted(()=>{
    paginatedItems
})

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
});

</script>

<template>
    <div class="container mx-auto">
      <div class="my-4">
        <input
          type="text"
          v-model="searchTerm"
          class="border border-gray-300 rounded px-4 py-2"
          placeholder="Search"
        />
      </div>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b" v-for="column in columns" :key="column.key">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id">
            <td class="py-2 px-4 border-b" v-for="column in columns" :key="column.key">
              {{ item[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center mt-4">
        <nav class="flex items-center">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="px-4 py-2 border border-gray-300 rounded-l hover:bg-gray-200"
          >
            Previous
          </button>
          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="px-4 py-2 border border-gray-300 rounded-r hover:bg-gray-200"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </template>