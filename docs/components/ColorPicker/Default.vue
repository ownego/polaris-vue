<template>
<ColorPicker v-model="color" />
<p :style="{ marginTop: '1rem' }">Color value: {{ color }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const color = ref({
  hue: 120,
  brightness: 1,
  saturation: 1,
});
</script>
