<template>
<LegacyCard>
  <ResourceList
    :resourceName="{ singular: 'customer', plural: 'customers' }"
    :items="items"
  >
    <template #alternateTool>
      <Button>Email customers</Button>
    </template>
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
</script>

