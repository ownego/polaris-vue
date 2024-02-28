<template>
<div :style="{width: '430px'}">
  <LegacyCard>
    <IndexTable
      condensed
      :resourceName="resourceName"
      :itemCount="orders.length"
      :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
      @selection-change="handleSelectionChange"
      :headings="[
        {title: 'Order'},
        {title: 'Date'},
        {title: 'Customer'},
        {title: 'Total', alignment: 'end'},
        {title: 'Payment status'},
        {title: 'Fulfillment status'},
      ]"
    >
      <IndexTableRow
        v-for="{ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index in orders"
        :id="id"
        :key="id"
        :position="index"
        :selected="selectedResources.includes(id)"
      >
        <div :style="{padding: '12px 16px', width: '100%'}">
          <BlockStack gap="100">
            <Text as="span" variant="bodySm" tone="subdued">
              {{ order }} • {{ date }}
            </Text>
            <InlineStack align="space-between">
              <Text as="span" variant="bodyMd" fontWeight="semibold">
                {{ customer }}
              </Text>
              <Text as="span" variant="bodyMd">
                {{ total }}
              </Text>
            </InlineStack>
            <InlineStack align="start" gap="100">
              <component :is="paymentStatus" />
              <component :is="fulfillmentStatus" />
            </InlineStack>
          </BlockStack>
        </div>
      </IndexTableRow>
    </IndexTable>
  </LegacyCard>
</div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
// import { useIndexResourceState } from '@ownego/polaris-vue';
import { useIndexResourceState } from '@/polaris-vue';

const orders = [
  {
    id: '1020',
    order: '#1020',
    date: 'Jul 20 at 4:34pm',
    customer: 'Jaydon Stanton',
    total: '$969.44',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'complete' }, () => 'Paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
  },
  {
    id: '1019',
    order: '#1019',
    date: 'Jul 20 at 3:46pm',
    customer: 'Ruben Westerfelt',
    total: '$701.19',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'partiallyComplete' }, () => 'Partially paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
  },
  {
    id: '1018',
    order: '#1018',
    date: 'Jul 20 at 3.44pm',
    customer: 'Leo Carder',
    total: '$798.24',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'complete' }, () => 'Paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
  },
];
const resourceName = {
  singular: 'order',
  plural: 'orders',
};

const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(orders);
</script>
