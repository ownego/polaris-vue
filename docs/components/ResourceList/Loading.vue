<template>
<LegacyCard>
  <ResourceList
    loading
    :resourceName="resourceName"
    :items="items"
    :selectedItems="selectedItems"
    :promotedBulkActions="promotedBulkActions"
    :bulkActions="bulkActions"
    @selection-change="setSelectedItems"
  >
    <template v-for="{id, url, name, location}, index in items" :key="index">
      <ResourceItem
        :id="id"
        :url="url"
        :accessibilityLabel="`View details for ${name}`"
      >
        <template #media>
          <Avatar customer size="md" :name="name" />
        </template>
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {{ name }}
        </Text>
        <div>{{location}}</div>
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
    id: '103',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: '203',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
];

const promotedBulkActions = [
  {
    content: 'Edit customers',
    onAction: () => console.log('Todo: implement bulk edit'),
  },
];

const bulkActions = [
  {
    content: 'Add tags',
    onAction: () => console.log('Todo: implement bulk add tags'),
  },
  {
    content: 'Remove tags',
    onAction: () => console.log('Todo: implement bulk remove tags'),
  },
  {
    content: 'Delete customers',
    onAction: () => console.log('Todo: implement bulk delete'),
  },
];

const selectedItems = ref<any>([]);

const setSelectedItems = (selected: any) => {
  selectedItems.value = selected;
};
</script>
