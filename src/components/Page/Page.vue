<template lang="pug">
div(:class="pageClassName")
  Header(
    v-if="hasHeaderContent",
    v-bind="headerProps",
  )
    template(#pageTitle, v-if="hasSlot(slots.pageTitle)")
      slot(name="pageTitle")
    template(#secondaryActions, v-if="slots.secondaryActions")
      slot(name="secondaryActions")
    template(#primaryAction, v-if="slots.primaryAction")
      slot(name="primaryAction")
    template(#additionalMetadata, v-if="slots.additionalMetadata")
      slot(name="additionalMetadata")
    template(#pagination, v-if="hasSlot(slots.pagination)")
      slot(name="pagination")
  div(:class="contentClassName")
    slot
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Page/Page.module.scss';
import type { HeaderProps } from './components/Header/Header.vue';
import { Header } from './components';
import { useHasSlot } from '@/use/useHasSlot';

export interface PageProps extends HeaderProps {
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
}

const props = defineProps<PageProps>();

const slots = useSlots();
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
    || (props.primaryAction || slots.primaryAction)
    || (props.secondaryActions || slots.secondaryActions)
      && (
        ((props.secondaryActions && !slots.secondaryActions && props.secondaryActions.length > 0)
        || (slots.secondaryActions && !props.secondaryActions && !slots.secondaryActions.length))
      )
    || ((props.actionGroups && props.actionGroups.length > 0) || slots.actionGroups)
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
