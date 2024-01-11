<template>
<TextField
  label="Shipping zone name"
  v-model="textFieldValue"
  placeholder="Example: North America, Europe"
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('');
</script>
