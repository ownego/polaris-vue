<template>
<Banner
  title="USPS has updated their rates"
  :action="{ content: 'Update rates', url: '' }"
  :secondaryAction="{ content: 'Learn more'}"
  @dismiss="() => {}"
>
  <Text as="p">
    Make sure you know how these changes affect your store.
  </Text>
</Banner>
</template>
