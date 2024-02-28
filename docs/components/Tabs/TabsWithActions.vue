<template>
<LegacyCard>
  <Tabs
    :tabs="tabs"
    :selected="selected"
    :canCreateNewView="true"
    @select="handleSelected"
    @create-new-view="onCreateNewView"
  >
    <LegacyCardSection :title="tabs[selected].content">
      <Text as="p"> {{ `Tab ${selected} selected` }}</Text>
    </LegacyCardSection>
  </Tabs>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TabProps } from '@/components/Tabs/types';

const selected = ref(0);
const itemStrings = ref([
  'All',
  'Unpaid',
  'Open',
  'Closed',
  'Local delivery',
  'Local pickup',
]);

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const deleteView = (index: number) => {
  const newItemStrings = [...itemStrings.value];
  newItemStrings.splice(index, 1);
  itemStrings.value = newItemStrings;
  selected.value = 0;
};

const duplicateView = async (name: string) => {
  itemStrings.value = [...itemStrings.value, name];
  selected.value = itemStrings.value.length - 1;
  await sleep(1);
  return true;
};

const tabs = computed(() =>
  itemStrings.value.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
          {
            type: 'rename',
            onPrimaryAction: async (value: string) => {
              const newItemsStrings = tabs.value.map((item, idx) => {
                if (idx === index) {
                  return value;
                }
                return item.content;
              });

              await sleep(1);
              itemStrings.value = newItemsStrings;
              return true;
            },
          },
          {
            type: 'duplicate',
            onPrimaryAction: async (name: string) => {
              await sleep(1);
              duplicateView(name);
              return true;
            },
          },
          {
            type: 'edit',
          },
          {
            type: 'delete',
            onPrimaryAction: async () => {
              await sleep(1);
              deleteView(index);
              return true;
            },
          },
        ],
  })) as TabProps[],
);

console.log(1, tabs.value);

const onCreateNewView = async (value: string) => {
  await sleep(500);
  itemStrings.value = [...itemStrings.value, value];
  selected.value = itemStrings.value.length - 1;
  return true;
};

const handleSelected = (value: number) => selected.value = value;
</script>
