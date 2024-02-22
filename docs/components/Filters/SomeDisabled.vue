<template>
<div style="height: 568px">
  <LegacyCard>
    <ResourceList
      flush-filters
      :resourceName="resourceName"
      :items="items"
    >
      <template #filterControl>
        <Filters
          queryPlaceholder="Searching customers"
          :query-value="queryValue"
          :filters="filters"
          :appliedFilters="appliedFilters"
          @query-change="handleFiltersQueryChange"
          @query-clear="handleQueryValueRemove"
          @clear-all="handleFiltersClearAll"
        >
          <div style="padding-left: 8px">
            <Button
              disabled
              @click="() => console.log('New filter saved')"
              variant="tertiary"
            >
              Save
            </Button>
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
</div>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue';
import { TextField } from '@/components';

const taggedWith = ref<string>('');
const vendor = ref<string>('');
const queryValue = ref('');

const handleTaggedWithRemove = () => {
  taggedWith.value = '';
};

const handleQueryValueRemove = () => {
  queryValue.value = '';
};

const handleVendorRemove = () => {
  vendor.value = '';
};

const handleFiltersQueryChange = (value: string) => {
  queryValue.value = value;
}

const handleTaggedWithChange = (value: string) => {
  taggedWith.value = value;
};

const handleFiltersClearAll = () => {
  handleTaggedWithRemove();
  handleQueryValueRemove();
  handleVendorRemove();
};

const appliedFilters = computed(() => {
  return taggedWith.value && !isEmpty(taggedWith.value)
    ? [
        {
          key: 'taggedWith',
          label: disambiguateLabel('taggedWith', taggedWith.value),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : []
  });

const filters = [
  {
    key: 'taggedWith',
    label: 'Tagged with',
    filter: h(TextField, {
      label: "Tagged with",
      modelValue: taggedWith.value,
      autoComplete: "off",
      labelHidden: true,
      'onUpdate:modelValue': (value: string) => {
        taggedWith.value = value;
      },
    }),
    shortcut: true,
  },
  {
    key: 'vendor',
    label: 'Vendor',
    filter: h(TextField, {
      label: 'Vendor',
      modelValue: vendor.value,
      'onUpdate:modelValue': (value: string) => {
        vendor.value = value;
      },
      labelHidden: true,
      autoComplete: 'off',
    }),
    shortcut: true,
    disabled: true,
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

function disambiguateLabel(key: string, value: any) {
  switch (key) {
    case 'moneySpent':
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case 'taggedWith':
      return `Tagged with ${value}`;
    case 'accountStatus':
      return value?.map((val: string) => `Customer ${val}`).join(', ');
    default:
      return value;
  }
}

function isEmpty(
  value: string | string[] | [number, number] | undefined,
): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}

</script>
