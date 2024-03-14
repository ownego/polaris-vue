<template>
<LegacyCard>
  <IndexTable
    :condensed="smDown"
    :resourceName="resourceName"
    :itemCount="customers.length"
    :headings="headings"
  >
    <template #emptyState>
      <EmptySearchResult
        title="No customers yet"
        description="Try changing the filters or search term"
        withIllustration
      />
    </template>

    <IndexTableRow
      v-for="{id, name, location, orders, amountSpent}, index in customers"
      :id="id"
      :key="id"
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
import { h, resolveComponent } from 'vue';
// import { useBreakpoints } from '@ownego/polaris-vue';
import { useBreakpoints } from '@/polaris-vue';

const breakpoints = useBreakpoints();
const { smDown } = breakpoints.value;

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const customers: {
  id: string;
  name: string;
  location: string;
  orders: number;
  amountSpent: string;
}[] = [{
  id: '1',
  name: 'Mae Jemison',
  location: 'Decatur, USA',
  orders: 20,
  amountSpent: '$2,400',
}];

const headings = [
  {title: 'Name'},
  {title: 'Location'},
  {
    id: 'order-count',
    title: h(resolveComponent('Text'), {as: 'span', alignment: 'end'}, () => 'Order count'),
  },
  {
    id: 'amount-spent',
    title: h(resolveComponent('Text'), {as: 'span', alignment: 'end'}, () => 'Amount spent'),
  },
];
</script>
