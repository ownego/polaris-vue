<template>
<Select
  label="Province"
  :options="['Alberta']"
  v-model="selected"
  error="Province is required"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const selected = ref('');
</script>
