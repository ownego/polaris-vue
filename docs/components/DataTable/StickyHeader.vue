<template>
<div :style="{margin: '40px 0'}">
  <Page title="Sales by product">
    <LegacyCard>
      <DataTable
        :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric', 'numeric', 'numeric']"
        :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales', 'Gross sales', 'Discounts']"
        :rows="rows"
        :totals="['', '', '', 255, '$155,830.00', '', '']"
        :sortable="[false, true, false, false, true]"
        defaultSortDirection="descending"
        :initialSortColumnIndex="4"
        hasZebraStripingOnData
        increasedTableDensity
        stickyHeader
        :fixedFirstColumns="fixedFirstColumns"
        :footerContent="`Showing ${rows.length} of ${rows.length} results`"
      />
    </LegacyCard>
  </Page>
</div>
</template>

<script setup lang="ts">
import { computed, h, resolveComponent } from 'vue';
// import { useBreakpoints } from '@ownego/polaris-vue';
import { useBreakpoints } from '@/utilities/breakpoints';

const breakpoints = useBreakpoints();
const fixedFirstColumns = computed(() => breakpoints.value.lgDown ? 2 : 0);

const rows = [
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'emerald-silk-gown',
      },
      () => 'Emerald Silk Gown',
    ),
    '$875.00',
    124689,
    140,
    '$121,500.00',
    '$14,250.00',
    '$12,240.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'mauve-cashmere-scarf',
      },
      () => 'Mauve Cashmere Scarf',
    ),
    '$230.00',
    124533,
    83,
    '$19,090.00',
    '$12,240.00',
    '$11,270.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'navy-merino-wool',
      },
      () => 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    ),
    '$445.00',
    124518,
    32,
    '$14,240.00',
    '$10,241.00',
    '$10,201.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'emerald-silk-gown',
      },
      () => 'Emerald Silk Gown',
    ),
    '$875.00',
    124689,
    140,
    '$121,500.00',
    '$14,250.00',
    '$12,240.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'mauve-cashmere-scarf',
      },
      () => 'Mauve Cashmere Scarf',
    ),
    '$230.00',
    124533,
    83,
    '$19,090.00',
    '$12,240.00',
    '$11,270.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'navy-merino-wool',
      },
      () => 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    ),
    '$445.00',
    124518,
    32,
    '$14,240.00',
    '$10,241.00',
    '$10,201.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'emerald-silk-gown',
      },
      () => 'Emerald Silk Gown',
    ),
    '$875.00',
    124689,
    140,
    '$121,500.00',
    '$14,250.00',
    '$12,240.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'mauve-cashmere-scarf',
      },
      () => 'Mauve Cashmere Scarf',
    ),
    '$230.00',
    124533,
    83,
    '$19,090.00',
    '$12,240.00',
    '$11,270.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'navy-merino-wool',
      },
      () => 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    ),
    '$445.00',
    124518,
    32,
    '$14,240.00',
    '$10,241.00',
    '$10,201.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'emerald-silk-gown',
      },
      () => 'Emerald Silk Gown',
    ),
    '$875.00',
    124689,
    140,
    '$121,500.00',
    '$14,250.00',
    '$12,240.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'mauve-cashmere-scarf',
      },
      () => 'Mauve Cashmere Scarf',
    ),
    '$230.00',
    124533,
    83,
    '$19,090.00',
    '$12,240.00',
    '$11,270.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'navy-merino-wool',
      },
      () => 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    ),
    '$445.00',
    124518,
    32,
    '$14,240.00',
    '$10,241.00',
    '$10,201.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'emerald-silk-gown',
      },
      () => 'Emerald Silk Gown',
    ),
    '$875.00',
    124689,
    140,
    '$121,500.00',
    '$14,250.00',
    '$12,240.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'mauve-cashmere-scarf',
      },
      () => 'Mauve Cashmere Scarf',
    ),
    '$230.00',
    124533,
    83,
    '$19,090.00',
    '$12,240.00',
    '$11,270.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'navy-merino-wool',
      },
      () => 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    ),
    '$445.00',
    124518,
    32,
    '$14,240.00',
    '$10,241.00',
    '$10,201.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'emerald-silk-gown',
      },
      () => 'Emerald Silk Gown',
    ),
    '$875.00',
    124689,
    140,
    '$121,500.00',
    '$14,250.00',
    '$12,240.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'mauve-cashmere-scarf',
      },
      () => 'Mauve Cashmere Scarf',
    ),
    '$230.00',
    124533,
    83,
    '$19,090.00',
    '$12,240.00',
    '$11,270.00',
  ],
  [
    h(
      resolveComponent('Link'),
      {
        removeUnderline: true,
        url: 'https://www.example.com',
        key: 'navy-merino-wool',
      },
      () => 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    ),
    '$445.00',
    124518,
    32,
    '$14,240.00',
    '$10,241.00',
    '$10,201.00',
  ],
];
</script>
