<template>
<LegacyCard>
  <div :style="cardStyle">
    <div style="padding: 12px">
      <TextField
        clearButton
        labelHidden
        label="Customer segments"
        placeholder="Search segments"
        autoComplete="off"
        v-model="query"
        :focused="showFooterAction"
        :ariaActiveDescendant="activeOptionId"
        :ariaControls="listboxId"
        @input="handleQueryChange"
        @clear-button-click="handleQueryClear"
      >
        <template #prefix>
          <Icon :source="SearchIcon"/>
        </template>
      </TextField>
    </div>
    <Scrollable
      shadow
      :style="scrollableStyle"
      @scrolled-to-bottom="handleLazyLoadSegments"
    >
      <Listbox
        enableKeyboardControl
        accessibilityLabel="Search for and select a customer segment"
        autoSelection="FIRST_SELECTED"
        :customListId="listboxId"
        @select="handleSegmentSelect"
        @active-option-change="handleActiveOptionChange"
      >
        <template v-if="segmentOptions.length > 0">
          <template v-for="{ label, value } in segmentList" :key="value">
            <ListboxOption :value="value" :selected="segments[selectedSegmentIndex].value === value">
              <ListboxTextOption :selected="segments[selectedSegmentIndex].value === value">
                {{ label }}
              </ListboxTextOption>
            </ListboxOption>
          </template>
        </template>
        <ListboxAction v-if="showFooterAction" :value="actionValue">
          <span style="color: var(--p-color-text-emphasis)">
            Show all 111 segments
          </span>
        </ListboxAction>
        <EmptySearchResult
          v-if="segmentOptions.length === 0"
          title=""
          :description="`No segments found matching ${query}`"
        />
        <ListboxLoading
          v-if="lazyLoading"
          :accessibilityLabel="`${query ? 'Filtering' : 'Loading'} customer segments`"
        />
      </Listbox>
    </Scrollable>
  </div>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref, computed, type CSSProperties } from 'vue';
import SearchIcon from '@icons/SearchIcon.svg';

const actionValue = '__ACTION__';
const interval = 25;

const segments = [
  {
    label: 'All customers',
    id: 'gid://shopify/CustomerSegment/1',
    value: '0',
  },
  {
    label: 'VIP customers',
    id: 'gid://shopify/CustomerSegment/2',
    value: '1',
  },
  {
    label: 'New customers',
    id: 'gid://shopify/CustomerSegment/3',
    value: '2',
  },
  {
    label: 'Abandoned carts - last 30 days',
    id: 'gid://shopify/CustomerSegment/4',
    value: '3',
  },
  {
    label: 'Wholesale customers',
    id: 'gid://shopify/CustomerSegment/5',
    value: '4',
  },
  {
    label: 'Email subscribers',
    id: 'gid://shopify/CustomerSegment/6',
    value: '5',
  },
  {
    label: 'From New York',
    id: 'gid://shopify/CustomerSegment/7',
    value: '6',
  },
  {
    label: 'Repeat buyers',
    id: 'gid://shopify/CustomerSegment/8',
    value: '7',
  },
  {
    label: 'First time buyers',
    id: 'gid://shopify/CustomerSegment/9',
    value: '8',
  },
  {
    label: 'From Canada',
    id: 'gid://shopify/CustomerSegment/10',
    value: '9',
  },
  {
    label: 'Bought in last 60 days',
    id: 'gid://shopify/CustomerSegment/11',
    value: '10',
  },
  {
    label: 'Bought last BFCM',
    id: 'gid://shopify/CustomerSegment/12',
    value: '11',
  },
];

const listboxId = 'SearchableListbox';

const cardStyle = {
  alignItems: 'stretch',
  borderTop: '1px solid #DFE3E8',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
} as CSSProperties;

const scrollableStyle = {
  position: 'relative',
  height: '292px',
  padding: 'var(--p-space-200) 0',
  borderBottomLeftRadius: 'var(--p-border-radius-200)',
  borderBottomRightRadius: 'var(--p-border-radius-200)',
};

const lazyLoadSegments = Array.from(Array(100)).map((_, index) => ({
  label: `Other customers ${index + 13}`,
  id: `gid://shopify/CustomerSegment/${index + 13}`,
  value: `${index + 12}`,
}));

segments.push(...lazyLoadSegments);

const showFooterAction = ref(true);
const query = ref('');
const lazyLoading = ref(false);
const willLoadMoreResult = ref(true);
const visibleOptionIndex = ref(6);
const activeOptionId = ref(segments[0].id);
const selectedSegmentIndex = ref(0);
const filteredSegments = ref<any>([]);

const segmentOptions = computed(() => query.value ? filteredSegments.value : segments);
const segmentList = computed(() => {
  const options = segmentOptions.value;
  return options.slice(0, visibleOptionIndex.value);
});

const handleClickShowAll = () => {
  showFooterAction.value = false;
  visibleOptionIndex.value = segments.length;
};

const handleFilterSegments = (query: string) => {
  const nextFilteredSegments = segments.filter((segment) => {
    return segment.label
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase().trim());
  });

  filteredSegments.value = nextFilteredSegments;
};

const handleQueryChange = (_e: Event, value: string) => {
  query.value = value;

  if (query.value.length >= 2) handleFilterSegments(query.value);
};

const handleQueryClear = (e: Event) => {
  handleQueryChange(e, '');
};

const handleSegmentSelect = (segmentIndex: string) => {
  if (segmentIndex === actionValue) {
    return handleClickShowAll();
  }

  selectedSegmentIndex.value = (Number(segmentIndex));
};

const handleActiveOptionChange = (_: string, domId: string) => {
  activeOptionId.value = domId;
};

// This is just to illustrate lazy loading state vs loading state. This is an
// example, so we aren't fetching from GraphQL. You'd use `pageInfo.hasNextPage`
// from your GraphQL query data instead of this fake "willLoadMoreResults" state
// along with setting `first` your GraphQL query's variables to your app's
// default max edges limit (e.g., 250).
const handleLazyLoadSegments = () => {
  if (willLoadMoreResult.value && !showFooterAction) {
    lazyLoading.value = true;

    const options = query.value ? filteredSegments.value : segments;

    setTimeout(() => {
      const remainingOptionCount = options.length - visibleOptionIndex.value;
      const nextVisibleOptionIndex =
        remainingOptionCount >= interval
          ? visibleOptionIndex.value + interval
          : visibleOptionIndex.value + remainingOptionCount;

      lazyLoading.value = false;
      visibleOptionIndex.value = nextVisibleOptionIndex;

      if (remainingOptionCount <= interval) {
        willLoadMoreResult.value = false;
      }
    }, 1000);
  }
};
</script>
