<template>
<LegacyCard>
  <IndexTable
    :resourceName="resourceName"
    :itemCount="orders.length"
    :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
    :headings="[
      {title: 'Order'},
      {title: 'Date'},
      {title: 'Customer'},
      {title: 'Total', alignment: 'end'},
      {title: 'Payment status'},
      {title: 'Fulfillment status'},
    ]"
    :bulkActions="bulkActions"
    :promotedBulkActions="promotedBulkActions"
    @selection-change="handleSelectionChange"
  >
    <IndexTableRow
      v-for="{ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index in orders"
      :id="id"
      :key="id"
      :position="index"
      :selected="selectedResources.includes(id)"
    >
      <IndexTableCell>
        <Text variant="bodyMd" fontWeight="bold" as="span">{{ order }}</Text>
      </IndexTableCell>
      <IndexTableCell>{{ date }}</IndexTableCell>
      <IndexTableCell>{{ customer }}</IndexTableCell>
      <IndexTableCell>
        <Text as="span" alignment="end" numeric>{{ total }}</Text>
      </IndexTableCell>
      <IndexTableCell>
        <component :is="paymentStatus"></component>
      </IndexTableCell>
      <IndexTableCell>
        <component :is="fulfillmentStatus"></component>
      </IndexTableCell>
    </IndexTableRow>
  </IndexTable>
</LegacyCard>
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

const promotedBulkActions = [
  {
    content: 'Create shipping labels',
    onAction: () => console.log('Todo: implement bulk edit'),
  },
];
const bulkActions = [
  {
    content: 'Add tags',
    onAction: () => console.log('Todo: implement bulk add tags'),
  },
  {
    content: 'Remove tags',
    onAction: () => console.log('Todo: implement bulk remove tags'),
  },
  {
    content: 'Delete orders',
    onAction: () => console.log('Todo: implement bulk delete'),
  },
];
</script>
