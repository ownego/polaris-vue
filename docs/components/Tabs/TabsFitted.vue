<template>
<LegacyCard>
  <Tabs
    :fitted="true"
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
    id: 'all-customers-fitted-2',
    content: 'All',
    accessibilityLabel: 'All customers',
    panelID: 'all-customers-fitted-content-2',
  },
  {
    id: 'accepts-marketing-fitted-2',
    content: 'Accepts marketing',
    panelID: 'accepts-marketing-fitted-Ccontent-2',
  },
];
</script>
