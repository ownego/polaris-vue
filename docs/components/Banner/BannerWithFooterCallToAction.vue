<template>
<Banner
  title="Some of your product variants are missing weights"
  tone="warning"
  :action="{ content: 'Edit variant weights', url: '' }"
  :secondaryAction="{ content: 'View all variants', url: '' }"
  @dismiss="() => { }"
>
  <Text as="p">
    Add weights to show accurate rates at checkout and when buying shipping labels in Shopify.
  </Text>
</Banner>
</template>
