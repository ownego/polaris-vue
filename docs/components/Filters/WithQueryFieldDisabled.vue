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
          disable-query-field
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
import { ref, h, watch } from 'vue';
import { ChoiceList, TextField, RangeSlider } from '@/components';

const taggedWith = ref<string>('');
const accountStatus = ref<string[]>([]);
const moneySpent = ref<[number, number] | undefined>([0, 500]);
const queryValue = ref('');
const test = ref(false);

const handleTaggedWithRemove = () => {
  taggedWith.value = '';
};

const handleQueryValueRemove = () => {
  queryValue.value = '';
};

const handleAccountStatusRemove = () => {
  accountStatus.value = [];
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

const handleMoneySpentChange = (value: any) => {
  moneySpent.value = value;
};

const handleTaggedWithChange = (value: string) => {
  taggedWith.value = value;
};

const handleFiltersClearAll = () => {
  handleAccountStatusRemove();
  handleMoneySpentRemove();
  handleTaggedWithRemove();
  handleQueryValueRemove();

  appliedFilters.value = [];
};

const appliedFilters = ref<any>([]);

watch(
  () => [accountStatus.value, moneySpent.value, taggedWith.value],
  () => {
    if (!isEmpty(accountStatus.value)) {
      const key = 'accountStatus';
      // Remove existing filter so we can add the updated one
      appliedFilters.value.forEach((filter: any) => {
        if (filter.key === key) {
          appliedFilters.value.splice(appliedFilters.value.indexOf(filter), 1);
        }
      });
      appliedFilters.value.push({
        key,
        label: disambiguateLabel(key, accountStatus.value),
        onRemove: handleAccountStatusRemove,
      });
    } else {
      appliedFilters.value.forEach((filter: any) => {
        if (filter.key === 'accountStatus') {
          appliedFilters.value.splice(appliedFilters.value.indexOf(filter), 1);
        }
      });
    }

    if (!isEmpty(moneySpent.value)) {
      const key = 'moneySpent';
      // Remove existing filter so we can add the updated one
      appliedFilters.value.forEach((filter: any) => {
        if (filter.key === key) {
          appliedFilters.value.splice(appliedFilters.value.indexOf(filter), 1);
        }
      });
      appliedFilters.value.push({
        key,
        label: disambiguateLabel(key, moneySpent.value),
        onRemove: handleMoneySpentRemove,
      });
    } else {
      appliedFilters.value.forEach((filter: any) => {
        if (filter.key === 'moneySpent') {
          appliedFilters.value.splice(appliedFilters.value.indexOf(filter), 1);
        }
      });
    }

    if (!isEmpty(taggedWith.value)) {
      const key = 'taggedWith';
       // Remove existing filter so we can add the updated one
      appliedFilters.value.forEach((filter: any) => {
        if (filter.key === key) {
          appliedFilters.value.splice(appliedFilters.value.indexOf(filter), 1);
        }
      });
      appliedFilters.value.push({
        key,
        label: disambiguateLabel(key, taggedWith.value),
        onRemove: handleTaggedWithRemove,
      });
    } else {
      appliedFilters.value.forEach((filter: any) => {
        if (filter.key === 'taggedWith') {
          appliedFilters.value.splice(appliedFilters.value.indexOf(filter), 1);
        }
      });
    }
  }
);

const filters = [
  {
    key: 'accountStatus',
    label: 'Account status',
    filter: h(ChoiceList, {
      title: 'Account status',
      titleHidden: true,
      choices: [
        {label: 'Enabled', value: 'enabled'},
        {label: 'Not invited', value: 'not invited'},
        {label: 'Invited', value: 'invited'},
        {label: 'Declined', value: 'declined'},
      ],
      modelValue: accountStatus.value,
      onChange: handleAccountStatusChange,
      allowMultiple: true,
    }),
    shortcut: true,
  },
  {
    key: 'taggedWith',
    label: 'Tagged with',
    filter: h(TextField, {
      label: "Tagged with",
      modelValue: taggedWith.value,
      autoComplete: "off",
      labelHidden: test.value,
      'onUpdate:modelValue': (value: string) => {
        taggedWith.value = value;
      },
    }),
    shortcut: true,
  },
  {
    key: 'moneySpent',
    label: 'Money spent',
    filter: h(RangeSlider, {
      label: "Money spent is between",
      labelHidden: true,
      modelValue: moneySpent.value || [0, 500],
      prefix: "$",
      output: true,
      min: 0,
      max: 2000,
      step: 1,
      'onUpdate:modelValue': (value: [number, number]) => {
        moneySpent.value = value;
      },
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
