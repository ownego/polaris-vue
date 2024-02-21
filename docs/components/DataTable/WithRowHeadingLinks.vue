<template>
<Page title="Sales by product">
  <LegacyCard>
    <DataTable
      :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric']"
      :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales']"
      :rows="rows"
      :totals="['', '', '', 255, '$155,830.00']"
    />
  </LegacyCard>
</Page>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';

const rows = [
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
</script>
