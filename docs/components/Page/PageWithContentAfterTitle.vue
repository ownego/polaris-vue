<template>
<Page
  title="Jar With Lock-Lid"
  :backAction="{ content: 'Products', url: '#' }"
  :primaryAction="{ content: 'Save', disabled: true }"
  :secondaryActions="[
    { content: 'Duplicate' },
    { content: 'View on your store' },
  ]"
  :pagination="{
    hasPrevious: true,
    hasNext: true,
  }"
>
  <template #pageTitle>
    <Badge tone="attention">Verified</Badge>
  </template>
  <LegacyCard title="Credit card" sectioned>
    <Text as="p">Credit card information</Text>
  </LegacyCard>
</Page>
</template>
