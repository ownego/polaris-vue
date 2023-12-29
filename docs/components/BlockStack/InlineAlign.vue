<template>
<Page>
  <BlockStack gap="800">
    <BlockStack inlineAlign="start">
      <Placeholder height="48px" width="320px" label="Start" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
    </BlockStack>
    <Divider />
    <BlockStack inlineAlign="center">
      <Placeholder height="48px" width="320px" label="Center" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
    </BlockStack>
    <Divider />
    <BlockStack inlineAlign="end">
      <Placeholder height="48px" width="320px" label="End" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
      <Placeholder height="48px" width="320px" showBorder />
    </BlockStack>
  </BlockStack>
</Page>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
