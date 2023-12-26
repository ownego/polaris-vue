<template>
<Page>
  <Divider />
  <div style="display: flex; height: 200px">
    <BlockStack align="start">
      <Placeholder height="48px" width="320px" label="Start" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
    </BlockStack>
  </div>
  <Divider />
  <div style="display: flex; height: 200px">
    <BlockStack align="center">
      <Placeholder height="48px" width="320px" label="Center" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
    </BlockStack>
  </div>
  <Divider />
  <div style="display: flex; height: 200px">
    <BlockStack align="end">
      <Placeholder height="48px" width="320px" label="End" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
    </BlockStack>
  </div>
  <Divider />
</Page>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
