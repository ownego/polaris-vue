<template>
<TextField
  label="Store name"
  v-model="inputValue"
  autoComplete="off"
  clearButton
  @clear-button-click="handleClearButtonClick"
  loading
/>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('Ownego');

const handleClearButtonClick = () => {
  inputValue.value = '';
};
</script>
