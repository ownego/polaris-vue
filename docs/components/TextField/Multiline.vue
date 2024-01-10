<template>
<TextField
  label="Shipping address"
  v-model="value"
  :multiline="4"
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('1776 Barnes Street\nOrlando, FL 32801');
</script>
