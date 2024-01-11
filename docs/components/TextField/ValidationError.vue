<template>
<TextField
  label="Store name"
  v-model="textFieldValue"
  error="Store name is required"
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('');
</script>
