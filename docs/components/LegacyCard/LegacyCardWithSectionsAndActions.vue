<template>
<LegacyCard title="Customer">
  <LegacyCardSection>
    <Text as="p">John Smith</Text>
  </LegacyCardSection>

  <LegacyCardSection
    title="Contact Information"
    :actions="[{content: 'Edit'}]"
  >
    <Text as="p">
        john.smith@example.com
    </Text>
  </LegacyCardSection>
</LegacyCard>
</template>
