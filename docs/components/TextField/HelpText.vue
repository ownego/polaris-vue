<template>
<TextField
  label="Account email"
  type="email"
  v-model="textFieldValue"
  helpText="We'll use this address if we need to contact you about your account."
  autoComplete="email"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('contact@teeinblue.com');
</script>
