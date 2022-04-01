<template lang="pug">
div(:class="pageClassName")
  Header(v-if="hasHeaderContent", v-bind="headerProps")
    template(#pageTitle, v-if="hasSlot(slots.pageTitle)")
      slot(name="pageTitle")
    template(#secondaryActions, v-if="slots.secondaryActions")
      slot(name="secondaryActions")
    template(#primaryAction, v-if="slots.primaryAction")
      slot(name="primaryAction")
    template(#additionalMetadata, v-if="slots.additionalMetadata")
      slot(name="additionalMetadata")
    template(#additionalNavigation, v-if="slots.additionalNavigation")
      slot(name="additionalNavigation")
    template(#pagination, v-if="hasSlot(slots.pagination)")
      slot(name="pagination")
  div(:class="contentClassName")
    slot
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Page.json';
import type { PaginationProps } from '@/components/Pagination/utils';
import type { BreadcrumbsProps } from '@/components/Breadcrumbs/utils';
import { hasSlot } from '@/utilities/has-slot';
import type { MenuActionDescriptor } from '@/utilities/interface';
import type { MenuGroupDescriptor } from '@/components/ActionMenu/components/MenuGroup/utils';
import type { PrimaryActionType } from './utils';

import { Header } from './components';

interface PageProps {
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
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Displays a divider between the page header and the page content */
  divider?: boolean;
}

const props = defineProps<PageProps>();

const slots = useSlots();

const hasHeaderContent = computed(() => {
  return props.title
    || (props.primaryAction || slots.primaryAction)
    || (
      (props.secondaryActions || slots.secondaryActions)
      && (
        ((props.secondaryActions && !slots.secondaryActions) && props.secondaryActions.length > 0)
        || (slots.secondaryActions && (!props.secondaryActions && !slots.secondaryActions.length))
      )
    )
    || ((props.actionGroups && props.actionGroups.length > 0) || slots.actionGroups)
    || ((props.breadcrumbs && props.breadcrumbs.length > 0) || slots.breadcrumbs);
});

const headerProps = computed(() => {
  const { fullWidth, narrowWidth, divider, ...rest } = props;
  return { ...rest };
});

const pageClassName = computed(() => {
  return classNames(
    styles.Page,
    props.fullWidth && styles.fullWidth,
    props.narrowWidth && styles.narrowWidth,
  );
});

const contentClassName = computed(() => {
  return classNames(
    !hasHeaderContent.value && styles.Content,
    props.divider && hasHeaderContent && styles.divider,
  );
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/Page/Page.scss';
</style>
