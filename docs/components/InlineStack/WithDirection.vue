<template>
<BlockStack gap="1600">
  <InlineStack direction="row" align="center">
    <Placeholder width="106px" label="1" />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
  </InlineStack>
  <Divider />
  <InlineStack direction="row-reverse" align="center">
    <Placeholder width="106px" label="1" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" showBorder />
    <Placeholder width="106px" height="20px" />
  </InlineStack>
</BlockStack>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
