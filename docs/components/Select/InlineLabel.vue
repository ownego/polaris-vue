<template>
<Select
  label="Sort by"
  label-inline
  :options="options"
  v-model="selected"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('newestUpdate');

const options = [
  {label: 'Newest update', value: 'newestUpdate'},
  {label: 'Oldest update', value: 'oldestUpdate'},
  {label: 'Most spent', value: 'mostSpent'},
  {label: 'Most orders', value: 'mostOrders'},
  {label: 'Last name A-Z', value: 'lastNameAlpha'},
  {label: 'Last name Z-A', value: 'lastNameReverseAlpha'},
];
</script>
