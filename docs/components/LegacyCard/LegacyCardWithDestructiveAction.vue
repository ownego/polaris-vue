<template>
<LegacyCard title="Customer">
  <LegacyCardSection title="Reports">
    <Text as="p">John Smith</Text>
  </LegacyCardSection>

  <LegacyCardSection
    title="Contact Information"
    :actions="[
      { content: 'Delete', destructive: true },
      { content: 'Edit' },
    ]"
  >
    <Text as="p">john.smith@example.com</Text>
  </LegacyCardSection>
</LegacyCard>
</template>
