<template>
<LegacyCard>
  <ResourceList
    :resourceName="{ singular: 'customer', plural: 'customers' }"
    :items="items"
    :showHeader="false"
  >
    <template v-for="item in items" :key="item.id">
      <ResourceItem
        :id="item.id"
        :url="item.url"
        :accessibilityLabel="`View details for ${item.name}`"
        :name="item.name"
      >
        <template #media>
          <Avatar customer size="md" :name="item.name" :source="item.avatarSource" />
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
    id: '145',
    url: '#',
    avatarSource:
      'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
  },
];
</script>
