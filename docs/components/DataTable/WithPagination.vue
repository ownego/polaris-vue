<template>
<Page title="Sales by product">
  <LegacyCard>
    <DataTable
      :columnContentTypes="columnContentTypes"
      :headings="headings"
      :rows="rows"
      :totals="totals"
      :pagination="{
        hasNext: true,
        onNext: () => {},
      }"
    />
  </LegacyCard>
</Page>
</template>

<script setup lang="ts">
const columnContentTypes = [
  'text',
  'numeric',
  'numeric',
  'numeric',
  'numeric',
];

const headings = [
  'Product',
  'Price',
  'SKU Number',
  'Net quantity',
  'Net sales',
];

const totals = ['', '', '', 255, '$155,830.00'];

const rows = [
  ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
  ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
  [
    'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    '$445.00',
    124518,
    32,
    '$14,240.00',
  ],
];
</script>
