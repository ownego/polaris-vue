<template>
<BlockStack gap="600">
  <Card>
    <Bleed marginInlineStart="800">
      <Placeholder label="marginInlineStart" />
    </Bleed>
  </Card>
  <Card>
    <Bleed marginInlineEnd="800">
      <Placeholder label="marginInlineEnd" />
    </Bleed>
  </Card>
  <Card>
    <Bleed marginBlockStart="800">
      <Placeholder label="marginBlockStart" />
    </Bleed>
  </Card>
  <Card>
    <Bleed marginBlockEnd="800">
      <Placeholder label="marginBlockEnd" />
    </Bleed>
  </Card>
</BlockStack>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
