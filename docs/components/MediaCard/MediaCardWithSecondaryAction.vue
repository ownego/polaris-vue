<template>
<MediaCard
  title="Getting Started"
  description="Discover how Shopify can power up your entrepreneurial journey."
  :primaryAction="{ content: 'Add a product', onAction: () => {} }"
  :secondaryAction="{ content: 'Learn more', onAction: () => {} }"
  :popoverActions="[{ content: 'Dismiss', onAction: () => {} }]"
>
  <img
    alt=""
    width="100%"
    height="100%"
    src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
    :style="{ objectFit: 'cover', objectPosition: 'center' }"
  />
</MediaCard>
</template>
