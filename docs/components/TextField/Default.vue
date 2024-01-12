<template>
<TextField
  label="Store name"
  v-model="value"
  autoComplete="off"
/>
<p>Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Teeinblue');
</script>
