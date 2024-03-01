<template>
<LegacyCard>
  <ResourceList
    :resourceName="resourceName"
    :items="items"
  >
    <template #filterControl>
      <Filters
        :query-value="queryValue"
        :filters="filters"
        :appliedFilters="appliedFilters"
        @query-change="setQueryValue"
        @query-clear="handleQueryValueRemove"
        @clear-all="handleClearAll"
      >
        <div style="paddingLeft: 8px">
          <Button @click="() => console.log('New filter saved')">Save</Button>
        </div>
    </Filters>
    </template>
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
import { ref, computed, resolveComponent, h } from 'vue';

const taggedWith = ref('');
const queryValue = ref('');

const appliedFilters = computed(() => {
  const tmpFilters = [];

  if (!isEmpty(taggedWith.value)) {
    const name = 'taggedWith';
    tmpFilters.push({
      name,
      label: disambiguateLabel(name, taggedWith.value),
      onRemove: handleTaggedWithRemove,
    });
  }

  return tmpFilters;
});

const setTaggedWith = (value: any) => {
  taggedWith.value = value;
};

const setQueryValue = (value: any) => {
  queryValue.value = value;
};

const handleTaggedWithRemove = () => setTaggedWith('');
const handleQueryValueRemove = () => setQueryValue('');

const handleTaggedWithChange = (_e: Event, value: string) => {
  taggedWith.value = value;
};


const handleClearAll = () => {
  handleTaggedWithRemove();
  handleQueryValueRemove();
};

const filters = [
 {
    name: 'taggedWith',
    label: 'Tagged with',
    filter: () => h(resolveComponent('TextField'), {
      label: 'Tagged with',
      modelValue: taggedWith.value,
      autoComplete: "off",
      labelHidden: true,
      onInput: handleTaggedWithChange,
    }),
    shortcut: true,
  },
];

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const items = [
  {
    id: '108',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: '208',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
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
