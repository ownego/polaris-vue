<template>
<div :style="wrapperStyle">
  <BlockStack gap="500">
    <div :style="innerBlockStackStyle"></div>
    <div :style="innerBlockStackStyle"></div>
    <div :style="innerBlockStackStyle"></div>
  </BlockStack>
</div>
</template>

<script setup lang="ts">
const wrapperStyle = {
  background: 'var(--p-color-bg-surface-success)',
  height: 'auto',
};

const innerBlockStackStyle = {
  background: 'var(--p-color-text-info)',
  padding: '14px var(--p-space-200)',
  height: '48px',
};
</script>

