<template>
<BlockStack gap="400">
  <div :style="{ width: '586px' }">
    <Box padding="400" width="586px" background="bg-fill-info">
      <Placeholder label="padding" childAlign="center" />
    </Box>
  </div>
  <InlineStack gap="400">
    <Box paddingInline="400" width="586px" background="bg-fill-info">
      <Placeholder label="paddingInline" childAlign="center" />
    </Box>
    <Box paddingInlineStart="400" width="284px" background="bg-fill-info">
      <Placeholder label="paddingInlineStart" childAlign="start" />
    </Box>
    <Box paddingInlineEnd="400" width="284px" background="bg-fill-info">
      <Placeholder label="paddingInlineEnd" childAlign="end" />
    </Box>
  </InlineStack>
  <InlineStack gap="400">
    <Box paddingBlock="400" width="586px" background="bg-fill-info">
      <Placeholder label="paddingBlock" childAlign="center" />
    </Box>
    <Box paddingBlockStart="400" width="284px" background="bg-fill-info">
      <Placeholder label="paddingBlockStart" childAlign="center" />
    </Box>
    <Box paddingBlockEnd="400" width="284px" background="bg-fill-info">
      <Placeholder label="paddingBlockEnd" childAlign="center" />
    </Box>
  </InlineStack>
</BlockStack>
</template>

<script setup lang="ts">
import Placeholder from './Placeholder.vue';
</script>
