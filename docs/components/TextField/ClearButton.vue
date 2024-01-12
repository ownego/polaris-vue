<template>
<TextField
  label="Store name"
  v-model="textFieldValue"
  clear-button
  @clear-button-click="handleClearButtonClick"
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('Ownego');

const handleClearButtonClick = () => {
  textFieldValue.value = '';
};
</script>
