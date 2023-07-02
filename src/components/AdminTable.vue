<script setup>
defineProps({
  tableHeader: Array,
  tableData: Array,
})
</script>
<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr v-for="item in tableHeader" :key="item.id">
                <th scope="col" class="px-6 py-3">
                    {{item.title}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in tableData" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ item.name }}
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>