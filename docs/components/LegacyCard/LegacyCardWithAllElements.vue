<template>
  <LegacyCard
    :secondaryFooterActions="[{ content: 'Dismiss' }]"
    :primaryFooterAction="{ content: 'Export Report' }"
  >
    <LegacyCardHeader
      title="Sales"
      :actions="[{ content: 'Total Sales' }]"
    >
      <Popover :active="false" @close="() => {}">
        <template #activator>
          <Button disclosure variant="plain">
            View Sales
          </Button>
        </template>
      <ActionList :items="[{content: 'Gross Sales' }, {content: 'Net Sales' }]" />
    </Popover>
  </LegacyCardHeader>
  <LegacyCardSection>
    <TextContainer>
      You can use sales reports to see information about your customers’
      orders based on criteria such as sales over time, by channel, or by
      staff.
    </TextContainer>
  </LegacyCardSection>
  <LegacyCardSection title="Total Sales Breakdown">
    <ResourceList
      :resourceName="{ singular: 'sale', plural: 'sales' }"
      :items="items"
    >
      <template
        v-for="{sales, amount, url} in items"
        :key="sales"
      >
        <ResourceItem
          :id="sales.toLocaleLowerCase()"
          :url="url"
          accessibilityLabel="View Sales for ${sales}"
          @click="() => console.log('clicked item', sales)"
        >
          <LegacyStack>
            <LegacyStackItem fill>{{ sales }} </LegacyStackItem>
            <LegacyStackItem>{{ amount }}</LegacyStackItem>
          </LegacyStack>
        </ResourceItem>
      </template>
    </ResourceList>
  </LegacyCardSection>
  <LegacyCardSection title="Deactivated reports" subdued>
    <List>
      <ListItem>Payouts</ListItem>
      <ListItem>Total Sales By Channel</ListItem>
    </List>
  </LegacyCardSection>
  <LegacyCardSection title="Note">
    <TextContainer>
      The sales reports are available only if your store is on the Shopify
      plan or higher.
    </TextContainer>
  </LegacyCardSection>
</LegacyCard>
</template>

<script setup lang="ts">
const items = [
  {
    sales: 'Orders',
    amount: 'USD$0.00',
    url: '#',
  },
  {
    sales: 'Returns',
    amount: '-USD$250.00',
    url: '#',
  },
];
</script>
