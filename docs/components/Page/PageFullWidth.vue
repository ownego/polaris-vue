<template>
<Page
  fullWidth
  title="Orders"
  :primaryAction="{content: 'Create order', icon: PlusIcon}"
  :secondaryActions="[{content: 'Export'}]"
  :pagination="{
    hasNext: true,
  }"
>
  <LegacyCard title="Credit card" sectioned>
    <Text as="p">Credit card information</Text>
  </LegacyCard>
</Page>
</template>

<script setup lang="ts">
import PlusIcon from '@icons/PlusIcon.svg';
</script>
