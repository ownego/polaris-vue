<template>
<LegacyCard sectioned title="Navigation branding">
  <RangeSlider
    output
    label="Logo offset"
    :min="-20"
    :max="20"
    v-model="rangeValue"
  />
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rangeValue = ref(0);
</script>
