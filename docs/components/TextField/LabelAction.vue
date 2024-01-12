<template>
<TextField
  label="Tariff code"
  v-model="textFieldValue"
  :label-action="{content: 'Look up codes'}"
  autoComplete="off"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('6201.11.0000');
</script>
