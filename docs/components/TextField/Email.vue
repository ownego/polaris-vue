<template>
<TextField
  type="email"
  label="Email"
  v-model="value"
  autoComplete="email"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('contact@qikify.com');
</script>
