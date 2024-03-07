<template>
<BlockStack>
  <InlineStack>
    <div :style="spacingStyleWithMargin">
      <InlineStack gap="400" :wrap="false" block-align="center">
        <Placeholder width="106px" height="36px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </InlineStack>
    </div>
  </InlineStack>
  <div :style="spacingStyleNoMargin">
    <InlineStack gap="400" :wrap="false" block-align="end">
      <Placeholder width="106px" height="20px" />
      <Placeholder width="106px" height="20px" />
    </InlineStack>
  </div>
</BlockStack>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
const spacingStyleWithMargin = {
  display: 'flex',
  background: 'var(--p-color-bg-surface-success)',
  width: '436px',
  height: '20px',
  marginBlockEnd: '8px',
};

const spacingStyleNoMargin = {
  display: 'flex',
  background: 'var(--p-color-bg-surface-success)',
  width: '227.98px',
  height: '40px',
  marginBlockEnd: 'none',
};
</script>
