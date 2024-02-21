<template>
<LegacyCard>
 <ResourceList
    :resourceName="{ singular: 'customer', plural: 'customers' }"
    :items="items"
    :showHeader="false"
  >
    <template v-for="item in items" :key="item.id">
      <ResourceItem
        persistActions
        :id="item.id"
        :url="item.url"
        :accessibilityLabel="`View details for ${item.name}`"
        :name="item.name"
        :shortcutActions="item.latestOrderUrl ? [{content: 'View latest order', url: item.latestOrderUrl}] : null"
      >
        <template #media>
          <Avatar customer size="md" :name="item.name"/>
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
const items = [
  {
    id: '100',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    latestOrderUrl: '#',
  },
  {
    id: '200',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    latestOrderUrl: '#',
  },
];
</script>

