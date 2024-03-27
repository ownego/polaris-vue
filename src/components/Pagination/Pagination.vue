<template lang="pug">
nav(
  ref="node",
  v-if="type === 'table'",
  :aria-label="navLabel",
  :class="classNames(styles.Pagination, styles.table)",
)
  KeypressListener(
    v-if="prevKeyCondition",
    v-for="key in previousKeys",
    :key="key",
    :keyCode="key",
    :handler="prevKeypressHandler",
  )
  KeypressListener(
    v-if="nextKeyCondition"
    v-for="key in nextKeys",
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
    InlineStack(blockAlign="center", align="center")
      div(
        :class="styles.TablePaginationActions",
        data-buttongroup-variant="segmented",
      )
        div
          //- constructedPrevious
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
              @click="emits('previous')",
            )
          Button(
            v-else,
            id="previousURL",
            :icon="ChevronLeftIcon",
            :accessibilityLabel="previousLabel",
            :url="previousURL",
            :disabled="!hasPrevious",
            @click="emits('previous')",
          )

        //- labelMarkup
        Box(
          v-if="hasSlot(slots.default)",
          padding="300",
          paddingBlockStart="0",
          paddingBlockEnd="0",
        )
          Text(
            as="span",
            variant="bodySm",
            fontWeight="medium",
          )
            slot

        //- constructedNext
        div
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
              @click="emits('next')",
            )
          Button(
            v-else,
            id="nextURL",
            :icon="ChevronRightIcon",
            :accessibilityLabel="nextLabel",
            :url="nextURL",
            :disabled="!hasNext",
            @click="emits('next')",
          )
nav(
  v-else,
  ref="node",
  :aria-label="navLabel",
  :class="styles.Pagination",
)
  KeypressListener(
    v-if="prevKeyCondition",
    v-for="key in previousKeys",
    :key="key",
    :keyCode="key",
    :handler="prevKeypressHandler",
  )
  KeypressListener(
    v-if="nextKeyCondition"
    v-for="key in nextKeys",
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
        @click="emits('previous')",
      )
    Button(
      v-else,
      id="previousURL",
      :icon="ChevronLeftIcon",
      :accessibilityLabel="previousLabel",
      :url="previousURL",
      :disabled="!hasPrevious",
      @click="emits('previous')",
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
        @click="emits('next')",
      )
    Button(
      v-else,
      id="nextURL",
      :icon="ChevronRightIcon",
      :accessibilityLabel="nextLabel",
      :url="nextURL",
      :disabled="!hasNext",
      @click="emits('next')",
    )
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import useI18n from '@/use/useI18n';
import ChevronLeftIcon from '@icons/ChevronLeftIcon.svg';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';
import { isInputFocused } from '@polaris/utilities/is-input-focused';
import styles from '@polaris/components/Pagination/Pagination.module.css';
import type { PaginationProps, PaginationEvents, PaginationSlots } from './types';

const props = withDefaults(defineProps<PaginationProps>(), {
  type: 'page',
});

const slots = defineSlots<PaginationSlots>();
const emits = defineEmits<PaginationEvents>();

const i18n = useI18n();
const currentInstance = getCurrentInstance();
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

const prevKeyCondition = computed(() =>
  props.previousKeys && (props.previousURL || currentInstance?.vnode.props?.onPrevious) && props.hasPrevious,
);

const nextKeyCondition = computed(() =>
  props.nextKeys && (props.nextURL || currentInstance?.vnode.props?.onNext) && props.hasNext
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
  }
};

const handleCallback = (fn: () => void) => {
  return () => {
    if (isInputFocused()) {
      return;
    }

    fn();
  };
}

const prevKeypressHandler = () => {
  if (props.previousURL) {
    handleCallback(clickPaginationLink('previousURL'));
  } else {
    const preEmit = currentInstance?.vnode.props?.onPrevious as any;
    handleCallback(preEmit());
  }
}

const nextKeypressHandler = () => {
  if (props.nextURL) {
    handleCallback(clickPaginationLink('nextURL'));
  } else {
    const nextEmit = currentInstance?.vnode.props?.onNext as any;
    handleCallback(nextEmit());
  }
}
</script>
