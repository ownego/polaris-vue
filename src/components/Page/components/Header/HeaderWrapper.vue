<template lang="pug">
div(:class="headerClassNames")
  template(v-if="hasSlot1 || hasSlot2 || hasSlot3 || hasSlot4")
    div(:class="styles.Row")
      slot(name="slot1")
      slot(name="slot2")
      template(v-if="hasSlot3 || hasSlot4")
        div(:class="styles.RightAlign")
          div(
            v-if="hasSlot3 && hasSlot4",
            :class="styles.Actions"
          )
            slot(name="slot3")
            slot(name="slot4")
          template(v-else)
            slot(name="slot3")
            slot(name="slot4")
  template(v-if="hasSlot5 || hasSlot6")
    div(:class="styles.Row")
      div(:class="styles.LeftAlign")
        slot(name="slot5")
      template(v-if="hasSlot6")
        div(:class="styles.RightAlign")
          slot(name="slot6")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Page-Header.json';
import type { IconSource } from '@/utilities/type';
import type { PaginationProps } from '@/components/Pagination/utils';
import type { BreadcrumbsProps } from '@/components/Breadcrumbs/utils';
import type { MenuActionDescriptor } from '@/utilities/interface';
import type { MenuGroupDescriptor } from '@/components/ActionMenu/components/MenuGroup/utils';
import { UseMediaQuery } from '@/utilities/media-query';
import type { ActionMenuProps } from '@/components/ActionMenu/utils';
import { hasSlot } from '@/utilities/has-slot';

const LONG_TITLE = 34;

type PrimaryAction = {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconSource;
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}

interface HeaderProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type*/
  subtitle?: string;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
  /** Visually hide the title */
  titleHidden?: boolean;
  /** Primary page-level action */
  primaryAction?: PrimaryAction;
  /** Page-level pagination */
  pagination?: PaginationProps;
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** Collection of secondary page-level actions */
  secondaryActions?: MenuActionDescriptor[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: MenuGroupDescriptor[];
  // Additional meta data
  additionalMetadata?: string;
}

const props = defineProps<HeaderProps>();

const slots = useSlots();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const isSingleRow = computed(() => {
  return !props.primaryAction
  && slots.primaryAction
  && !props.pagination
  && (
    ((props.secondaryActions && !slots.secondaryActions)
    && !props.secondaryActions.length)
    || slots.secondaryActions
  )
  && (!props.actionGroups || !props.actionGroups.length);
})

const hasNavigationMarkup = computed(() => {
  return (props.breadcrumbs && props.breadcrumbs.length > 0)
  || props.pagination && !isNavigationCollapsed
  || slots.additionalNavigation
});

const hasActionMenuMarkup = computed(() => {
  return !slots.default
  || ((props.secondaryActions && props.secondaryActions.length > 0)
  || hasGroupsWithActions(props.actionGroups))
});

const headerClassNames = computed(() => {
  return classNames(
    styles.Header,
    isSingleRow.value && styles.isSingleRow,
    props.titleHidden && styles.titleHidden,
    hasNavigationMarkup.value && styles.hasNavigation,
    hasActionMenuMarkup.value && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
    (!props.breadcrumbs || !props.breadcrumbs.length) && styles.noBreadcrumbs,
    props.title && props.title.length < LONG_TITLE && styles.mediumTitle,
    props.title && props.title.length > LONG_TITLE && styles.longTitle,
  );
});

const hasSlot1 = computed(() => {
  return hasSlot(slots.slot1);
});

const hasSlot2 = computed(() => {
  return hasSlot(slots.slot2);
});

const hasSlot3 = computed(() => {
  return hasSlot(slots.slot3);
});

const hasSlot4 = computed(() => {
  return hasSlot(slots.slot4);
});

const hasSlot5 = computed(() => {
  return hasSlot(slots.slot5);
});

const hasSlot6 = computed(() => {
  return hasSlot(slots.slot6);
});

function hasGroupsWithActions(groups: ActionMenuProps['groups'] = []) {
  return groups.length === 0
    ? false
    : groups.some((group) => group.actions.length > 0);
}
</script>
