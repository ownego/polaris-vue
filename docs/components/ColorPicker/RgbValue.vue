<template>
<ColorPicker v-model="color" output="rgb" allow-alpha />
<p :style="{ marginTop: '1rem' }">Color value: {{ color }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const color = ref('rgb(255, 0, 0)');
</script>
