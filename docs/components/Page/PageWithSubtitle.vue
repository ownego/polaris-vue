<template>
<Page
  title="Invoice"
  subtitle="Statement period: May 3, 2019 to June 2, 2019"
  :backAction="{content: 'Products', url: '#'}"
  :secondaryActions="[{content: 'Download', icon: ArrowDownIcon}]"
>
  <LegacyCard title="Credit card" sectioned>
    <Text as="p">Credit card information</Text>
  </LegacyCard>
</Page>
</template>

<script setup lang="ts">
import ArrowDownIcon from '@icons/ArrowDownIcon.svg'
</script>
