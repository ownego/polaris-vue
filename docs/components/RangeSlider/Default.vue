<template>
<LegacyCard sectioned title="Background color">
  <RangeSlider
    label="Opacity percentage"
    v-model="rangeValue"
    output
  />
</LegacyCard>

<p>{{ rangeValue }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rangeValue = ref(32);
</script>
