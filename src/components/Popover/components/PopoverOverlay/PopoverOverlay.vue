<template lang="pug">
</template>

<script setup lang="ts">
import {
  useCssModule,
  ref,
  reactive,
  computed,
  onMounted,
  onUpdated,
  onBeforeUnmount,
} from 'vue';
import { themeDefault } from '@shopify/polaris-tokens';
import { overlay } from '@polaris/components/shared';
import { classNames } from '@/utilities/css';
import { findFirstKeyboardFocusableNode } from '@/utilities/focus';
import { isElementOfType, wrapWithComponent } from '@/utilities/component';

import {
  EventListener,
  KeyPressListener,
  PositionedOverlay,
} from '@/components';
import { Pane } from '../Pane';

import type{ Key } from '@/utilities/types';
import type { PortalsContainerElement } from '@polaris/utilities/portals';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/PositionedOverlay.vue';
import type { PaneProps } from '../Pane/Pane.vue';

export enum PopoverCloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export interface PopoverOverlayProps {
  fullWidth?: boolean;
  fullHeight?: boolean;
  fluidContent?: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  id: string;
  zIndexOverride?: number;
  activator: HTMLElement;
  preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
  sectioned?: boolean;
  fixed?: boolean;
  hideOnPrint?: boolean;
  autofocusTarget?: PopoverAutofocusTarget;
  preventCloseOnChildOverlayClick?: boolean;
  captureOverscroll?: boolean;
}

interface State {
  transitionStatus: TransitionStatus;
}

const styles = useCssModule();

const props = defineProps<PopoverOverlayProps>();

const state = reactive<State>({
  transitionStatus: props.active
    ? TransitionStatus.Entering
    : TransitionStatus.Exited,
});

const contentNode = ref<HTMLElement | null>(null);
const enteringTimer = ref<number | undefined>(undefined);
const overlayRef = ref<HTMLElement | null>(null);

const className = computed(() => {
    styles.PopoverOverlay,
    state.transitionStatus === TransitionStatus.Entering && styles['PopoverOverlay-entering'],
    state.transitionStatus === TransitionStatus.Entered && styles['PopoverOverlay-open'],
    state.transitionStatus === TransitionStatus.Exiting && styles['PopoverOverlay-exiting']
});

const changeTransitionStatus = (transitionStatus: TransitionStatus, callback?: () => void) => {
  state.transitionStatus = transitionStatus;

  callback && callback();

  contentNode.value && contentNode.value.getBoundingClientRect();
};

function clearTransitionTimeout() {
  if (enteringTimer.value) {
    window.clearTimeout(enteringTimer.value);
  }
}

function focusContent() {
  const { autofocusTarget = 'container' } = props;

  if (autofocusTarget === 'none' || contentNode.value === null) {
    return;
  }

  requestAnimationFrame(() => {
    if (contentNode.value === null) {
      return;
    }

    const focusableChild = findFirstKeyboardFocusableNode(contentNode.value);

    if (focusableChild && autofocusTarget === 'first-node') {
      focusableChild.focus({
        preventScroll: import.meta.env.MODE === 'development',
      });
    } else {
      contentNode.value.focus({
        preventScroll: import.meta.env.MODE === 'development',
      });
    }
  });
}

function renderPopover(overlayDetails) {
  const { measuring, desiredHeight, positioning } = overlayDetails;

  const {
    id,
    children,
    sectioned,
    fullWidth,
    fullHeight,
    fluidContent,
    hideOnPrint,
    autofocusTarget,
    captureOverscroll,
  } = props;

  
}
</script>

<style lang="scss" module>
@import '@polaris/components/Popover/Popover.scss';
</style>
