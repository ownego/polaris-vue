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
  <!-- TODO -->
  <!-- <LegacyCardSection title="Total Sales Breakdown">
    <ResourceList
      resourceName={{singular: 'sale', plural: 'sales'}}
      items={[
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
      ]}
      renderItem={(item) => {
        const {sales, amount, url} = item;
        return (
          <ResourceList.Item
            id={sales.toLocaleLowerCase()}
            url={url}
            accessibilityLabel={`View Sales for ${sales}`}
            onClick={() => console.log('clicked item', item)}
          >
            <LegacyStack>
              <LegacyStack.Item fill>{sales}</LegacyStack.Item>
              <LegacyStack.Item>{amount}</LegacyStack.Item>
            </LegacyStack>
          </ResourceList.Item>
        );
      }}
    />
  </LegacyCardSection> -->
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
