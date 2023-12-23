<template>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <InlineGrid columns="1fr auto">
      <Text as="h2" variant="headingSm">
        Variants
      </Text>
      <Button
        variant="plain"
        accessibilityLabel="Add variant"
        @click="() => {}"
      >
        Add variant
      </Button>
    </InlineGrid>
    <Text as="p" variant="bodyMd">
      Add variants if this product comes in multiple versions, like
      different sizes or colors.
    </Text>
  </BlockStack>
</Card>
</template>

<script setup lang="ts">
</script>
