<template lang="pug">
nav(
  ref="node",
  v-if="type === 'table'",
  :aria-label="navLabel",
  :class="classNames(styles.Pagination, styles.table)",
)
  KeypressListener(
    v-if="preKeyCondition",
    v-for="key in previousKeys",
    :key="key",
    :keyCode="key",
    :handler="preKeypressHandler",
  )
  KeypressListener(
    v-if="nextKeyCondition"
    v-for="key in previousKeys",
    :key="key",
    :keyCode="key",
    :handler="nextKeypressHandler",
  )
  Box(
    background="bg-surface-secondary",
    :paddingBlockStart="150",
    :paddingBlockEnd="150",
    :paddingInlineStart="300",
    :paddingInlineEnd="200",
  )
    InlineStack(
      blockAlign="center",
      :align="hasSlot(slots.default) ? 'space-between' : 'end'",
    )
      Text(
        v-if="hasSlot(slots.default)",
        as="span",
        variant="bodySm",
        fontWeight="medium",
      )
        slot
      ButtonGroup(variant="segmented")
        Tooltip(
          v-if="previousTooltip && hasPrevious",
          activatorWrapper="span",
          preferredPosition="below",
          :content="previousTooltip",
        )
          Button(
            id="previousURL",
            :icon="ChevronLeftIcon",
            :accessibilityLabel="previousLabel",
            :url="previousURL",
            :disabled="!hasPrevious",
            @click="attrs['onPrevious']",
          )
        Button(
          v-else,
          id="previousURL",
          :icon="ChevronLeftIcon",
          :accessibilityLabel="previousLabel",
          :url="previousURL",
          :disabled="!hasPrevious",
          @click="attrs['onPrevious']",
        )
        Tooltip(
          v-if="nextTooltip && hasNext",
          activatorWrapper="span",
          preferredPosition="below",
          :content="nextTooltip",
        )
          Button(
            id="nextURL",
            :icon="ChevronRightIcon",
            :accessibilityLabel="nextLabel",
            :url="nextURL",
            :disabled="!hasNext",
            @click="attrs['onNext']",
          )    
        Button(
          v-else,
          id="nextURL",
          :icon="ChevronRightIcon",
          :accessibilityLabel="nextLabel",
          :url="nextURL",
          :disabled="!hasNext",
          @click="attrs['onNext']",
        )
nav(
  v-else,
  ref="node",
  :aria-label="navLabel",
  :class="styles.Pagination",
)
  KeypressListener(
    v-if="preKeyCondition",
    v-for="key in previousKeys",
    :key="key",
    :keyCode="key",
    :handler="preKeypressHandler",
  )
  KeypressListener(
    v-if="nextKeyCondition"
    v-for="key in previousKeys",
    :key="key",
    :keyCode="key",
    :handler="nextKeypressHandler",
  )
  ButtonGroup(variant="segmented")
    Tooltip(
      v-if="previousTooltip && hasPrevious",
      activatorWrapper="span",
      preferredPosition="below",
      :content="previousTooltip",
    )
      Button(
        id="previousURL",
        :icon="ChevronLeftIcon",
        :accessibilityLabel="previousLabel",
        :url="previousURL",
        :disabled="!hasPrevious",
        @click="attrs['onPrevious']",
      )
    Button(
      v-else,
      id="previousURL",
      :icon="ChevronLeftIcon",
      :accessibilityLabel="previousLabel",
      :url="previousURL",
      :disabled="!hasPrevious",
      @click="attrs['onPrevious']",
    )
    Box(
      v-if="hasSlot(slots.default)"
      :padding="300",
      :paddingBlockStart="0",
      :paddingBlockEnd="0",
    )
      div(aria-live="polite")
        span(v-if="hasNext && hasPrevious")
          slot
        Text(
          v-else,
          tone="subdued",
          as="span",
        )
          slot
    Tooltip(
      v-if="nextTooltip && hasNext",
      activatorWrapper="span",
      preferredPosition="below",
      :content="nextTooltip",
    )
      Button(
        id="nextURL",
        :icon="ChevronRightIcon",
        :accessibilityLabel="nextLabel",
        :url="nextURL",
        :disabled="!hasNext",
        @click="attrs['onNext']",
      )    
    Button(
      v-else,
      id="nextURL",
      :icon="ChevronRightIcon",
      :accessibilityLabel="nextLabel",
      :url="nextURL",
      :disabled="!hasNext",
      @click="attrs['onNext']",
    )
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue';
import type { VueNode, Key } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import { isInputFocused } from '@/utilities/is-input-focused';
import { useHasSlot } from '@/use/useHasSlot';
import useI18n from '@/use/useI18n';
import ChevronLeftIcon from '@icons/ChevronLeftIcon.svg';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';
import styles from '@polaris/components/Pagination/Pagination.module.scss';

interface AccessibilityLabels {
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
  type?: 'page' | 'table';
}

export type PaginationEmits = {
  /** Callback when next button is clicked */
  'next'?: [];
  /** Callback when previous button is clicked */
  'previous'?: [];
}

const slots = defineSlots<{
  /** Text to provide more context in between the arrow buttons */
  default: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<PaginationProps>(), {
  type: 'page',
});

const i18n = useI18n();
const attrs = useAttrs();
const { hasSlot } = useHasSlot();

const node = ref<HTMLDivElement | null>(null);

const navLabel = computed(() =>
  props.accessibilityLabel || i18n.translate('Polaris.Pagination.pagination'),
);

const previousLabel = computed(() =>
  props.accessibilityLabels?.previous || i18n.translate('Polaris.Pagination.previous'),
);

const nextLabel = computed(() =>
    props.accessibilityLabels?.next || i18n.translate('Polaris.Pagination.next'),
);

const preKeyCondition = computed(() =>
  props.previousKeys && (props.previousURL || attrs['onPrevious']) && props.hasPrevious,
);

const nextKeyCondition = computed(() => 
  props.nextKeys && (props.nextURL || attrs['onNext']) && props.hasNext
);

const clickPaginationLink = (id: string) => {
  return () => {
    if (node.value == null) {
      return;
    }

    const link: HTMLAnchorElement | null = node.value.querySelector(`#${id}`);
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

const preKeypressHandler = () => {
  if (props.previousURL) {
    handleCallback(clickPaginationLink('previousURL'));
  } else {
    const preEmit = attrs['onPrevious'] as any;
    handleCallback(preEmit());
  }
}

const nextKeypressHandler = () => {
  if (props.nextURL) {
    handleCallback(clickPaginationLink('nextURL'));
  } else {
    const nextEmit = attrs['onNext'] as any;
    handleCallback(nextEmit());
  }
}
</script>
