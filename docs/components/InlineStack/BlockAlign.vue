<template>
<Page narrow-width>
  <BlockStack :gap="800">
    <InlineStack block-align="start">
      <Placeholder width="106px" label="Start" />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border/>
    </InlineStack>
    <Divider />
    <InlineStack block-align="center">
      <Placeholder width="106px" label="Center" />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
    </InlineStack>
    <Divider />
    <InlineStack block-align="end">
      <Placeholder width="106px" label="End" />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
      <Placeholder width="106px" height="20px" show-border />
    </InlineStack>
    <Divider />
    <InlineStack block-align="baseline">
      <Placeholder width="106px" label="Baseline" />
      <Placeholder width="106px" padding="0" label="text" show-border />
      <Placeholder width="106px" padding="0" label="text" show-border />
      <Placeholder width="106px" padding="0" label="text" show-border />
      <Placeholder width="106px" padding="0" label="text" show-border />
      <Placeholder width="106px" padding="0" label="text" show-border />
    </InlineStack>
    <Divider />
    <InlineStack block-align="stretch">
      <Placeholder width="106px" label="Stretch" />
      <Placeholder width="106px" minHeight="20px" show-border />
      <Placeholder width="106px" minHeight="20px" show-border />
      <Placeholder width="106px" minHeight="20px" show-border />
      <Placeholder width="106px" minHeight="20px" show-border />
      <Placeholder width="106px" minHeight="20px" show-border />
    </InlineStack>
  </BlockStack>
</Page>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue'
</script>
