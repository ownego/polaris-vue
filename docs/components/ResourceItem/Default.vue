<template>
<LegacyCard>
  <ResourceList
    :resourceName="{ singular: 'blog post', plural: 'blog posts' }"
    :items="items"
    :selectedItems="selectedItems"
    onSelectionChange={setSelectedItems}
    selectable
    renderItem={(item) => {
      const {id, url, title, author} = item;
      const authorMarkup = author ? <div>by {author}</div> : null;
      return (
        <ResourceItem
          id={id}
          url={url}
          accessibilityLabel={`View details for ${title}`}
          name={title}
        >
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
          {authorMarkup}
        </ResourceItem>
      );
    }}
  />
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

const selectedItem = ref([]);
</script>
