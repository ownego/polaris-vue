<template>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <Text as="h2" variant="headingSm">
      Shipment 1234
    </Text>
    <BlockStack gap="200">
      <Text as="h3" variant="headingSm" fontWeight="medium">
        Items
      </Text>
      <List>
        <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
        <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
      </List>
    </BlockStack>
    <InlineStack align="end">
      <ButtonGroup>
        <Button @click="() => {}" accessibilityLabel="Edit shipment">
          Edit shipment
        </Button>
        <Button
          variant="primary"
          accessibilityLabel="Add tracking number"
          @click="() => {}"
        >
          Add tracking number
        </Button>
      </ButtonGroup>
    </InlineStack>
  </BlockStack>
</Card>
</template>

<script setup lang="ts">
</script>
