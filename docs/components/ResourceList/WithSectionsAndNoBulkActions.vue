<template>
<LegacyCard>
  <ResourceList
    :resourceName="resourceName"
    :items="items"
    :selectedItems="selectedItems"
    @select-change="setSelectedItems"
    selectable
  >
    <template v-for="item, index in items" :key="index">
      <ResourceItem>
        <template #media>
          <Avatar customer size="md" :name="item.name" />
        </template>
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {{ item.name }}
        </Text>
        <div>{{ item.location }}</div>
      </ResourceItem>
    </template>
  </ResourceList>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const items = [
  {
    id: '101',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: '201',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
];

const selectedItems = ref<any>([]);

const setSelectedItems = (selected: any) => {
  selectedItems.value = selected;
};
</script>
