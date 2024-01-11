<template>
<Checkbox
  label="Basic checkbox"
  v-model="checked"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
