<template>
<Checkbox
  label="Basic checkbox"
  :checked="checked"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
