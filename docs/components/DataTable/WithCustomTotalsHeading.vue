<template>
<Page title="Sales by product">
  <LegacyCard>
    <DataTable
      showTotalsInFooter
      :columnContentTypes="[
        'text',
        'numeric',
        'numeric',
        'numeric',
        'numeric',
      ]"
      :headings="[
        'Product',
        'Price',
        'SKU Number',
        'Net quantity',
        'Net sales',
      ]"
      :rows="rows"
      :totals="['', '', '', '', '$155,830.00']"
      :totalsName="{
        singular: 'Total net sales',
        plural: 'Total net sales',
      }"
    />
  </LegacyCard>
</Page>
</template>

<script setup lang="ts">
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
