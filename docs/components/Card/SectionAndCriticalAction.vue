<template>
<Card roundedAbove="sm">
  <BlockStack gap="400">
    <BlockStack gap="200">
      <Text as="h2" variant="headingSm">
        Customer
      </Text>
      <Text as="p" variant="bodyMd">
        John Smith
      </Text>
    </BlockStack>
    <BlockStack gap="200">
      <InlineGrid columns="1fr auto">
        <Text as="h3" variant="headingSm" fontWeight="medium">
          Contact Information
        </Text>
        <ButtonGroup>
          <Button
            variant="plain"
            tone="critical"
            accessibilityLabel="Delete"
            @Click="() => {}"
          >
            Delete
          </Button>
          <Button
            variant="plain"
            accessibilityLabel="Edit"
            @Click="() => {}"
          >
            Edit
          </Button>
        </ButtonGroup>
      </InlineGrid>
      <Text as="p" variant="bodyMd">
        john.smith@example.com
      </Text>
    </BlockStack>
  </BlockStack>
</Card>
</template>

<script setup lang="ts">
</script>
