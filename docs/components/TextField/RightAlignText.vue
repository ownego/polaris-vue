<template>
<LegacyStack>
  <LegacyStackItem fill>Price</LegacyStackItem>
  <TextField
    label="Price"
    label-hidden
    v-model="textFieldValue"
    autoComplete="off"
    align="right"
  />
</LegacyStack>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('1');
</script>
