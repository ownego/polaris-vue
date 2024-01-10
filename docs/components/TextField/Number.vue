<template>
<TextField
  type="number"
  label="Quantity"
  v-model="value"
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('1');
</script>
