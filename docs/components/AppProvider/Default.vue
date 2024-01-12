<template>
<AppProvider :i18n="i18n">
  <Page>
    <LegacyCard>
      <ResourceList show-header>
        <ResourceListItem
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :url="item.url"
        >
          <Text variant="bodyMd" font-weight="bold" as="h3">{{ item.name }}</Text>
          <div>{{ item.location }}</div>

          <template #media>
            <Avatar customer size="md" :name="item.name" />
          </template>
        </ResourceListItem>
      </ResourceList>
    </LegacyCard>
  </Page>
</AppProvider>
</template>

<script setup lang="ts">
const i18n = {
  Polaris: {
    ResourceList: {
      sortingLabel: 'Sort by',
      defaultItemSingular: 'item',
      defaultItemPlural: 'items',
      showing: 'Showing {itemsCount} {resource}',
      Item: {
        viewItem: 'View details for {itemName}',
      },
    },
    Common: {
      checkbox: 'checkbox',
    },
  },
};

const items = [
  {
    id: '341',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: '256',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
];
</script>
