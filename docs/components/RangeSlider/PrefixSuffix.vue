<template>
<LegacyCard sectioned title="Text color">
  <RangeSlider
    output
    label="Hue color mix"
    :min="0"
    :max="360"
    v-model="rangeValue"
    prefix="Hue"
  >
    <template #suffix>
      <p :style="{ minWidth: '24px', textAlign: 'right' }">{{ rangeValue }}</p>
    </template>
  </RangeSlider>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const rangeValue = ref(100);
</script>
