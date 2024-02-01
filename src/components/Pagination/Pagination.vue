<template lang="pug">
nav(
  v-if="type==='page'",
  ref="paginationRef",
  :aria-label="navLabel",
  :class="styles.Pagination"
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

  ButtonGroup(variant="segmented")
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
        @click="emits('previous')",
      )
    Button(
      v-else,
      id="previousURL",
      outline,
      :icon="ChevronLeftIcon",
      :accessibilityLabel="previousLabel",
      :url="previousURL",
      :disabled="!hasPrevious",
      @click="emits('previous')",
    )
    Box(
      v-if="hasSlot(slots.default)"
      padding="300",
      padding-block-start="0",
      padding-block-end="0",
    )
      div(aria-live="polite")
        span(v-if="hasNext && hasPrevious")
          slot
        Text(
          v-else,
          as="span",
          tone="subdued",
        )
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
        @click="emits('next')",
        :disabled="!hasNext",
      )
    Button(
      v-else,
      id="nextURL",
      outline,
      :icon="ChevronRightIcon",
      :accessibilityLabel="nextLabel",
      :url="nextURL",
      @click="emits('next')",
      :disabled="!hasNext",
    )
nav(
  v-else-if="type==='table'",
  ref="paginationRef",
  :aria-label="navLabel",
  :class="classNames(styles.Pagination, styles.table)",
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
  Box(
    background="bg-surface-secondary",
    padding-block-start="150",
    padding-block-end="150",
    padding-inline-start="300",
    padding-inline-end="200",
  )
    InlineStack(
      block-align="center",
      :align="hasSlot(slots.default) ? 'space-between' : 'end'",
    )
      Text(
        v-if="hasSlot(slots.default)",
        as="span",
        variant="bodySm",
        font-weight="medium",
      )
        slot
      ButtonGroup(variant="segmented")
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
            @click="emits('previous')",
          )
        Button(
          v-else,
          id="previousURL",
          outline,
          :icon="ChevronLeftIcon",
          :accessibilityLabel="previousLabel",
          :url="previousURL",
          :disabled="!hasPrevious",
          @click="emits('previous')",
        )
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
            @click="emits('next')",
            :disabled="!hasNext",
          )
        Button(
          v-else,
          id="nextURL",
          outline,
          :icon="ChevronRightIcon",
          :accessibilityLabel="nextLabel",
          :url="nextURL",
          @click="emits('next')",
          :disabled="!hasNext",
        )
</template>

<script setup lang="ts">
import { type VNode, computed, ref, getCurrentInstance } from 'vue';
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
import type { Key, VueNode } from '@/utilities/types';
import { isInputFocused } from '@polaris/utilities/is-input-focused';
import ChevronLeftIcon from '@icons/ChevronLeftIcon.svg';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';
import styles from '@polaris/components/Pagination/Pagination.module.scss';


type AccessibilityLabels = {
  previous: string;
  next: string;
}

export interface PaginationProps {
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
const slots = defineSlots<{
  /** Text to provide more context in between the arrow buttons */
  default?: (_?: VueNode) => VNode[];
}>();
const emits = defineEmits<{
  /** Callback when the next button is clicked */
  'next': [];
  /** Callback when the previous button is clicked */
  'previous': [];
}>();

const i18n = useI18n();
const { hasSlot } = useHasSlot();
const currentInstance = getCurrentInstance();

const paginationRef = ref<HTMLElement | null>(null);

const prevKeyCondition = computed(() => {
  return props.previousKeys && (props.previousURL || currentInstance?.vnode.props?.onPrevious) && props.hasPrevious;
});

const nextKeyCondition = computed(() => {
  return props.nextKeys && (props.nextURL || currentInstance?.vnode.props?.onNext) && props.hasNext;
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
};

const handleCallback = (fn: () => void) => {
  return () => {
    if (isInputFocused()) {
      return;
    }

    fn();
  };
};

const callbackPrevUrl = () => {
  if (props.previousURL) {
    handleCallback(clickPaginationLink('previousURL'));
    return;
  }

  const prevEmit = currentInstance?.vnode.props?.onPrevious as any;
  handleCallback(prevEmit());
};

const callbackNextUrl = () => {
  if (props.nextURL) {
    handleCallback(clickPaginationLink('nextURL'));
    return;
  }

  const nextEmit = currentInstance?.vnode.props?.onNext as any;
  handleCallback(nextEmit());
};
</script>
