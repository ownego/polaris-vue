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
import { ref, h, resolveComponent, computed } from 'vue';

const taggedWith = ref<string>('');
const accountStatus = ref<string[]>();
const accountId = ref();
const moneySpent = ref<[number, number] | undefined>();
const queryValue = ref('');

const appliedFilters = computed(() => {
  const tmpFilters = [];

  if (!isEmpty(accountStatus.value)) {
    const name = 'accountStatus';
    tmpFilters.push({
      name,
      label: disambiguateLabel(name, accountStatus.value),
      onRemove: handleAccountStatusRemove,
    });
  }

  if (!isEmpty(accountId.value)) {
    const name = 'accountId';
    tmpFilters.push({
      name,
      label: disambiguateLabel(name, accountId.value),
      onRemove: handleAccountIdRemove,
    });
  }

  if (!isEmpty(moneySpent.value)) {
    const name = 'moneySpent';
    tmpFilters.push({
      name,
      label: disambiguateLabel(name, moneySpent.value),
      onRemove: handleMoneySpentRemove,
    });
  }

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

const handleTaggedWithRemove = () => {
  taggedWith.value = '';
};

const handleQueryValueRemove = () => {
  queryValue.value = '';
};

const handleAccountStatusRemove = () => {
  accountStatus.value = [];
};

const handleAccountIdRemove = () => {
  accountId.value = undefined;
};

const handleMoneySpentRemove = () => {
  moneySpent.value = undefined;
};

const handleAccountStatusChange = (value: string[]) => {
  accountStatus.value = value;
};

const handleFiltersQueryChange = (value: string) => {
  queryValue.value = value;
}

const handleMoneySpentChange = (value: [number, number]) => {
  moneySpent.value = value;
};

const handleTaggedWithChange = (_e: Event, value: string) => {
  taggedWith.value = value;
};

const handleAccountIdChange = (_e: Event, value: string) => {
  accountId.value = value;
};

const handleFiltersClearAll = () => {
  handleAccountStatusRemove();
  handleMoneySpentRemove();
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
  },
  {
    name: 'accountStatus',
    label: 'Account status',
    section: 'Account filters',
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
      onChange: handleAccountStatusChange,
    }),
  },
  {
    name: 'accountId',
    label: 'Account ID',
    section: 'Account filters',
    filter: () => h(resolveComponent('TextField'), {
      label: 'Account ID',
      modelValue: accountId.value,
      autoComplete: 'off',
      labelHidden: true,
      onInput: handleAccountIdChange,
    }),
  },
  {
    name: 'moneySpent',
    label: 'Money spent',
    section: 'Money filters',
    filter: () => h(resolveComponent('RangeSlider'), {
      label: 'Money spent is between',
      labelHidden: true,
      modelValue: moneySpent.value || [0, 500],
      prefix: "$",
      output: true,
      min: 0,
      max: 2000,
      step: 1,
      onChange: handleMoneySpentChange,
    }),
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

function disambiguateLabel(name: string, value: any) {
  switch (name) {
    case 'moneySpent':
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case 'taggedWith':
      return `Tagged with ${value}`;
    case 'accountStatus':
      return value?.map((val: string) => `Customer ${val}`).join(', ');
    case 'accountId':
      return `Account id: ${value}`;
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

