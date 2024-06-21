<template lang="pug">
Box(
  position="relative",
  :visuallyHidden="titleHidden",
  :paddingBlockStart="{ xs: '400', md: '600' }",
  :paddingBlockEnd="{ xs: '400', md: '600' }",
  :paddingInlineStart="{ xs: '400', sm: '0' }",
  :paddingInlineEnd="{ xs: '400', sm: '0' }",
)
  div(
    v-if="labelForPageReadyAccessibilityLabel",
    role="status",
  )
    Text(visuallyHidden, as="p")
      | {{ i18n.translate('Polaris.Page.Header.pageReadyAccessibilityLabel',
      | { title: labelForPageReadyAccessibilityLabel }) }}
  div(:class="headerClassNames")
    div(:class="styles.Row")
      //- #slot1
      template(
        v-if="!conditionMobileCompact",
      )
        div(:class="styles.BreadcrumbWrapper")
          Box(
            maxWidth="100%",
            printHidden,
            paddingInlineEnd="100",
          )
            Breadcrumbs(
              v-if="backAction",
              :backAction="backAction",
            )
      //- #slot2
      PageTitle(v-bind="pageTitleProps")
        slot(name="pageTitle")
      div(
        v-if="conditionHasRightAlign",
        :class="styles.RightAlign",
      )
        div(:class="styles.Actions")
          //- #slot3
          ActionMenu(v-bind="actionMenuProps")
            slot(name="secondaryActions")
          PrimaryAction(
            v-if="(slots.primaryAction || primaryAction) && !isNavigationCollapsed && !conditionDesktopCompact",
            v-bind="primaryActionProps",
          )
            slot(name="primaryAction")
          //- #slot4
          template(v-if="conditionSlot4")
            PrimaryAction(
              v-if="(slots.primaryAction || primaryAction) && (isNavigationCollapsed || conditionDesktopCompact)",
              v-bind="primaryActionProps",
            )
              slot(name="primaryAction")
            Pagination(
              v-if="!isNavigationCollapsed && !conditionDesktopCompact",
              :pagination="pagination",
            )
              slot(v-if="hasSlot(slots.pagination)", name="pagination")
    //- #slot5
    div(
      v-if="additionalMetadata",
      :class="styles.Row",
    )
      InlineStack(gap="400")
        div(:class="styles.AdditionalMetaData")
          Text(tone="subdued", as="span", variant="bodySm")
            slot(name="additionalMetadata")
</template>

<script setup lang="ts">
import { computed, useSlots, provide } from 'vue';
import type {
  DestructableAction,
  DisableableAction,
  LoadableAction,
  IconableAction,
  TooltipAction,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '@/utilities/types';
import useI18n from '@/use/useI18n';
import { Box, InlineStack, Text, Breadcrumbs } from '@/components';
import { useMediaQueryContext } from '@/use/useMediaQuery';
import type { PaginationProps } from '@/components/Pagination/types.ts';
import type { BreadcrumbsProps } from '@/components/Breadcrumbs/Breadcrumbs.vue';
import { useHasSlot } from '@/use/useHasSlot';
import { classNames } from '@/utilities/css';
import type { TitleProps } from './components/Title/Title.vue';
import type { ActionMenuProps } from '../../../ActionMenu/ActionMenu.vue';
import {
  ActionMenu,
  PrimaryAction,
  Pagination,
  PageTitle,
} from './children';
import styles from '@polaris/components/Page/components/Header/Header.module.css';

//    Header Layout
// |----------------------------------------------------|
// | slot1 | slot2 |                    | slot3 | slot4 |
// |----------------------------------------------------|
// | slot5 |                                            |
// |----------------------------------------------------|
//

export interface PrimaryActionType
  extends DestructableAction,
  DisableableAction,
  LoadableAction,
  IconableAction,
  TooltipAction {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}

export interface HeaderProps extends TitleProps {
  /** Visually hide the title */
  titleHidden?: boolean;
  /** A label to use for the page when the page is ready, used by screen readers. Will override the title prop if present */
  pageReadyAccessibilityLabel?: string;
  /** Enables filtering action list items */
  filterActions?: boolean;
  /** Primary page-level action */
  primaryAction?: PrimaryActionType;
  /** Page-level pagination */
  pagination?: PaginationProps;
  /** A back action link */
  backAction?: BreadcrumbsProps['backAction'];
  /** Collection of secondary page-level actions */
  secondaryActions?: MenuActionDescriptor[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: MenuGroupDescriptor[];
  // Additional meta data
  additionalMetadata?: string;
}

const SHORT_TITLE = 20;
const REALLY_SHORT_TITLE = 8;
const LONG_TITLE = 34;

const props = defineProps<HeaderProps>();

const emits = defineEmits<{
  /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
  (event: 'action-rollup', hasRolledUp: boolean): void;
}>();

const i18n = useI18n();
const { isNavigationCollapsed } = useMediaQueryContext();
const slots = useSlots();
const { hasSlot } = useHasSlot();

const isSingleRow = computed(() =>
  (!props.primaryAction || hasSlot(slots.primaryAction)) &&
  !props.pagination &&
  (!props.secondaryActions?.length || hasSlot(slots.secondaryActions)) &&
  !props.actionGroups?.length,
);

const hasActionGroupsOrSecondaryActions = computed(() =>
  (props.actionGroups && props.actionGroups.length > 0) ||
  (props.secondaryActions && props.secondaryActions.length > 0) ||
  hasSlot(slots.secondaryActions),
);

const headerClassNames = computed(() =>
  classNames(
    isSingleRow && styles.isSingleRow,
    (props.backAction || props.pagination && !isNavigationCollapsed) && styles.hasNavigation,
    (((props.secondaryActions && props.secondaryActions.length > 0 || hasGroupsWithActions(props.actionGroups)))
      || hasSlot(slots.secondaryActions)) && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
    !props.backAction && styles.noBreadcrumbs,
    props.title && props.title.length < LONG_TITLE && styles.mediumTitle,
    props.title && props.title.length > LONG_TITLE && styles.longTitle,
  ),
);

const labelForPageReadyAccessibilityLabel = computed(() =>
  props.pageReadyAccessibilityLabel || props.title,
);

const conditionMobileCompact = computed(() =>
  isNavigationCollapsed &&
  !props.backAction &&
  props.title != null &&
  props.title.length <= REALLY_SHORT_TITLE,
);

const conditionDesktopCompact = computed(() => {
  return !isNavigationCollapsed
    && !props.pagination
    && !props.secondaryActions
    && !slots.secondaryActions
    && props.title != null && props.title.length <= SHORT_TITLE
});

const primaryActionProps = computed(() => {
  return { ...props.primaryAction };
});

const pageTitleProps = computed(() => {
  return {
    title: props.title,
    subtitle: props.subtitle,
    compactTitle: props.compactTitle,
    hasSubtitleMaxWidth: hasActionGroupsOrSecondaryActions.value,
  };
});

const actionMenuProps = computed(() => {
  return {
    title: props.title,
    secondaryActions: props.secondaryActions,
    actionGroups: props.actionGroups,
  };
});

const conditionSlot4 = computed(() => {
  return ((isNavigationCollapsed || conditionDesktopCompact.value) && primaryActionProps.value)
    || (!isNavigationCollapsed && !conditionDesktopCompact.value && props.pagination);
});

const conditionHasRightAlign = computed(() => {
  return (props.primaryAction || slots.primaryAction)
    || (props.secondaryActions || slots.secondaryActions)
    && (
      ((props.secondaryActions && !slots.secondaryActions && props.secondaryActions.length > 0)
        || (slots.secondaryActions && !props.secondaryActions && !slots.secondaryActions.length))
    )
    || ((props.actionGroups && props.actionGroups.length > 0) || slots.actionGroups);
});

const hasGroupsWithActions = (groups: ActionMenuProps['groups'] = []) => {
  return groups.length === 0
    ? false
    : groups.some((group) => group.actions.length > 0);
};

provide('filterActions', Boolean(props.filterActions));
</script>
