<template lang="pug">
div(:class="pageClassName")
  Header(
    v-if="hasHeaderContent",
    v-bind="headerProps",
  )
    template(#pageTitle, v-if="hasSlot(slots.pageTitle)")
      slot(name="pageTitle")
    template(#secondaryActions, v-if="hasSlot(slots.secondaryActions)")
      slot(name="secondaryActions")
    template(#primaryAction, v-if="hasSlot(slots.primaryAction)")
      slot(name="primaryAction")
    template(#additionalMetadata, v-if="hasSlot(slots.additionalMetadata)")
      slot(name="additionalMetadata")
    template(#pagination, v-if="hasSlot(slots.pagination)")
      slot(name="pagination")
  div(:class="contentClassName")
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Page/Page.module.scss';
import type { HeaderProps } from './components/Header/Header.vue';
import { Header } from './components';
import { useHasSlot } from '@/use/useHasSlot';
import type { VueNode } from '@/utilities/types';

export interface PageProps extends HeaderProps {
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
}

export interface PageSlots {
  /** The contents of the page */
  default: (_: VueNode) => any;
  /** Important and non-interactive status information shown immediately after the title. */
  pageTitle: (_: VueNode) => any;
  /** Collection of secondary page-level actions */
  secondaryActions: (_: VueNode) => any;
  /** Primary page-level action */
  primaryAction: (_: VueNode) => any;
  /** Additional meta data */
  additionalMetadata: (_: VueNode) => any;
  /** Label for page-level pagination */
  pagination: (_: VueNode) => any;
}

const props = defineProps<PageProps>();

const slots = defineSlots<PageSlots>();

const { hasSlot } = useHasSlot();

const pageClassName = computed(() =>
  classNames(
    styles.Page,
    props.fullWidth && styles.fullWidth,
    props.narrowWidth && styles.narrowWidth,
  ),
);

const hasHeaderContent = computed(() =>
  props.title
    || props.subtitle
    || (props.primaryAction || hasSlot(slots.primaryAction))
    || (props.secondaryActions || hasSlot(slots.secondaryActions))
      && (
        ((props.secondaryActions && !hasSlot(slots.secondaryActions) && props.secondaryActions.length > 0)
        || (hasSlot(slots.secondaryActions) && !props.secondaryActions && !slots.secondaryActions.length))
      )
    || props.backAction,
);

const contentClassName = computed(() =>
  classNames(!hasHeaderContent && styles.Content),
);

const headerProps = computed(() => {
  const { fullWidth, narrowWidth, ...rest } = props;
  return { ...rest };
});
</script>
