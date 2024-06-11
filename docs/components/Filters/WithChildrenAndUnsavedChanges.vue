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
          :query-value="queryValue"
          :filters="filters"
          :appliedFilters="appliedFilters"
          @query-change="handleFiltersQueryChange"
          @query-clear="handleQueryValueRemove"
          @clear-all="handleFiltersClearAll"
        >
          <div style="padding-left: 8px">
            <Button
              :disabled="disableAction"
              @click="handleSaveFilters"
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
import { ref, h, computed, resolveComponent } from 'vue';

const emptyFilterState: {
  query: {
    label: string;
    value: '';
  };
  accountStatus: {
    label: string;
    value: string[];
  };
  moneySpent: {
    label: string;
    value: [number, number];
  };
  taggedWith: {
    label: string;
    value: '';
  };
} = {
  query: {
    label: 'Search',
    value: '',
  },
  accountStatus: {
    label: 'Account status',
    value: [],
  },
  moneySpent: {
    label: 'Money spent',
    value: [0, 0],
  },
  taggedWith: {
    label: 'Tagged with',
    value: '',
  },
};

const taggedWith = ref<string>('');
const accountStatus = ref<string[]>([]);
const moneySpent = ref<[number, number] | undefined>();
const queryValue = ref('');
const savedFilterState = ref(new Map(Object.entries(emptyFilterState)));

const handleTaggedWithRemove = () => {
  taggedWith.value = '';
};

const handleQueryValueRemove = () => {
  queryValue.value = '';
};

const handleFiltersQueryChange = (value: string) => {
  queryValue.value = value;
}

const handleTaggedWithChange = (value: string) => {
  taggedWith.value = value;
};

const handleFilterChange = (key: string) => (value: string | string[] | number | [number, number]) => {
  if (key === 'moneySpent') {
    moneySpent.value = value as [number, number];
  };
  if (key === 'accountStatus') {
    accountStatus.value = value as string[];
  };
};

const handleFilterRemove = (key: string) => {
  if (key === 'taggedWith') {
    taggedWith.value = emptyFilterState.taggedWith.value;
  } else if (key === 'moneySpent') {
    moneySpent.value = emptyFilterState.moneySpent.value;
  } else if (key === 'accountStatus') {
    accountStatus.value = emptyFilterState.accountStatus.value;
  }
};

const handleFiltersClearAll = () => {
  handleTaggedWithRemove();
  handleQueryValueRemove();
};

const filters = computed(() => {
  return [
  {
    name: 'accountStatus',
    label: 'Account status',
    filter: () => h(resolveComponent('ChoiceList'), {
      title: 'Account status',
      titleHidden: true,
      choices: [
        {label: 'Enabled', value: 'enabled'},
        {label: 'Not invited', value: 'not invited'},
        {label: 'Invited', value: 'invited'},
        {label: 'Declined', value: 'declined'},
      ],
      modelValue: accountStatus.value,
      allowMultiple: true,
      onChange: handleFilterChange('accountStatus'),
    }),
    shortcut: true,
    value: accountStatus.value,
  },
  {
    name: 'taggedWith',
    label: 'Tagged with',
    filter: () => h(resolveComponent('TextField'), {
      label: "Tagged with",
      modelValue: taggedWith.value,
      autoComplete: "off",
      labelHidden: true,
      onChange: handleTaggedWithChange,
    }),
    shortcut: true,
    value: taggedWith.value,
  },
  {
    name: 'moneySpent',
    label: 'Money spent',
    filter: () => h(resolveComponent('RangeSlider'), {
      label: 'Money spent is between',
      labelHidden: true,
      modelValue: moneySpent.value || [0, 500],
      prefix: "$",
      output: true,
      min: 0,
      max: 2000,
      step: 1,
      onChange: handleFilterChange('moneySpent'),
    }),
    value: moneySpent.value,
  },
  ]});

const appliedFilters = computed(() => {
  const result: any = [];

  filters.value.forEach(({name, label, value}) => {
    if (value && !isEmpty(value)) {
      result.push({
        name,
        label: `${label}: ${humanReadableValue(name, value)}`,
        unsavedChanges: !isUnchanged(name, value),
        onRemove: () => handleFilterRemove(name),
      });
    }
  });

  return result;
});
const disableAction = computed(() => appliedFilters.value.every(
  ({unsavedChanges}) => !unsavedChanges,
));

const handleSaveFilters = () => {
  const nextSavedFilterState = new Map(savedFilterState.value);
  appliedFilters.value.forEach(({name, unsavedChanges}) => {
    const savedFilter = nextSavedFilterState.get(name);
    const value = filters.value.find((filter) => filter.name === name)?.value;
    console.log(`Saving filter: ${name}, ${value}`, savedFilter);

    if (value && unsavedChanges && savedFilter) {
      savedFilter.value = value;
    }
  });

  savedFilterState.value = nextSavedFilterState;
};

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

function humanReadableValue(
    key: string,
    value: string | string[] | number | [number, number],
  ): string {
    if (isEmpty(value)) return '';

    switch (key) {
      case 'moneySpent': {
        const [min, max] = value as [number, number];
        if (min === 0 && max === 0) return '';
        if (min === 0) return `up to $${max}`;
        if (max === 0) return `more than $${min}`;
        return `between $${min} and $${max}`;
      }

      case 'taggedWith': {
        const tags = String(value).trim().split(',');
        if (tags.length === 1) return ` ${tags[0]}`;
        else if (tags.length === 2) return `${tags[0]} and ${tags[1]}`;
        return tags
          .map((tag, index) => {
            return index !== tags.length - 1 ? tag : `and ${tag}`;
          })
          .join(', ');
      }
      case 'accountStatus': {
        const statuses = value as string[];
        if (statuses.length === 1) {
          return statuses[0];
        } else if (statuses.length === 2) {
          return `${statuses[0]} or ${statuses[1]}`;
        } else {
          return statuses
            .map((status, index) => {
              return index !== statuses.length - 1 ? status : `or ${status}`;
            })
            .join(', ');
        }
      }
      default:
        return '';
    }
  }

function isEmpty(value: string | string[] | number | [number, number]) {
  if (Array.isArray(value)) {
    return value.length === 0 || value[1] === 0;
  } else {
    return value === '' || value === 0 || value == null;
  }
}

function isUnchanged(
  key: string,
  value: string | string[] | number | [number, number],
) {
  if (key === 'taggedWith') {
    return value === savedFilterState.value.get(key)?.value;
  } else if (key === 'moneySpent') {
    const [min, max] = value as [number, number];
    const savedMoneySpent = savedFilterState.value.get(key)?.value as [
      number,
      number,
    ];

    return min === savedMoneySpent?.[0] && max === savedMoneySpent?.[1];
  } else if (key === 'accountStatus') {
    const savedAccountStatus =
      (savedFilterState.value.get(key)?.value as string[]) || [];
    return (
      Array.isArray(value) &&
      (value as string[]).every((val) =>
        savedAccountStatus?.includes(val as string),
      )
    );
  }
}
</script>
