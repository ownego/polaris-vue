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
        :icon="ChevronLeftMinor",
        :accessibilityLabel="previousLabel",
        :url="previousURL",
        :disabled="!hasPrevious",
        @click="$emit('previous')",
      )
    Button(
      v-else,
      id="previousURL",
      outline,
      :icon="ChevronLeftMinor",
      :accessibilityLabel="previousLabel",
      :url="previousURL",
      :disabled="!hasPrevious",
      @click="$emit('previous')",
    )
    div(
      v-if="hasSlot(slots.default)",
      aria-live="polite",
    )
      TextStyle(v-if="hasNext && hasPrevious")
        slot
      TextStyle(v-else, variation="subdued")
        slot
    Tooltip(
      v-if="nextTooltip && hasNext",
      activator-wrapper="span",
      :content="nextTooltip",
    )
      Button(
        id="nextURL",
        outline,
        :icon="ChevronRightMinor",
        :accessibilityLabel="nextLabel",
        :url="nextURL",
        @click="$emit('next')",
        :disabled="!hasNext",
      )
    Button(
      v-else,
      id="nextURL",
      outline,
      :icon="ChevronRightMinor",
      :accessibilityLabel="nextLabel",
      :url="nextURL",
      @click="$emit('next')",
      :disabled="!hasNext",
    )
</template>

<script setup lang="ts">
import { computed, inject, ref, useAttrs, useSlots } from 'vue';
import { isInputFocused } from 'polaris-react/src/utilities/is-input-focused';
import ChevronLeftMinor from '@icons/ChevronLeftMinor.svg';
import ChevronRightMinor from '@icons/ChevronRightMinor.svg';
import { Button, ButtonGroup, KeypressListener, TextStyle, Tooltip } from '@/components';
import { hasSlot } from '@/utilities/has-slot';
import type { Key } from '../KeypressListener/utils';

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
}

const props = defineProps<PaginationProps>();

const lang = inject('lang') as Record<string, any>;

const paginationRef = ref<HTMLElement | null>(null);

const slots = useSlots();

const attrs = useAttrs();

const navLabel = props.accessibilityLabel || lang.Polaris.Pagination.pagination;
const previousLabel = (props.accessibilityLabels && props.accessibilityLabels.previous) || lang.Polaris.Pagination.previous;
const nextLabel = (props.accessibilityLabels && props.accessibilityLabels.next) || lang.Polaris.Pagination.next;

const prevKeyCondition = computed(() => {
  return props.previousKeys && (props.previousURL || attrs['onPrevious']) && props.hasPrevious;
});

const nextKeyCondition = computed(() => {
  return props.nextKeys && (props.nextURL || attrs['onNext']) && props.hasNext;
});

const callbackPrevUrl = () => {
  if (props.previousURL) {
    handleCallback(clickPaginationLink('previousURL'));
  }
  const prevEmit = attrs['onPrevious'] as any;
  handleCallback(prevEmit());
};

const callbackNextUrl = () => {
  if (props.nextURL) {
    handleCallback(clickPaginationLink('nextURL'));
  }
  const nextEmit = attrs['onNext'] as any;
  handleCallback(nextEmit());
};

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

