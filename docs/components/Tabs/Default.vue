<template>
<Tabs
  :tabs="tabs"
  :selected="selected"
  @select="handleTabChange"
>
  <LegacyCardSection :title="tabs[selected].content">
    <Text as="p"> {{ `Tab ${selected} selected` }}</Text>
  </LegacyCardSection>
</Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(0);

const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Prospects',
      panelID: 'prospects-content-1',
    },
  ];

const handleTabChange = (value: number) =>
  selected.value = value;
</script>
