<template>
<LegacyCard>
  <ResourceList
    :resourceName="resourceName"
    :items="items"
    :promotedBulkActions="promotedBulkActions"
    :bulkActions="bulkActions"
    :sort-options="sortOptions"
    @sort-change="onSortChange"
  >
    <template #filterControl>
      <LegacyFilters
        v-model="queryValue"
        :filters="filters"
        :appliedFilters="appliedFilters"
        @query-change="setQueryValue"
        @query-clear="handleQueryValueRemove"
        @clear-all="handleClearAll"
      >
        <div style="paddingLeft: 8px">
          <Button @click="() => console.log('New filter saved')">Save</Button>
        </div>
    </LegacyFilters>
    </template>
    <template v-for="item, index in items" :key="index">
      <ResourceItem
        persistActions
        :id="item.id"
        :url="item.url"
        :accessibilityLabel="`View details for ${item.name}`"
        :name="item.name"
        :shortcutActions="item.latestOrderUrl ? [{content: 'View latest order', url: item.latestOrderUrl}] : null"
      >
        <template #media>
          <Avatar customer size="md" :name="item.name" />
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
import { ref, computed } from 'vue';

const sortOptions = [
  {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
  {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
];

const onSortChange = (value: string) => {
  sortValue.value = value;
  console.log(`Sort option changed to ${value}.`);
};

const sortValue = ref('DATE_MODIFIED_DESC');
const taggedWith = ref('');
const queryValue = ref('');

const appliedFilters = computed(() => {
  return  taggedWith.value && !isEmpty(taggedWith.value)
    ? [
        {
          key: 'taggedWith1',
          label: disambiguateLabel('taggedWith1', taggedWith.value),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];
})

const setTaggedWith = (value: any) => {
  taggedWith.value = value;
};

const setQueryValue = (value: any) => {
  queryValue.value = value;
};

const handleTaggedWithChange = (value: any) => setTaggedWith(value);
const handleTaggedWithRemove = () => setTaggedWith(undefined);
const handleQueryValueRemove = () => setQueryValue(undefined);

const handleClearAll = () => {
  handleTaggedWithRemove();
  handleQueryValueRemove();
};

const filters = [
  {
    key: 'taggedWith1',
    label: 'Tagged with',
    shortcut: true,
  },
];

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const items = [
  {
    id: '112',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    latestOrderUrl: 'orders/1456',
  },
  {
    id: '212',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    latestOrderUrl: 'orders/1457',
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

function disambiguateLabel(key: string, value: string): string {
  switch (key) {
    case 'taggedWith1':
      return `Tagged with ${value}`;
    default:
      return value;
  }
}

function isEmpty(value: string): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
</script>
