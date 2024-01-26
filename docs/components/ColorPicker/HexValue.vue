<template>
<ColorPicker v-model="color" output="hex" />
<p :style="{ marginTop: '1rem' }">Color value: {{ color }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const color = ref('#3355aa');
</script>
