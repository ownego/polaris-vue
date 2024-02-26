<template>
<Page
  narrowWidth
  title="Add payment method"
  :backAction="{ content: 'Orders', url: '#' }"
  :primaryAction="{ content: 'Save', disabled: true }"
>
  <LegacyCard title="Credit card" sectioned>
    <Text as="p">Credit card information</Text>
  </LegacyCard>
  <PageActions
    :primaryAction="{ content: 'Save', disabled: true }"
    :secondaryActions="[{ content: 'Delete' }]"
  />
</Page>
</template>
