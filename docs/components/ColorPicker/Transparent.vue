<template>
<ColorPicker v-model="color" allow-alpha />
<p :style="{ marginTop: '1rem' }">Color value: {{ color }}</p>
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
