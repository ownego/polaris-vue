<template>
<LegacyCard>
  <Tabs
    :tabs="tabs"
    :selected="selected"
    :fitted="true"
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
    id: 'all-customers-fitted-3',
    content: 'All',
    badge: '10+',
    accessibilityLabel: 'All customers',
    panelID: 'all-customers-fitted-content-3',
  },
  {
    id: 'accepts-marketing-fitted-3',
    content: 'Accepts marketing',
    badge: '4',
    panelID: 'accepts-marketing-fitted-content-3',
  },
];
</script>
