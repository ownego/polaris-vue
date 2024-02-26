<template lang="pug">
transition(
  v-if="selectMode",
  name="markup",
  @before-enter="onTransitionEnter",
  @enter="onTransitionEntered",
  @before-leave="onTransitionExiting"
  @leave="onTransitionExit",
)
  div(:class="wrapperClassName" ref="nodeRef")
    Box(
      background="bg-surface-secondary",
      borderBlockStartWidth="025",
      borderColor="border",
      width="100%",
      paddingBlockStart="300",
      paddingBlockEnd="300",
      paddingInlineStart="300",
      paddingInlineEnd="400",
    )
      InlineStack(gap="200", align="start", block-align="center")
        CheckableButton(
          v-if="accessibilityLabel && currentInstance?.vnode.props?.onToggleAll",
          v-bind="props",
          v-model="selectedValue",
          :aria-live="ariaLive",
          :label=" hasTextAndAction ? paginatedSelectAllText : label",
          @toggle-all="emits('toggle-all')",
        )
        Text(
          as="span",
          variant="bodySm",
          font-weight="medium",
        ) {{ hasTextAndAction ? paginatedSelectAllText : label}}
        div(v-if="paginatedSelectAllAction", :class="styles.PaginatedSelectAll")
          UnstyledButton(
            :class="styles.AllAction",
            size="slim",
            :disabled="disabled",
            @click="handleClick",
        )
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance } from 'vue';
import { classNames } from '@/utilities/css';
import {
  UnstyledButton,
  CheckableButton,
  Box,
  Text,
  InlineStack,
} from '@/components';
import type { Action } from '@/utilities/types';
import styles from '@polaris/components/SelectAllActions/SelectAllActions.module.scss';

type AriaLive = 'off' | 'polite' | undefined;

export interface SelectAllActionsProps {
  /** Label for the bulk actions */
  label?: string;
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Disables bulk actions */
  disabled?: boolean;
  /** If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** Whether there is a Pagination element on the associated table. Disables the vertical appear animation if so */
  hasPagination?: boolean;
  /** @deprecated Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** @deprecated State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
}

const wrapperStatus = {
  entering: 'SelectAllActions-entering',
  entered: 'SelectAllActions-entered',
  exiting: 'SelectAllActions-exiting',
  exited: 'SelectAllActions-exited',
};

const props = defineProps<SelectAllActionsProps>();
const emits = defineEmits<{
   /** @deprecated Callback when the select all checkbox is clicked */
  'toggle-all': [];
}>();
const model = defineModel<boolean | string>();

const currentInstance = getCurrentInstance();

const nodeRef = ref<HTMLElement | null>(null);

const isIndeterminate = computed(() => props.selected === 'indeterminate');

const selectedValue = computed(() => Boolean(!isIndeterminate.value && model.value));

const hasTextAndAction = computed(() => props.paginatedSelectAllText && props.paginatedSelectAllAction);
const ariaLive = computed<AriaLive>(() => (hasTextAndAction.value ? 'polite' : undefined));
const wrapperClassName = computed(() => classNames(
  styles.SelectAllActions,
));

const onTransitionEnter = (el: Element) => {
  el.classList.add(wrapperStatus.entering);
};

const onTransitionEntered = (el: Element) => {
  el.classList.remove(wrapperStatus.entering);
  el.classList.add(wrapperStatus.entered);
};

const onTransitionExiting = (el: Element) => {
  el.classList.remove(wrapperStatus.entered);
  el.classList.add(wrapperStatus.exiting);
};

const onTransitionExit = (el: Element) => {
  el.classList.remove(wrapperStatus.exiting);
  el.classList.add(wrapperStatus.exited);
};

const handleClick = () => {
  if (props.paginatedSelectAllAction?.onAction){
    props.paginatedSelectAllAction.onAction();
  }
}
</script>
