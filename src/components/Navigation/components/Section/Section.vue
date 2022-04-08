<template lang="pug">
ul(:class="className")
  li(v-if="title", :class="styles.SectionHeading")
    span(:class="styles.Text")
      | {{ title }}
    button(
      v-if="action",
      type="button",
      :class="styles.Action",
      :aria-label="action.accessibilityLabel",
      @click="action.onClick",
    )
      Icon(:source="action.icon")
  template(v-if="sectionItems.length > 0")
    Item(
      v-for="item, index in sectionItems",
      :key="item.label",
      v-bind="{ ...item }",
      :label="item.label",
      :subNavigationItems="item.subNavigationItems",
      :expanded="expandedIndex === index",
      @click="handleClick(item.subNavigationItems != null && item.subNavigationItems.length > 0)",
      @toggle-expanded-state="handleToggleExpandedState(index)",
    )

  li(
    v-if="rollup && items.slice(rollup.after).length > 0",
    :class="styles.RollupSection",
  )
    Collapsible(:id="additionalItemsId", :open="expanded")
      ul(:class="styles.List")
        Item(
          v-for="item, index in items.slice(rollup.after)",
          :key="item.label",
          v-bind="item",
          :label="item.label",
          :subNavigationItems="item.subNavigationItems",
          :expanded="expandedIndex === index",
          @click="handleClick(item.subNavigationItems != null && item.subNavigationItems.length > 0)",
          @toggle-expanded-state="handleToggleExpandedState(index)",
        )
    div(
      v-if="rollup && items.length > rollup.after",
      :class="styles.ListItem",
      key="List Item"
    )
      button(
        type="button",
        :class="toggleClassName",
        :aria-label="ariaLabel",
        @click="toggleExpanded",
      )
        span(:class="styles.Icon")
          Icon(:source="HorizontalDotsMinor")
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { UseMediaQuery } from '@/utilities/media-query';
import { UseUniqueId } from '@/use';
import styles from '@/classes/Navigation.json';
import HorizontalDotsMinor from '@icons/HorizontalDotsMinor.svg';
import { Collapsible, Icon } from '@/components';
import type { IconProps } from '@/components/Icon/utils';
import { Item } from '../Item';
import type { ItemProps } from '../Item/utils';

interface SectionProps {
  /** A collection of navigation items to be rendered inside the section */
  items: ItemProps[];
  icon?: IconProps['source'];
  title?: string;
  fill?: boolean;
  rollup?: {
    after: number;
    view: string;
    hide: string;
    activePath: string;
  };
  action?: {
    icon: IconProps['source'];
    accessibilityLabel: string;
    onClick(): void;
  };
  separator?: boolean;
}

const props = defineProps<SectionProps>();
const emits = defineEmits<{
  (e: 'click'): void;
}>();

const expanded = ref(false);

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

const setExpandedFalse = () => {
  expanded.value = false;
};

const animationFrame = ref<number | null>(null);
const expandedIndex = ref<number>();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const { useUniqueId } = UseUniqueId();
const additionalItemsId = useUniqueId('AdditionalItems');

const handleClick = (hasSubNavItems: boolean) => {
  emits('click');

  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }

  if (!hasSubNavItems || !isNavigationCollapsed) {
    animationFrame.value = requestAnimationFrame(setExpandedFalse);
  }
};

onMounted(() => {
  animationFrame.value && cancelAnimationFrame(animationFrame.value);
});

const className = computed(() => {
  return classNames(
    styles.Section,
    props.separator && styles['Section-withSeparator'],
    props.fill && styles['Section-fill'],
  );
});

const toggleClassName = classNames(styles.Item, styles.RollupToggle);
const ariaLabel = computed(() => {
  return props.rollup && (expanded.value ? props.rollup.hide : props.rollup.view);
});

const activeItemIndex = computed(() => {
  return props.items.findIndex((item: ItemProps) => {
    if (!props.rollup) {
      return false;
    }

    return (
      props.rollup.activePath === item.url ||
      (item.url && props.rollup.activePath.startsWith(item.url)) ||
      (item.subNavigationItems
        ? item.subNavigationItems.some(({url: itemUrl}) =>
          props.rollup && props.rollup.activePath.startsWith(itemUrl),
        )
        : false)
    );
  });
});

const handleToggleExpandedState = (index: number) => {
  if (expandedIndex.value === index) {
    expandedIndex.value = -1;
  } else {
    expandedIndex.value = index;
  }
};

const sectionItems = computed(() => {
  let sectionListItems: ItemProps[] = [];

  sectionListItems = props.rollup
    ? props.items.slice(0, props.rollup.after)
    : props.items;


  if (props.rollup && activeItemIndex.value !== -1 && activeItemIndex.value > props.rollup.after - 1) {
    const additionalItems = props.items.slice(props.rollup.after);

    sectionListItems.push(
      ...additionalItems.splice(activeItemIndex.value - props.rollup.after, 1),
    );
  }

  return sectionListItems;
});
</script>
