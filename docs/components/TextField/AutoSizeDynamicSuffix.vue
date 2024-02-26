<template>
<TextField
  label="Search view"
  v-model="inputValue"
  autoComplete="off"
  autoSize
  placeholder="Searching in Unfulfilled orders"
  :suffix="suffix"
/>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const inputValue = ref('Ownego');

const suffix = computed(() => inputValue.value ? 'in: Unfulfilled orders' : null);
</script>
