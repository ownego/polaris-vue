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
      v-for="color, index in Object.keys(groupedProducts)"
      :key="index"
    >
      <IndexTableRow
        rowType="data"
        :selectionRange="rowRange(groupedProducts[color])"
        :id="`Parent-${index}`"
        :position="groupedProducts[color].position"
        :selected="isSelected(groupedProducts[color])"
        :disabled="groupedProducts[color].products.every(({disabled}) => disabled)"
        :accessibilityLabel="`Select all products which have color ${color}`"
      >
        <IndexTableCell scope="col" :id="groupedProducts[color].id">
          <Text as="span" fontWeight="semibold">{{ color }}</Text>
        </IndexTableCell>
        <IndexTableCell />
        <IndexTableCell />
      </IndexTableRow>

      <IndexTableRow
        v-for="{id, size, quantity, price, position, disabled}, rowIndex in groupedProducts[color].products"
        rowType="child"
        :key="rowIndex"
        :id="id"
        :position="position"
        :selected="selectedResources.includes(id)"
        :disabled="disabled"
      >
        <IndexTableCell
          scope="row"
          :headers="`${columnHeadings[0].id} ${groupedProducts[color].id}`"
        >
          <Text variant="bodyMd" as="span">{{ size }}</Text>
        </IndexTableCell>
        <IndexTableCell>
          <Text as="span" numeric>{{ price }}</Text>
        </IndexTableCell>
        <IndexTableCell>
          <Text as="span" alignment="end" numeric>{{ quantity }}</Text>
        </IndexTableCell>
      </IndexTableRow>
    </template>
  </IndexTable>
</LegacyCard>
</template>

<script setup lang="ts">
// import { useIndexResourceState, useBreakpoints } from '@ownego/polaris-vue';
import { useIndexResourceState, useBreakpoints } from '@/polaris-vue';

interface Product {
  id: string;
  quantity: number;
  price: string;
  size: string;
  color: string;
  image?: string;
  disabled?: boolean;
}

interface ProductRow extends Product {
  position: number;
}

interface ProductGroup {
  id: string;
  position: number;
  products: ProductRow[];
}

interface Groups {
  [key: string]: ProductGroup;
}

const breakpoints = useBreakpoints();
const { smDown } = breakpoints.value;

const rows: Product[] = [
  {
    id: '3411',
    quantity: 11,
    price: '$2,400',
    size: 'Small',
    color: 'Orange',
  },
  {
    id: '2562',
    quantity: 30,
    price: '$975',
    size: 'Medium',
    color: 'Orange',
  },
  {
    id: '4102',
    quantity: 27,
    price: '$2885',
    size: 'Large',
    color: 'Orange',
  },
  {
    id: '2564',
    quantity: 19,
    price: '$1,209',
    size: 'Small',
    color: 'Red',
    disabled: true,
  },
  {
    id: '2563',
    quantity: 22,
    price: '$1,400',
    size: 'Small',
    color: 'Green',
  },
];

const columnHeadings = [
  {title: 'Name', id: 'column-header--size'},
  {
    hidden: false,
    id: 'column-header--price',
    title: 'Price',
  },
  {
    alignment: 'end',
    id: 'column-header--quantity',
    title: 'Available',
  },
];

const groupRowsByGroupKey = (
  groupKey: keyof Product,
  resolveId: (groupVal: string) => string,
) => {
  let position = -1;
  const groups: Groups = rows.reduce((groups: Groups, product: Product) => {
    const groupVal: string = product[groupKey] as string;
    if (!groups[groupVal]) {
      position += 1;

      groups[groupVal] = {
        position,
        products: [],
        id: resolveId(groupVal),
      };
    }
    groups[groupVal].products.push({
      ...product,
      position: position + 1,
    });

    position += 1;
    return groups;
  }, {});

  return groups;
};

const resourceName = {
  singular: 'product',
  plural: 'products',
};

const {selectedResources, allResourcesSelected, handleSelectionChange} =
  useIndexResourceState(rows as unknown as {[key: string]: unknown}[], {
    resourceFilter: ({disabled}) => !disabled,
  });

const groupedProducts = groupRowsByGroupKey(
  'color',
  (color) => `color--${color.toLowerCase()}`,
);

const isSelected = (order: ProductGroup) => {
  const { products } = order;
  let selected: boolean | 'indeterminate' = false;

  const someProductsSelected = products.some(({id}) =>
    selectedResources.value.includes(id),
  );

  const allProductsSelected = products.every(({id}) =>
    selectedResources.value.includes(id),
  );

  if (allProductsSelected) {
    selected = true;
  } else if (someProductsSelected) {
    selected = 'indeterminate';
  }

  return selected;
};

const rowRange = (groupedProduct: ProductGroup) => {
  const { products } = groupedProduct;

  const selectableRows = rows.filter(({disabled}) => !disabled);
  const results = [
    selectableRows.findIndex((row) => row.id === products[0].id),
    selectableRows.findIndex(
      (row) => row.id === products[products.length - 1].id,
    ),
  ];

  return results;
};
</script>
