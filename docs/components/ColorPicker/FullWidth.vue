<template>
<div :style="{ width: '100%' }">
  <ColorPicker v-model="color" full-width allow-alpha />
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const color = ref({
  hue: 300,
  brightness: 1,
  saturation: 0.7,
  alpha: 0.7,
});
</script>
