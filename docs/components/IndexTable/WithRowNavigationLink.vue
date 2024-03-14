<template>
<LegacyCard>
  <IndexTable
    :condensed="smDown"
    :resourceName="resourceName"
    :itemCount="customers.length"
    :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
    @selection-change="handleSelectionChange"
    :headings="headings"
  >
    <IndexTableRow
      v-for="{id, url, name, location, orders, amountSpent}, index in customers"
      :id="id"
      :key="id"
      :selected="selectedResources.includes(id)"
      :position="index"
    >
      <IndexTableCell>
        <Link
          dataPrimaryLink
          :url="url"
          @click="() => console.log(`Clicked ${name}`)"
        >
          <Text fontWeight="bold" as="span">{{ name }}</Text>
        </Link>
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
import { h, resolveComponent } from 'vue';
// import { useIndexResourceState, useBreakpoints } from '@ownego/polaris-vue';
import { useIndexResourceState, useBreakpoints } from '@/polaris-vue';

const breakpoints = useBreakpoints();
const { smDown } = breakpoints.value;

const headings = [
  {title: 'Name'},
  {title: 'Location'},
  {
    id: 'order-count',
    title: h(resolveComponent('Text'), { as: 'span', alignment: 'end' }, () => 'Order count'),
  },
  {
    id: 'amount-spent',
    hidden: false,
    title: h(resolveComponent('Text'), { as: 'span', alignment: 'end' }, () => 'Amount spent'),
  },
];

const customers = [
  {
    id: '3411',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orders: 20,
    amountSpent: '$2,400',
  },
  {
    id: '2561',
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
