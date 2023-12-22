<template>
<Page narrow-width>
  <BlockStack :gap="800">
    <InlineStack blockAlign="start">
      <Placeholder width="106px" label="Start" />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
    </InlineStack>
    <Divider />
    <InlineStack blockAlign="center">
      <Placeholder width="106px" label="Center" />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
    </InlineStack>
    <Divider />
    <InlineStack blockAlign="end">
      <Placeholder width="106px" label="End" />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
    </InlineStack>
    <Divider />
    <InlineStack blockAlign="baseline">
      <Placeholder width="106px" label="Baseline" />
      <Placeholder width="106px" padding="0" label="text" showBorder />
      <Placeholder width="106px" padding="0" label="text" showBorder />
      <Placeholder width="106px" padding="0" label="text" showBorder />
      <Placeholder width="106px" padding="0" label="text" showBorder />
      <Placeholder width="106px" padding="0" label="text" showBorder />
    </InlineStack>
    <Divider />
    <InlineStack blockAlign="stretch">
      <Placeholder width="106px" label="Stretch" />
      <Placeholder width="106px" minHeight="20px" showBorder />
      <Placeholder width="106px" minHeight="20px" showBorder />
      <Placeholder width="106px" minHeight="20px" showBorder />
      <Placeholder width="106px" minHeight="20px" showBorder />
      <Placeholder width="106px" minHeight="20px" showBorder />
    </InlineStack>
  </BlockStack>
</Page>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue'
</script>
