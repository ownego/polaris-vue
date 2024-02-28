<template>
<LegacyCard>
  <Tabs
    disclosureText="More views"
    :tabs="tabs"
    :selected="selected"
    @select="handleTabChange"
  >
    <LegacyCardSection :title="tabs[selected].content">
      <Text as="p"> {{ `Tab ${selected} selected` }}</Text>
    </LegacyCardSection>
  </Tabs>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(0);

const handleTabChange = (selectedTabIndex: number) =>
  selected.value = selectedTabIndex;

const tabs = [
  {
    id: 'all-customers-4',
    content: 'All',
    accessibilityLabel: 'All customers',
    panelID: 'all-customers-content-4',
  },
  {
    id: 'accepts-marketing-4',
    content: 'Accepts marketing',
    panelID: 'accepts-marketing-content-4',
  },
  {
    id: 'repeat-customers-4',
    content: 'Repeat customers',
    panelID: 'repeat-customers-content-4',
  },
  {
    id: 'prospects-4',
    content: 'Prospects',
    panelID: 'prospects-content-4',
  },
];
</script>
