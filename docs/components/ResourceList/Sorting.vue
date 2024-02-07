<template>
<LegacyCard>
  <ResourceList
    :resourceName="{ singular: 'customer', plural: 'customers' }"
    :items="items"
    :sort-value="sortValue"
    :sort-options="sortOptions"
    @sort-change="onSortChange"
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

const items = [
  {
    id: '100',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: '200',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
];

const sortOptions = [
  {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
  {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
];

const sortValue = ref('DATE_MODIFIED_DESC');

const onSortChange = (value: string) => {
  sortValue.value = value;
  console.log(`Sort option changed to ${value}.`);
};
</script>
