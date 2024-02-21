<template>
<Page
  title="Products"
  :actionGroups="[
    {
      title: 'Copy',
      onClick: () => {
        console.log('Copy action');
      },
      actions: [{ content: 'Copy to clipboard' }],
    },
    {
      title: 'Promote',
      disabled: true,
      actions: [{ content: 'Share on Facebook' }],
    },
    {
      title: 'More actions',
      actions: [
        { content: 'Duplicate' },
        { content: 'Print' },
        { content: 'Unarchive' },
        { content: 'Cancel order' },
      ],
    },
  ]"
>
  <LegacyCard title="Credit card" sectioned>
    <Text as="p">Credit card information</Text>
  </LegacyCard>
</Page>
</template>
