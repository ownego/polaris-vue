<template>
<LegacyCard>
  <ResourceList
    selectable
    :resourceName="{singular: 'blog post', plural: 'blog posts'}"
    :items="items"
    :selectedItems="selectedItems"
    @selection-change="onSelectionChange"
    >
    <ResourceItem
      v-for="item in items"
      :id="`${item.id}`"
      :url="item.url"
      :accessibilityLabel="`View details for ${item.title}`"
      :name="item.title"
    >
      <Text variation="bodyMd" font-weight="bold" as="h3">{{ item.title }}</Text>
      <div v-if="item.author">by {{ item.author }}</div>
    </ResourceItem>
  </ResourceList>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = [
  {
    id: '6',
    url: 'posts/6',
    title: 'How To Get Value From Wireframes',
    author: 'Jonathan Mangrove',
  },
];

const selectedItems = ref([]);
const onSelectionChange = (value: any) => {
  selectedItems.value = value;
};
</script>
