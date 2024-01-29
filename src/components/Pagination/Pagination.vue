<template lang="pug">
nav(
  ref="paginationRef",
  :aria-label="navLabel",
)
  template(v-if="prevKeyCondition")
    KeypressListener(
      v-for="(key) in previousKeys",
      :key="key",
      :key-code="key",
      :handler="callbackPrevUrl",
    )
  template(v-if="nextKeyCondition")
    KeypressListener(
      v-for="(key) in nextKeys",
      :key="key",
      :key-code="key",
      :handler="callbackNextUrl",
    )

  ButtonGroup(:segmented="!hasSlot(slots.default)")
    Tooltip(
      v-if="previousTooltip && hasPrevious",
      activator-wrapper="span",
      :content="previousTooltip",
    )
      Button(
        id="previousURL",
        outline,
        :icon="ChevronLeftIcon",
        :accessibilityLabel="previousLabel",
        :url="previousURL",
        :disabled="!hasPrevious",
        @click="$emit('previous')",
      )
    Button(
      v-else,
      id="previousURL",
      outline,
      :icon="ChevronLeftIcon",
      :accessibilityLabel="previousLabel",
      :url="previousURL",
      :disabled="!hasPrevious",
      @click="$emit('previous')",
    )
    div(
      v-if="hasSlot(slots.default)",
      aria-live="polite",
    )
      Text(v-if="hasNext && hasPrevious", variant="bodyMd", as="span")
        slot
      Text(v-else, variant="bodyMd", color="subdued", as="span")
        slot
    Tooltip(
      v-if="nextTooltip && hasNext",
      activator-wrapper="span",
      :content="nextTooltip",
    )
      Button(
        id="nextURL",
        outline,
        :icon="ChevronRightIcon",
        :accessibilityLabel="nextLabel",
        :url="nextURL",
        @click="$emit('next')",
        :disabled="!hasNext",
      )
    Button(
      v-else,
      id="nextURL",
      outline,
      :icon="ChevronRightIcon",
      :accessibilityLabel="nextLabel",
      :url="nextURL",
      @click="$emit('next')",
      :disabled="!hasNext",
    )
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { useHasSlot } from '@/use/useHasSlot';
import {
  Button,
  ButtonGroup,
  Text,
  Tooltip,
  Box,
  InlineStack,
  KeypressListener,
} from '@/components';
import type { Key } from '@/utilities/types';
import { isInputFocused } from '@polaris/utilities/is-input-focused';
import styles from '@polaris/components/Pagination/Pagination.module.scss';
import ChevronLeftIcon from '@icons/ChevronLeftIcon.svg';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';


type AccessibilityLabels = {
  previous: string;
  next: string;
}

interface PaginationProps {
  /** Keyboard shortcuts for the next button */
  nextKeys?: Key[];
  /** Keyboard shortcuts for the previous button */
  previousKeys?: Key[];
  /** Tooltip for the next button */
  nextTooltip?: string;
  /** Tooltip for the previous button */
  previousTooltip?: string;
  /** The URL of the next page */
  nextURL?: string;
  /** The URL of the previous page */
  previousURL?: string;
  /** Whether there is a next page to show */
  hasNext?: boolean;
  /** Whether there is a previous page to show */
  hasPrevious?: boolean;
  /** Accessible label for the pagination */
  accessibilityLabel?: string;
  /** Accessible labels for the buttons and UnstyledLinks */
  accessibilityLabels?: AccessibilityLabels;
  /** Layout structure of the component */
  type?: 'page' | 'table';
}

const props = withDefaults(defineProps<PaginationProps>(), {
  type: 'page',
});

const i18n = use18n();
const { hasSlot } = useHasSlot();
const attrs = useAttrs();

const paginationRef = ref<HTMLElement | null>(null);

const prevKeyCondition = computed(() => {
  return props.previousKeys && (props.previousURL || attrs['onPrevious']) && props.hasPrevious;
});
const nextKeyCondition = computed(() => {
  return props.nextKeys && (props.nextURL || attrs['onNext']) && props.hasNext;
});
const navLabel = computed(() => props.accessibilityLabel || i18n.translate('Polaris.Pagination.pagination'));
const previousLabel = computed(() => {
  return props.accessibilityLabels?.previous
    || i18n.translate('Polaris.Pagination.previous');
});
const nextLabel = computed(() => {
  return props.accessibilityLabels?.next
    || i18n.translate('Polaris.Pagination.next');
});

const clickPaginationLink = (id: string) => {
  return () => {
    if (!paginationRef.value) {
      return;
    }

    const link: HTMLAnchorElement | null = paginationRef.value.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}

const handleCallback = (fn: () => void) => {
  return () => {
    if (isInputFocused()) {
      return;
    }

    fn();
  };
}
</script>
