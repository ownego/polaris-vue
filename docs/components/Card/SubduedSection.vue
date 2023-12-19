<template>
<Text as="p" variant="bodyMd">
  Waiting for `List` & `ListItem` & `BlockStack` components to be implemented.
</Text>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <Text as="h2" variant="headingSm">
      Staff accounts
    </Text>
    <Box paddingBlockEnd="200">
      <List>
        <List.Item>Felix Crafford</List.Item>
        <List.Item>Ezequiel Manno</List.Item>
      </List>
    </Box>
  </BlockStack>
  <Bleed marginBlockEnd="400" marginInline="400">
    <Box background="bg-surface-secondary" padding="400">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" fontWeight="medium">
          Deactivated staff accounts
        </Text>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </BlockStack>
    </Box>
  </Bleed>
</Card>
</template>

<script setup lang="ts">
</script>
