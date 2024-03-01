<template>
<Page title="Sales by product">
  <LegacyCard>
    <DataTable
      :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric']"
      :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales']"
      :rows="rows"
      :totals="['', '', '', 255, '$155,830.00']"
      :sortable="[false, true, false, false, true]"
      defaultSortDirection="descending"
      :initialSortColumnIndex="4"
      :footerContent="footerContent"
      @sort="handleSort"
    />
  </LegacyCard>
</Page>
</template>

<script setup lang="ts">
import { computed, h, ref, resolveComponent } from 'vue';

const initiallySortedRows = [
  [
    h(
      resolveComponent('Link'),
      { removeUnderline: true, url: 'https://www.example.com', key:'emerald-silk-gown' },
      () => 'Emerald Silk Gown',
    ),
    '$875.00',
    124689,
    140,
    '$122,500.00',
  ],
  [
    h(
      resolveComponent('Link'),
      { removeUnderline: true, url: 'https://www.example.com', key:'mauve-cashmere-scarf' },
      () => 'Mauve Cashmere Scarf',
    ),
    '$230.00',
    124533,
    83,
    '$19,090.00',
  ],
  [
    h(
      resolveComponent('Link'),
      { removeUnderline: true, url: 'https://www.example.com', key:'navy-merino-wool' },
      () => 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    ),
    '$445.00',
    124518,
    32,
    '$14,240.00',
  ],
];

const sortedRows = ref<any[][] | null>(null);

const rows = computed(() => sortedRows.value || initiallySortedRows);

const footerContent = h(
  resolveComponent('InlineStack'),
  {
    align: 'center',
    gap: 200,
  },
  () => [
    h(resolveComponent('Badge'), { tone: 'success'}, () => 'Tip!'),
    h('div', `Showing ${rows.value.length} of ${rows.value.length} results`),
  ],
);

const handleSort = (index: number, direction: 'ascending' | 'descending') => {
  sortedRows.value = sortCurrency(rows.value, index, direction);
};

function sortCurrency(
  rows: any[][],
  index: number,
  direction: 'ascending' | 'descending',
): any[][] {
  return [...rows].sort((rowA, rowB) => {
    const amountA = parseFloat((rowA[index] || 0).toString().substring(1));
    const amountB = parseFloat((rowB[index] || 0).toString().substring(1));

    return direction === 'descending' ? amountB - amountA : amountA - amountB;
  });
}
</script>
