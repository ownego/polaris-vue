<template>
<LegacyCard
  title="Shipment 1234"
  :secondaryFooterActions="[{ content: 'Edit shipment' }]"
  :primaryFooterAction="{content: 'Add tracking number'}"
>
  <LegacyCardSection title="Items">
    <List>
      <ListItem>1 × Oasis Glass, 4-Pack</ListItem>
      <ListItem>1 × Anubis Cup, 2-Pack</ListItem>
    </List>
  </LegacyCardSection>
</LegacyCard>
</template>
