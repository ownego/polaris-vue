<template lang="pug">
PositionedOverlay(
  v-if="state.transitionStatus !== TransitionStatus.Exited && active",
  ref="overlayRef",
  :full-width="fullWidth",
  :active="active",
  :activator="activator",
  :prefer-input-activator="preferInputActivator",
  :preferred-position="preferredPosition",
  :preferred-alignment="preferredAlignment",
  :fixed="fixed",
  :class="positionOverlayClass",
  :z-index-override="zIndexOverride",
  @scroll-out="handleScrollOut",
)
  div(
    v-bind="overlay.props",
    :class="popoverOverlayClass",
  )
    EventListener(event="click", :handler="handleClick")
    EventListener(event="touchstart", :handler="handleClick")
    KeypressListener(:key-code="Key.Escape", :handler="handleEscape")
    div(
      tabindex="0",
      :class="styles.FocusTracker",
      @focus="handleFocusFirstItem",
    )
    div(:class="styles.ContentContainer")
      div(
        ref="contentNode",
        :id="id",
        :tabindex="autofocusTarget === 'none' ? undefined : -1",
        :class="contentClassNames",
        :style="contentStyles",
      )
        template(v-if="isChildContentWrappedByPane")
          slot
        template(v-else)
          Pane(
            :capture-overscroll="captureOverscroll",
            :sectioned="sectioned",
          )
            slot
    div(
      :class="styles.FocusTracker",
      tabindex="0",
      @focus="handleFocusLastItem",
    )
</template>

<script setup lang="ts">
import {
  type Ref,
  useSlots,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import styles from '@polaris/components/Popover/Popover.module.scss';
import { themeDefault } from '@shopify/polaris-tokens';
import { overlay } from '@polaris/components/shared';
import { classNames } from '@/utilities/css';
import usePortalsManager from '@/use/usePortalsManager';
import { findFirstKeyboardFocusableNode } from '@/utilities/focus';
import { isElementOfType } from '@/utilities/component';

import {
  EventListener,
  KeypressListener,
  PositionedOverlay,
} from '@/components';
import { Pane } from '../Pane';

import { Key } from '@/utilities/types';
import type { PopoverOverlayProps } from './types';
import { PopoverCloseSource } from './types';

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

interface State {
  transitionStatus: TransitionStatus;
}

type Emit = {
  close: [event: PopoverCloseSource];
}

const slots = useSlots();

const context = usePortalsManager();

const props = withDefaults(defineProps<PopoverOverlayProps>(), {
  preferredPosition: 'below',
  preferredAlignment: 'center',
  preferInputActivator: true,
});

const emits = defineEmits<Emit>();

const state = reactive<State>({
  transitionStatus: props.active
    ? TransitionStatus.Entering
    : TransitionStatus.Exited,
});

const contentNode = ref<HTMLDivElement | null>(null);
const enteringTimer = ref<number | undefined>(undefined);
const overlayRef = ref<InstanceType<typeof PositionedOverlay> | null>(null);

const overlayDetails = computed(() => (overlayRef.value as InstanceType<typeof PositionedOverlay>)?.overlayDetails);

const positionOverlayClass = computed(() => {
  return classNames(
    styles.PopoverOverlay,
    state.transitionStatus === TransitionStatus.Entering && styles['PopoverOverlay-entering'],
    state.transitionStatus === TransitionStatus.Entered && styles['PopoverOverlay-open'],
    state.transitionStatus === TransitionStatus.Exiting && styles['PopoverOverlay-exiting'],
  )
});

const popoverOverlayClass = computed(() => {
  return classNames(
    styles.Popover,
    overlayDetails.value?.positioning === 'above' && styles.positionedAbove,
    props.fullWidth && styles.fullWidth,
    overlayDetails.value?.measuring && styles.measuring,
    props.hideOnPrint && styles['PopoverOverlay-hideOnPrint'],
  );
});

const contentStyles = computed(() => {
  return overlayDetails.value?.measuring
    ? undefined
    : { height: `${overlayDetails.value?.desiredHeight}px` };
});

const contentClassNames = computed(() => {
  return classNames(
    styles.Content,
    props.fullHeight && styles['Content-fullHeight'],
    props.fluidContent && styles['Content-fluidContent'],
  );
});

const isChildContentWrappedByPane = computed(() => {
  const childContents: any = slots.default?.() || [];

  if (!childContents.length) {
    return false; 
  }

  const children = childContents[0].children && childContents[0].children.length
    ? childContents[0].children[0]
    : childContents[0];

  return isElementOfType(children, Pane);
});

watch(
  () => props.active,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      focusContent();
      changeTransitionStatus(TransitionStatus.Entering, () => {
        clearTransitionTimeout();

        enteringTimer.value = window.setTimeout(() => {
          state.transitionStatus = TransitionStatus.Entered;
          // Important: This will not update when the active theme changes.
          // Update this to `useTheme` once converted to a function component.
        }, parseInt(themeDefault.motion['motion-duration-100'], 10));
      })
    }

    if (!newVal && oldVal) {
      clearTransitionTimeout();

      state.transitionStatus = TransitionStatus.Exited;
    }
  }
);

onMounted(() => {
  if (props.active) {
    focusContent();

    changeTransitionStatus(TransitionStatus.Entered);
  }
});

onBeforeUnmount(() => {
  clearTransitionTimeout();
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

    // TODO: check if env variables is using correctly
    if (focusableChild && autofocusTarget === 'first-node') {
      focusableChild.focus({
        preventScroll: process.env.NODE_ENV === 'development',
      })!;
    } else {
      contentNode.value.focus({
        preventScroll: process.env.NODE_ENV === 'development',
      });
    }
  });
}

function handleClick(event: Event) {
  const target = event.target as HTMLElement;
  const { activator, preventCloseOnChildOverlayClick } = props;
  const composedPath = event.composedPath();
  const wasDescendant = preventCloseOnChildOverlayClick
    ? wasPolarisPortalDescendant(composedPath, context)
    : wasContentNodeDescendant(composedPath, contentNode);
  const isActivatorDescendant = nodeContainsDescendant(activator, target);

  if (
    wasDescendant
    || isActivatorDescendant
    || state.transitionStatus !== TransitionStatus.Entered
  ) {
    return;
  }

  emits('close', PopoverCloseSource.Click);
}

function handleScrollOut() {
  emits('close', PopoverCloseSource.ScrollOut);
}

function handleEscape(event: Event) {
  const target = event.target as HTMLElement;
  const { activator } = props;
  const composedPath = event.composedPath();
  const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
  const isActivatorDescendant = nodeContainsDescendant(activator, target);

  if (wasDescendant || isActivatorDescendant) {
    emits('close', PopoverCloseSource.EscapeKeypress);
  }
}

function handleFocusFirstItem() {
  emits('close', PopoverCloseSource.FocusOut);
}

function handleFocusLastItem() {
  emits('close', PopoverCloseSource.FocusOut);
}

function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) {
    return true;
  }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    
    parent = parent.parentNode;
  }

  return false;
}

function wasContentNodeDescendant(
  composedPath: readonly EventTarget[],
  contentNode: Ref<HTMLDivElement | null>,
) {
  return (contentNode.value != null && composedPath.includes(contentNode.value));
}

function wasPolarisPortalDescendant(
  composedPath: readonly EventTarget[],
  portalsContainerElement: Ref<HTMLElement | null>,
): boolean {
  return composedPath
    .some((eventTarget) => eventTarget instanceof Node && portalsContainerElement.value?.contains(eventTarget));
}

function forceUpdatePosition() {
  (overlayRef.value as InstanceType<typeof PositionedOverlay>).forceUpdatePosition();
}

defineExpose({ forceUpdatePosition });
</script>
