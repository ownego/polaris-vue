<template>
<LegacyCard>
  <IndexTable
    :condensed="smDown"
    @selection-change="handleSelectionChange"
    :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
    :resourceName="resourceName"
    :itemCount="rows.length"
    :headings="columnHeadings"
  >
    <IndexTableRow
      rowType="subheader"
      :selectionRange="childRowRange"
      :id="subheaderId"
      :position="position"
      :selected="selected"
      :disabled="index === 1"
    >
      <IndexTableCell
        :colSpan="4"
        scope="colgroup"
        as="th"
        :id="subheaderId"
      >
        {{`Last order placed: ${orderDate}`}}
      </IndexTableCell>
    </IndexTableRow>
    <IndexTableRow
      :key="rowIndex"
      :id="id"
      :position="position"
      :selected="selectedResources.includes(id)"
      :disabled="disabled"
    >
      <IndexTableCell :headers="`${columnHeadings[0].id} ${subheaderId}`">
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
  </IndexTable>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useIndexResourceState, useBreakpoints } from '@ownego/polaris-vue';
import { useIndexResourceState, useBreakpoints } from '@/polaris-vue';

const breakpoints = useBreakpoints();
const { smDown } = breakpoints.value;
</script>
