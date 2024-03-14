<template>
<Box paddingBlockEnd="400">
  <BlockStack gap="200">
    <LegacyCard>
      <IndexTable
        :resourceName="resourceName"
        :itemCount="orders.length"
        :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
        @selection-change="handleSelectionChange"
        :headings="[
          {title: 'Name'},
          {title: 'Location'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Item count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
          {title: 'Channel'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
          {title: 'Tags'},
        ]"
      >
        <IndexTableRow
          v-for="{ id, name, location, items, amountSpent, channel, paymentStatus, fulfillmentStatus, tags }, index in orders"
          :id="id"
          :key="id"
          :position="index"
          :selected="selectedResources.includes(id)"
        >
          <IndexTableCell>
            <Text fontWeight="bold" as="span">{{ name }}</Text>
          </IndexTableCell>
          <IndexTableCell>{{ location }}</IndexTableCell>
          <IndexTableCell>{{ items }}</IndexTableCell>
          <IndexTableCell>
            <Text as="span" alignment="end" numeric>{{ amountSpent }}</Text>
          </IndexTableCell>
          <IndexTableCell>{{ channel }}</IndexTableCell>
          <IndexTableCell>
            <component :is="paymentStatus"></component>
          </IndexTableCell>
          <IndexTableCell>
            <component :is="fulfillmentStatus"></component>
          </IndexTableCell>
          <IndexTableCell>{{ tags }}</IndexTableCell>
        </IndexTableRow>
      </IndexTable>
    </LegacyCard>
  </BlockStack>
</Box>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
// import { useIndexResourceState } from '@ownego/polaris-vue';
import { useIndexResourceState } from '@/polaris-vue';

const orders = [
  {
    id: `0001`,
    name: `Mae Jemison`,
    location: 'Truth or Consequences, United States of America',
    items: 20,
    amountSpent: '$24.00',
    channel: 'Point of sale',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'complete' }, () => 'Paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
    tags: 'No tags applied',
  },
  {
    id: `0002`,
    name: `Jaydon Stanton`,
    location: 'Portland, United States of America',
    items: 15,
    amountSpent: '$359.10',
    channel: 'Point of sale',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'partiallyComplete' }, () => 'Partially paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
    tags: 'No tags applied',
  },
  {
    id: `0003`,
    name: `Leo Cardner`,
    location: 'Toronto, Canada',
    items: 3,
    amountSpent: '$15.99',
    channel: 'Point of sale',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'complete' }, () => 'Paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
    tags: 'No tags applied',
  },
];

const resourceName = {
  singular: 'order',
  plural: 'orders',
};

const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(orders);
</script>
