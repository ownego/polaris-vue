<template>
<Select
  label="Date range"
  :options="options"
  v-model="selected"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('today');

const options = [
  {label: 'Today', value: 'today'},
  {label: 'Yesterday', value: 'yesterday'},
  {label: 'Last 7 days', value: 'lastWeek'},
];
</script>
