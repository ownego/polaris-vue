<template>
<TextField
  label="Store name"
  v-model="textFieldValue"
  :max-length="20"
  autoComplete="off"
  show-character-count
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('Ownego');
</script>
