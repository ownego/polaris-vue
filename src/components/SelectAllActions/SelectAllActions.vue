<template lang="pug">
transition(
  v-if="selectMode",
  name="markup",
  @before-enter="onTransitionEnter",
  @enter="onTransitionEntered",
  @before-leave="onTransitionExiting"
  @leave="onTransitionExit",
)
  div(:class="wrapperClassName")
    CheckableButton(
      v-bind="props",
      :aria-live="ariaLive",
      :label=" hasTextAndAction ? paginatedSelectAllText : label",
      @toggle-all="emits('toggle-all')",
    )
    div(v-if="paginatedSelectAllAction", :class="styles.PaginatedSelectAll")
      UnstyledButton(
        :class="styles.AllAction",
        size="slim",
        :disabled="disabled",
        @click="handleClick",
    )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { UnstyledButton, CheckableButton } from '@/components';
import type { Action } from '@/utilities/types';
import styles from '@polaris/components/SelectAllActions/SelectAllActions.module.scss';

type AriaLive = 'off' | 'polite' | undefined;

export interface SelectAllActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Label for the bulk actions */
  label?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Disables bulk actions */
  disabled?: boolean;
}

const wrapperStatus = {
  entering: 'SelectAllActions-entering',
  entered: 'SelectAllActions-entered',
  exiting: 'SelectAllActions-exiting',
  exited: 'SelectAllActions-exited',
};

const props = defineProps<SelectAllActionsProps>();
const emits = defineEmits<{
  /** Callback when the select all checkbox is clicked */
  'toggle-all': [];
}>();

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
