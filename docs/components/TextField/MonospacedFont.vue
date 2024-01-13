<template>
<TextField
  label="Store name"
  v-model="textFieldValue"
  monospaced
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('Teeinblue');
</script>
