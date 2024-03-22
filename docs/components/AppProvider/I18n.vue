<template>
<AppProvider :i18n="locales">
  <Page>
    <LegacyCard>
      <ResourceList :items="items" show-header>
        <ResourceItem
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
        </ResourceItem>
      </ResourceList>
    </LegacyCard>
  </Page>
</AppProvider>
</template>

<script setup lang="ts">
// import locales from '@ownego/polaris-vue/dist/locales/fr.json';
import locales from './fr.json'; // Let's use the import as above, this is just for demo purpose

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
