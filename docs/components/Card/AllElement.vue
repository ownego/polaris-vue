<template>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <InlineGrid columns="1fr auto">
      <Text as="h2" variant="headingSm">
        Sales
      </Text>
      <ButtonGroup>
        <Button variant="plain">Total Sales</Button>
        <Popover
          :active="actionActive"
          @close="handleToggleAction"
        >
          <ActionList :items="items" />
          <template #activator>
            <Button variant="plain" disclosure @click="handleToggleAction">
              View Sales
            </Button>
          </template>
    </Popover>
      </ButtonGroup>
    </InlineGrid>
    <BlockStack gap="400">
      <Text as="p" variant="bodyMd">
        You can use sales reports to see information about your customers’
        orders based on criteria such as sales over time, by channel, or by
        staff.
      </Text>
      <Text as="h3" variant="headingSm" fontWeight="medium">
        Total Sales Breakdown
      </Text>
    </BlockStack>
    <div>
      <ResourceList :resourceName="{singular: 'sale', plural: 'sales'}">
        <ResourceItem
          v-for="item in resourceItems"
          :key="item.sales"
          :id="item.sales"
          :url="item.url"
          :accessibilityLabel="`View Sales for ${item.sales}`"
        >
          <InlineStack align="space-between">
            <div>{{ item.sales }}</div>
            <div>{{ item.amount }}</div>
          </InlineStack>
        </ResourceItem>
      </ResourceList>
    </div>
    <Bleed marginInline="400">
      <Box
        background="bg-surface-secondary"
        paddingBlock="300"
        paddingInline="400"
      >
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Deactivated reports
          </Text>
          <List>
            <ListItem>Payouts</ListItem>
            <ListItem>Total Sales By Channel</ListItem>
          </List>
        </BlockStack>
      </Box>
    </Bleed>
    <BlockStack gap="200">
      <Text as="h3" variant="headingSm" fontWeight="medium">
        Note
      </Text>
      <Text as="p" variant="bodyMd">
        The sales reports are available only if your store is on the Shopify
        plan or higher.
      </Text>
      <InlineStack align="end">
        <ButtonGroup>
          <Button @click="() => {}" accessibilityLabel="Dismiss">
            Dismiss
          </Button>
          <Button
            variant="primary"
            @click="() => {}"
            accessibilityLabel="Export Report"
          >
            Export Report
          </Button>
        </ButtonGroup>
      </InlineStack>
    </BlockStack>
  </BlockStack>
</Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = [{content: 'Gross Sales'}, {content: 'Net Sales'}];

const resourceItems = [
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

const actionActive = ref(false);

const handleToggleAction = () => {
  actionActive.value = !actionActive.value;
};
</script>
