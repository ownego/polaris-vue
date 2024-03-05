<template>
<LegacyCard>
  <IndexFilters
    hide-filters
    hide-query-field
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
    :filters="[]"
    :appliedFilters="[]"
    :mode="mode"
    @set-mode="setMode"
    @query-clear="handleQueryValueRemove"
    @sort="handleFiltersSort"
    @select="handleFiltersSelect"
    @create-new-view="onCreateNewView"
    @clear-all="() => {}"
  />
  <IndexTable
    :condensed="false"
    :resourceName="resourceName"
    :itemCount="orders.length"
    :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
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
      v-for="{ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index in orders"
      :id="id"
      :key="id"
      :position="index"
      :selected="selectedResources.includes(id)"
    >
      <IndexTableCell>
        <Text variant="bodyMd" fontWeight="bold" as="span">{{ order }}</Text>
      </IndexTableCell>
      <IndexTableCell>{{ date }}</IndexTableCell>
      <IndexTableCell>{{ customer }}</IndexTableCell>
      <IndexTableCell>
        <Text as="span" alignment="end" numeric>{{ total }}</Text>
      </IndexTableCell>
      <IndexTableCell>
        <component :is="paymentStatus"></component>
      </IndexTableCell>
      <IndexTableCell>
        <component :is="fulfillmentStatus"></component>
      </IndexTableCell>
    </IndexTableRow>
  </IndexTable>
</LegacyCard>
</template>

<script setup lang="ts">
import { computed, h, ref, resolveComponent } from 'vue';
// import { useIndexResourceState, useBreakpoints } from '@ownego/polaris-vue';
import { useIndexResourceState } from '@/polaris-vue';

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const itemStrings = ref([
  'All',
  'Unpaid',
  'Open',
  'Closed',
  'Local delivery',
  'Local pickup',
]);

const selected = ref(0);
const sortSelected = ref(['order asc']);
const queryValue = ref('');
const mode = ref('DEFAULT');
// const { mode, setMode } = useSetIndexFiltersMode();

const setMode = (newMode: string) => {
  mode.value = newMode;
};

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

  if (!value) {
    return true;
  }

  itemStrings.value = [...itemStrings.value, value];
  selected.value = itemStrings.value.length;
  return true;
};

// Filter actions
const handleFiltersSort = (value: string[]) => {
  sortSelected.value = value;
};

const handleFiltersSelect = (index: number) => {
  selected.value = index;
};

const handleQueryValueRemove = () => {
  queryValue.value = '';
};
</script>


