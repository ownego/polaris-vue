<template>
<TextField
  label="Store name"
  v-model="value"
  autoComplete="off"
  autoSize
  suffix="in: Your stores"
/>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Ownego');
</script>
