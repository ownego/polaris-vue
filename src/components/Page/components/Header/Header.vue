<template lang="pug">
HeaderWrapper(v-bind="props")
  template(#slot1, v-if="!conditionMobileCompact")
    Breadcrumb(v-bind="breadcrumbProps")

  template(#slot2)
    PageTitle(v-bind="pageTitleProps")
      slot(name="pageTitle")

  template(#slot3)
    ActionMenu(v-bind="actionMenuProps")
      slot(name="secondaryActions")
    PrimaryAction(
      v-if="(slots.primaryAction || props.primaryAction) && !isNavigationCollapsed && !conditionDesktopCompact",
      v-bind="primaryActionProps",
    )
      slot(name="primaryAction")

  template(#slot4, v-if="conditionSlot4")
    PrimaryAction(
      v-if="(slots.primaryAction || props.primaryAction) && (isNavigationCollapsed || conditionDesktopCompact)",
      v-bind="primaryActionProps",
    )
      slot(name="primaryAction")
    Pagination(
      v-if="!isNavigationCollapsed && !conditionDesktopCompact",
      :pagination="pagination",
    )
      template(v-if="hasSlot(slots.pagination)")
        slot(name="pagination")

  template(#slot5)
    AdditionalMetadata(v-bind="additionalMetadataProps")
      slot(name="additionalMetadata")

  template(#slot6)
    AdditionalNavigation
      slot(name="additionalNavigation")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { PaginationProps } from '@/components/Pagination/utils';
import type { BreadcrumbsProps } from '@/components/Breadcrumbs/utils';
import type { MenuActionDescriptor } from '@/utilities/interface';
import type { MenuGroupDescriptor } from '@/components/ActionMenu/components/MenuGroup/utils';
import { UseMediaQuery } from '@/utilities/media-query';
import { hasSlot } from '@/utilities/has-slot';
import type { PrimaryActionType } from '../../utils';
import { HeaderWrapper } from './';
import {
  ActionMenu,
  AdditionalMetadata,
  AdditionalNavigation,
  Breadcrumb,
  PageTitle,
  PrimaryAction,
  Pagination,
} from './children';

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
  primaryAction?: PrimaryActionType;
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

const SHORT_TITLE = 20;
const REALLY_SHORT_TITLE = 8;

const breadcrumbProps = computed((): { breadcrumbs: BreadcrumbsProps['breadcrumbs'] } => {
  return { breadcrumbs: props.breadcrumbs || [] };
});

const pageTitleProps = computed(() => {
  return { title: props.title, subtitle: props.subtitle, compactTitle: props.compactTitle };
});

const actionMenuProps = computed(() => {
  return {
    title: props.title,
    secondaryActions: props.secondaryActions,
    actionGroups: props.actionGroups,
  };
});

const primaryActionProps = computed<PrimaryActionType>(() => {
  return { ...props.primaryAction };
});

const additionalMetadataProps = computed(() => {
  return { additionalMetadata: props.additionalMetadata };
});

const conditionMobileCompact = computed(() => {
  return isNavigationCollapsed
    && (!props.breadcrumbs || !props.breadcrumbs.length)
    && props.title
    && props.title.length <= REALLY_SHORT_TITLE
});

const conditionDesktopCompact = computed(() => {
  return !isNavigationCollapsed
    && !props.pagination
    && !props.secondaryActions
    && !slots.secondaryActions
    && props.title != null && props.title.length <= SHORT_TITLE
});

const conditionSlot4 = computed(() => {
  return ((isNavigationCollapsed || conditionDesktopCompact.value) && primaryActionProps.value)
    || (!isNavigationCollapsed && !conditionDesktopCompact.value && props.pagination);
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Page/components/Header/Header.scss';
</style>
