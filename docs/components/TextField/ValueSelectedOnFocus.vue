<template>
<TextField
  label="Store name"
  v-model="textFieldValue"
  select-text-on-focus
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('Qikify');
</script>
