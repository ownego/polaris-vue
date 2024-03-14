<template>
<LegacyCard>
  <IndexTable
    :condensed="smDown"
    :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
    :resourceName="resourceName"
    :itemCount="rows.length"
    :headings="columnHeadings"
    @selection-change="handleSelectionChange"
  >
    <template
      v-for="orderDate, index in Object.keys(orderRows)"
      :key="index"
    >
      <IndexTableRow
        rowType="subheader"
        :selectionRange="childRowRange(orderRows[orderDate])"
        :id="orderRows[orderDate].id"
        :position="orderRows[orderDate].position"
        :selected="isSelected(orderRows[orderDate])"
        :disabled="index === 1"
      >
        <IndexTableCell
          :colSpan="4"
          scope="colgroup"
          as="th"
          :id="orderRows[orderDate].id"
        >
          {{`Last order placed: ${orderDate}`}}
        </IndexTableCell>
      </IndexTableRow>
      <IndexTableRow
        v-for="{id, name, location, orders, amountSpent, position, disabled}, rowIndex in orderRows[orderDate].customers"
        :key="rowIndex"
        :id="id"
        :position="position"
        :selected="selectedResources.includes(id)"
        :disabled="disabled"
      >
        <IndexTableCell :headers="`${columnHeadings[0].id} ${id}`">
          <Text variant="bodyMd" fontWeight="semibold" as="span">{{ name }}</Text>
        </IndexTableCell>
        <IndexTableCell>{{ location }}</IndexTableCell>
        <IndexTableCell>
          <Text as="span" alignment="end" numeric>{{ orders }}</Text>
        </IndexTableCell>
        <IndexTableCell>
          <Text as="span" alignment="end" numeric>{{ amountSpent }}</Text>
        </IndexTableCell>
      </IndexTableRow>
    </template>
  </IndexTable>
</LegacyCard>
</template>

<script setup lang="ts">
// import { useIndexResourceState, useBreakpoints } from '@ownego/polaris-vue';
import { useIndexResourceState, useBreakpoints } from '@/polaris-vue';

interface Customer {
  id: string;
  url: string;
  name: string;
  location: string;
  orders: number;
  amountSpent: string;
  lastOrderDate: string;
  disabled?: boolean;
}

interface CustomerRow extends Customer {
  position: number;
}

interface CustomerGroup {
  id: string;
  position: number;
  customers: CustomerRow[];
}

interface Groups {
  [key: string]: CustomerGroup;
}

const breakpoints = useBreakpoints();
const { smDown } = breakpoints.value;

const rows = [
  {
    id: '3411',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orders: 11,
    amountSpent: '$2,400',
    lastOrderDate: 'May 31, 2023',
  },
  {
    id: '2562',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orders: 30,
    amountSpent: '$975',
    lastOrderDate: 'May 31, 2023',
  },
  {
    id: '4102',
    url: '#',
    name: 'Colm Dillane',
    location: 'New York, USA',
    orders: 27,
    amountSpent: '$2885',
    lastOrderDate: 'May 31, 2023',
  },
  {
    id: '2564',
    url: '#',
    name: 'Al Chemist',
    location: 'New York, USA',
    orders: 19,
    amountSpent: '$1,209',
    lastOrderDate: 'April 4, 2023',
    disabled: true,
  },
  {
    id: '2563',
    url: '#',
    name: 'Larry June',
    location: 'San Francisco, USA',
    orders: 22,
    amountSpent: '$1,400',
    lastOrderDate: 'March 19, 2023',
  },
];

const columnHeadings = [
  {title: 'Name', id: 'name'},
  {title: 'Location', id: 'location'},
  {
    alignment: 'end',
    id: 'order-count',
    title: 'Order count',
  },
  {
    alignment: 'end',
    hidden: false,
    id: 'amount-spent',
    title: 'Amount spent',
  },
];

const groupRowsByLastOrderDate = () => {
  let position = -1;
  const groups: Groups = (rows as Customer[]).reduce(
    (groups: Groups, customer: Customer) => {
      const {lastOrderDate} = customer;
      if (!groups[lastOrderDate]) {
        position += 1;

        groups[lastOrderDate] = {
          position,
          customers: [],
          id: `order-${lastOrderDate.split(' ').join('-')}`,
        };
      }

      groups[lastOrderDate].customers.push({
        ...customer,
        position: position + 1,
      });

      position += 1;
      return groups;
    },
    {},
  );

  return groups;
};

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const {selectedResources, allResourcesSelected, handleSelectionChange} =
  useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

const orderRows = groupRowsByLastOrderDate();

const isSelected = (order: CustomerGroup) => {
  const { customers } = order;
  let selected: boolean | 'indeterminate' = false;

  const someCustomersSelected = customers.some(({id}) =>
    selectedResources.value.includes(id),
  );

  const allCustomersSelected = customers.every(({id}) =>
    selectedResources.value.includes(id),
  );

  if (allCustomersSelected) {
    selected = true;
  } else if (someCustomersSelected) {
    selected = 'indeterminate';
  }

  return selected;
};

const childRowRange = (order: CustomerGroup) => {
  const { customers } = order;

  const selectableRows = rows.filter(({disabled}) => !disabled);
  const results = [
    selectableRows.findIndex((row) => row.id === customers[0].id),
    selectableRows.findIndex(
      (row) => row.id === customers[customers.length - 1].id,
    ),
  ];

  return results;
};
</script>
