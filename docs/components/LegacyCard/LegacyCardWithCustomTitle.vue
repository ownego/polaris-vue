<template>
<LegacyCard title="Products">
  <LegacyCardSection>
    <template #title>
      <LegacyStack>
        <Icon :source="ProductIcon" />
        <Text variant="headingSm" as="h3">
          New Products
        </Text>
      </LegacyStack>
    </template>
    <List>
      <ListItem>Socks</ListItem>
      <ListItem>Super Shoes</ListItem>
    </List>
  </LegacyCardSection>
</LegacyCard>
</template>

<script setup lang="ts">
import ProductIcon from '@icons/ProductIcon.svg';
</script>
