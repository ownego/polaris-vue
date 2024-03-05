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
      :mode="mode"
      @set-mode="setMode"
      @clear-all="handleFiltersClearAll"
      @create-new-view="onCreateNewView"
      @select="handleFiltersSelect"
      @query-change="handleFiltersQueryChange"
      @query-clear="handleQueryValueRemove"
      @sort="handleFiltersSort"
    />
    <IndexTable
      :resourceName="resourceName"
      :itemCount="orders.length"
      :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
      condensed
      :headings="[
        {title: 'Order'},
        {title: 'Date'},
        {title: 'Customer'},
        {title: 'Total', alignment: 'end'},
        {title: 'Payment status'},
        {title: 'Fulfillment status'},
      ]"
      @selection-change="handleSelectionChange"
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
              <component :is="paymentStatus"></component>
              <component :is="fulfillmentStatus"></component>
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
// import { useIndexResourceState, useSetIndexFiltersMode } from '@ownego/polaris-vue';
import { useIndexResourceState, useSetIndexFiltersMode } from '@/polaris-vue';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const itemStrings = ref(['All', 'Unpaid']);

const selected = ref(0);
const sortSelected = ref(['order asc']);
const accountStatus = ref<string[]>();
const moneySpent = ref<[number, number]>();
const taggedWith = ref('');
const queryValue = ref('');
const { mode, setMode } = useSetIndexFiltersMode();

const onHandleCancel = () => {};

const onHandleSave = async () => {
  await sleep(1);
  return true;
};

const tabs = computed(() => {
  return itemStrings.value.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string): Promise<boolean> => {
                const newItemsStrings = tabs.value.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);

                itemStrings.value = newItemsStrings;
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (value: string): Promise<boolean> => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
});

const primaryAction = computed(() => (
  selected.value === 0
  ? {
      type: 'save-as',
      onAction: onCreateNewView,
      disabled: false,
      loading: false,
    }
  : {
      type: 'save',
      onAction: onHandleSave,
      disabled: false,
      loading: false,
    }
));

const sortOptions = [
  {label: 'Order', value: 'order asc', directionLabel: 'Ascending'},
  {label: 'Order', value: 'order desc', directionLabel: 'Descending'},
  {label: 'Customer', value: 'customer asc', directionLabel: 'A-Z'},
  {label: 'Customer', value: 'customer desc', directionLabel: 'Z-A'},
  {label: 'Date', value: 'date asc', directionLabel: 'A-Z'},
  {label: 'Date', value: 'date desc', directionLabel: 'Z-A'},
  {label: 'Total', value: 'total asc', directionLabel: 'Ascending'},
  {label: 'Total', value: 'total desc', directionLabel: 'Descending'},
];

const filterChoices = [
  {label: 'Enabled', value: 'enabled'},
  {label: 'Not invited', value: 'not invited'},
  {label: 'Invited', value: 'invited'},
  {label: 'Declined', value: 'declined'},
];

const filters = [
  {
    name: 'accountStatus',
    label: 'Account status',
    filter: () => h(
      resolveComponent('ChoiceList'),
      {
        title: 'Account status',
        titleHidden: true,
        choices: filterChoices,
        modelValue: accountStatus.value || [],
        onChange: handleAccountStatusChange,
        allowMultiple: true,
      },
    ),
    shortcut: true,
  },
  {
    name: 'taggedWith',
    label: 'Tagged with',
    filter: () => h(
      resolveComponent('TextField'),
      {
        label: 'Tagged with',
        modelValue: taggedWith.value,
        autoComplete: 'off',
        labelHidden: true,
        onInput: handleTaggedWithChange,
      },
    ),
    shortcut: true,
  },
  {
    name: 'moneySpent',
    label: 'Money spent',
    filter: () => h(
      resolveComponent('RangeSlider'),
      {
        label: 'Money spent is between',
        labelHidden: true,
        modelValue: moneySpent.value || [0, 500],
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
    const name = 'accountStatus';
    results.push({
      name,
      label: disambiguateLabel(name, accountStatus.value),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (moneySpent.value) {
    const name = 'moneySpent';
    results.push({
      name,
      label: disambiguateLabel(name, moneySpent.value),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith.value)) {
    const name = 'taggedWith';
    results.push({
      name,
      label: disambiguateLabel(name, taggedWith.value),
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

// View actions
const deleteView = (index: number) => {
  const newItemStrings = [...itemStrings.value];
  newItemStrings.splice(index, 1);

  itemStrings.value = newItemStrings;
  selected.value = 0
};

const duplicateView = async (name: string) => {
  itemStrings.value = [...itemStrings.value, name];
  selected.value = itemStrings.value.length;

  await sleep(1);
  return true;
};

const onCreateNewView = async (value: string) => {
  await sleep(500);

  itemStrings.value = [...itemStrings.value, value];
  selected.value = itemStrings.value.length;
  return true;
};

// Filters
const handleFiltersSort = (value: string[]) => {
  sortSelected.value = value;
};

const handleFiltersSelect = (index: number) => {
  selected.value = index;
};

const handleAccountStatusChange = (value: string[]) => {
  accountStatus.value = value;
};

const handleMoneySpentChange = (value: [number, number]) => {
  moneySpent.value = value;
};

const handleTaggedWithChange = (_e: Event, value: string) => {
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
