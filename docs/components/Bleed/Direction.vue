<template>
<BlockStack gap="600">
  <Card>
    <Bleed margin-inline-start="800">
      <Placeholder label="marginInlineStart" />
    </Bleed>
  </Card>
  <Card>
    <Bleed margin-inline-end="800">
      <Placeholder label="marginInlineEnd" />
    </Bleed>
  </Card>
  <Card>
    <Bleed margin-block-start="800">
      <Placeholder label="marginBlockStart" />
    </Bleed>
  </Card>
  <Card>
    <Bleed margin-block-end="800">
      <Placeholder label="marginBlockEnd" />
    </Bleed>
  </Card>
</BlockStack>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
