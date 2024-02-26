<template>
<Page
  :backAction="{ content: 'Settings', url: '#' }"
  title="General"
>
  <template #primaryAction>
    <Button variant="primary">Save</Button>
  </template>

  <LegacyCard title="Credit card" sectioned>
    <Text as="p">Credit card information</Text>
  </LegacyCard>
</Page>
</template>
