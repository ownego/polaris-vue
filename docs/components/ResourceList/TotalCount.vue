<template>
<LegacyCard>
  <ResourceList
    :resourceName="resourceName"
    :items="items"
    :totalItemsCount="50"
  >
    <template v-for="{id, url, name, location} in items" :key="id">
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
</script>
