<template>
<TextField
  label="Price"
  type="number"
  v-model="textFieldValue"
  prefix="$"
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('2.00');
</script>
