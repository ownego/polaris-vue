<template>
<Page narrow-width>
  <BlockStack gap="1600">
    <InlineStack align="start">
      <Placeholder width="106px" label="Start" />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border-top />
      <Placeholder width="106px" height="20px" show-border />
    </InlineStack>
    <Divider />
    <InlineStack align="center">
      <Placeholder width="106px" label="Center" />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" />
      <Placeholder width="106px" height="20px" show-border />
    </InlineStack>
    <Divider />
    <InlineStack align="end">
      <Placeholder width="106px" label="End" />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" />
      <Placeholder width="106px" height="20px" show-border />
    </InlineStack>
  </BlockStack>
</Page>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
