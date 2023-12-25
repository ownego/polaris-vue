<template>
<div
  :style="spacingStyle"
>
  <InlineGrid gap="400" :columns="3">
    <Placeholder height="320px" />
    <Placeholder height="320px" />
    <Placeholder height="320px" />
  </InlineGrid>
</div>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';

const spacingStyle = {
  background: 'var(--p-color-bg-surface-success)',
  width: '100%',
  height: 'auto',
}
</script>
