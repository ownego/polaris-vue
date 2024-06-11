<template>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <InlineGrid columns="1fr auto">
      <Text as="h2" variant="headingSm">
        Variants
      </Text>
      <Button
      accessibilityLabel="Export variants"
      :icon="ExportIcon"
      @click="{}"
      />
    </InlineGrid>
    <Text as="p" variant="bodyMd">
      Export variants
    </Text>
  </BlockStack>
</Card>
</template>

<script setup lang="ts">
import ExportIcon from '@icons/ExportIcon.svg';
</script>
