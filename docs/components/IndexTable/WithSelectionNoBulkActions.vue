<template>
<LegacyCard>
  <IndexTable
    :condensed="smDown"
    :resourceName="resourceName"
    :itemCount="customers.length"
    :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
    @selection-change="handleSelectionChange"
    :headings="[
      {title: 'Name'},
      {title: 'Location'},
      {
        alignment: 'end',
        id: 'order-count',
        title: 'Order count',
      },
      {
        alignment: 'end',
        id: 'amount-spent',
        title: 'Amount spent',
      },
    ]"
  >
    <IndexTableRow
      v-for="{id, name, location, orders, amountSpent}, index in customers"
      :id="id"
      :key="id"
      :selected="selectedResources.includes(id)"
      :position="index"
    >
      <IndexTableCell>
        <Text fontWeight="bold" as="span">{{ name }}</Text>
      </IndexTableCell>
      <IndexTableCell>{{ location }}</IndexTableCell>
      <IndexTableCell>
        <Text as="span" alignment="end" numeric>{{ orders }}</Text>
      </IndexTableCell>
      <IndexTableCell>
        <Text as="span" alignment="end" numeric>{{ amountSpent }}</Text>
      </IndexTableCell>
    </IndexTableRow>
  </IndexTable>
</LegacyCard>
</template>

<script setup lang="ts">
// import { useIndexResourceState, useBreakpoints } from '@ownego/polaris-vue';
import { useIndexResourceState, useBreakpoints } from '@/polaris-vue';

const breakpoints = useBreakpoints();
const { smDown } = breakpoints.value;

const customers = [
  {
    id: '3410',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orders: 20,
    amountSpent: '$2,400',
  },
  {
    id: '3411',
    url: '#',
    name: 'Joe Jemison',
    location: 'Sydney, AU',
    orders: 20,
    amountSpent: '$1,400',
  },
  {
    id: '3412',
    url: '#',
    name: 'Sam Jemison',
    location: 'Decatur, USA',
    orders: 20,
    amountSpent: '$400',
  },
  {
    id: '3413',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orders: 20,
    amountSpent: '$4,300',
  },
  {
    id: '2563',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orders: 30,
    amountSpent: '$140',
  },
];

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(customers);
</script>
