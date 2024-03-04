<template>
<div :style="{width: '430px'}">
  <LegacyCard>
    <IndexFilters
      :sortOptions="sortOptions"
      :sortSelected="sortSelected"
      :queryValue="queryValue"
      queryPlaceholder="Searching in all"
      :primaryAction="primaryAction"
      :cancelAction="{
        onAction: onHandleCancel,
        disabled: false,
        loading: false,
      }"
      :tabs="tabs"
      :selected="selected"
      canCreateNewView
      :filters="filters"
      :appliedFilters="appliedFilters"
      :onClearAll="handleFiltersClearAll"
      :mode="mode"
      :setMode="setMode"
      @query-change="handleFiltersQueryChange"
      @query-clear="handleFiltersQueryClear"
      @sort="handleSortChange"
      @select="handleSelectChange"
      @creat-new-view="onCreateNewView"
    />
    <IndexTable
      :resourceName="resourceName"
      :itemCount="orders.length"
      :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
      condensed
      @selection-change="handleSelectionChange"
      :headings="[
        {title: 'Order'},
        {title: 'Date'},
        {title: 'Customer'},
        {title: 'Total', alignment: 'end'},
        {title: 'Payment status'},
        {title: 'Fulfillment status'},
      ]"
    >
      <IndexTableRow
        v-for="{id, order, date, customer, total, paymentStatus, fulfillmentStatus}, index in orders"
        :id="id"
        :key="id"
        :selected="selectedResources.includes(id)"
        :position="index"
      >
        <div :style="{padding: '12px 16px', width: '100%'}">
          <BlockStack gap="100">
            <Text as="span" variant="bodySm" tone="subdued">
              {{ order }} • {{ date }}
            </Text>
            <InlineStack align="space-between">
              <Text as="span" variant="bodyMd" fontWeight="semibold">
                {{ customer }}
              </Text>
              <Text as="span" variant="bodyMd">
                {{ total }}
              </Text>
            </InlineStack>
            <InlineStack align="start" gap="100">
              <component :is="paymentStatus" />
              <component :is="fulfillmentStatus" />
            </InlineStack>
          </BlockStack>
        </div>
      </IndexTableRow>
    </IndexTable>
  </LegacyCard>
</div>

</template>

<script setup lang="ts">
import { computed, h, ref, resolveComponent } from 'vue';
// import { useIndexResourceState } from '@ownego/polaris-vue';
import { useIndexResourceState } from '@/polaris-vue';

const handleAccountStatusChange = (value: string[]) => {
  accountStatus.value = value;
};

const handleMoneySpentChange = (value: [number, number]) => {
  moneySpent.value = value;
};

const handleTaggedWithChange = (value: string) => {
  taggedWith.value = value;
};

const handleFiltersQueryChange = (value: string) => {
  queryValue.value = value;
};

const handleAccountStatusRemove = () => {
  accountStatus.value = undefined;
};

const handleMoneySpentRemove = () => {
  moneySpent.value = undefined;
};

const handleTaggedWithRemove = () => {
  taggedWith.value = '';
};

const handleQueryValueRemove = () => {
  queryValue.value = '';
};

const handleFiltersClearAll = () => {
  handleAccountStatusRemove();
  handleMoneySpentRemove();
  handleTaggedWithRemove();
  handleQueryValueRemove();
}

const filters = [
  {
    key: 'accountStatus',
    label: 'Account status',
    filter: () => h(
      resolveComponent('ChoiceList'),
      {
        title: 'Account status',
        titleHidden: true,
        choices: filterChoices,
        selected: accountStatus || [],
        onChange: handleAccountStatusChange,
        allowMultiple: true,
      },
    ),
    shortcut: true,
  },
  {
    key: 'taggedWith',
    label: 'Tagged with',
    filter: () => h(
      resolveComponent('TextField'),
      {
        label: 'Tagged with',
        value: taggedWith,
        onChange: handleTaggedWithChange,
        autoComplete: 'off',
        labelHidden: true,
      },
    ),
    shortcut: true,
  },
  {
    key: 'moneySpent',
    label: 'Money spent',
    filter: () => h(
      resolveComponent('RangeSlider'),
      {
        label: 'Money spent is between',
        labelHidden: true,
        value: moneySpent || [0, 500],
        prefix: '$',
        output: true,
        min: 0,
        max: 2000,
        step: 1,
        onChange: handleMoneySpentChange,
      },
    ),
  },
];

const appliedFilters = computed(() => {
  const results = [];

  if (accountStatus.value && !isEmpty(accountStatus.value)) {
    const key = 'accountStatus';
    results.push({
      key,
      label: disambiguateLabel(key, accountStatus.value),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (moneySpent.value) {
    const key = 'moneySpent';
    results.push({
      key,
      label: disambiguateLabel(key, moneySpent.value),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith.value)) {
    const key = 'taggedWith';
    results.push({
      key,
      label: disambiguateLabel(key, taggedWith.value),
      onRemove: handleTaggedWithRemove,
    });
  }

  return results;
});

const orders = [
  {
    id: '1020',
    order: '#1020',
    date: 'Jul 20 at 4:34pm',
    customer: 'Jaydon Stanton',
    total: '$969.44',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'complete' }, () => 'Paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
  },
  {
    id: '1019',
    order: '#1019',
    date: 'Jul 20 at 3:46pm',
    customer: 'Ruben Westerfelt',
    total: '$701.19',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'partiallyComplete' }, () => 'Partially paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
  },
  {
    id: '1018',
    order: '#1018',
    date: 'Jul 20 at 3.44pm',
    customer: 'Leo Carder',
    total: '$798.24',
    paymentStatus: () => h(resolveComponent('Badge'), { progress: 'complete' }, () => 'Paid'),
    fulfillmentStatus: () => h(resolveComponent('Badge'), { progress: 'incomplete' }, () => 'Unfulfilled'),
  },
];

const resourceName = {
  singular: 'order',
  plural: 'orders',
};

const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(orders);

function disambiguateLabel(key: string, value: any[] | string): string {
  switch (key) {
    case 'moneySpent':
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case 'taggedWith':
      return `Tagged with ${value}`;
    case 'accountStatus':
      return (value as string[]).map((val) => `Customer ${val}`).join(', ');
    default:
      return value as string;
  }
}

function isEmpty(value: string | string[]) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
</script>
