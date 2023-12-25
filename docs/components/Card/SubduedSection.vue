<template>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <Text as="h2" variant="headingSm">
      Staff accounts
    </Text>
    <Box paddingBlockEnd="200">
      <List>
        <ListItem>Felix Crafford</ListItem>
        <ListItem>Ezequiel Manno</ListItem>
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
          <ListItem>Felix Crafford</ListItem>
          <ListItem>Ezequiel Manno</ListItem>
        </List>
      </BlockStack>
    </Box>
  </Bleed>
</Card>
</template>
