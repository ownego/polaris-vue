<template>
<Page
  :backAction="{ content: 'Settings', url: '#' }"
  title="#1085"
  :secondaryActions="[
    {content: 'Print'},
    {content: 'Unarchive'},
    {content: 'Cancel order'},
  ]"
  :pagination="{
    hasPrevious: true,
    hasNext: true,
  }"
>
  <LegacyCard sectioned title="Fulfill order">
    <LegacyStack alignment="center">
      <LegacyStackItem fill>
        <p>Buy postage and ship remaining 2 items</p>
      </LegacyStackItem>
      <Button variant="primary">Continue</Button>
    </LegacyStack>
  </LegacyCard>
</Page>
</template>
