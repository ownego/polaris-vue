<template lang="pug">
component(
  :is="activatorWrapper",
  ref="activatorContainer",
)
  slot(name="activator")
  Portal(
    v-if="activatorNode && isDisplayed",
    id-prefix="popover",
  )
    PopoverOverlay(
      ref="overlayRef",
      v-bind="props",
      :id="String(id)",
      :activator="activatorNode",
      :preferInputActivator="preferInputActivator",
      :active="active",
      :fixed="fixed",
      :z-index-override="zIndexOverride",
      @close="handleClose",
    )
      slot
</template>

<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';
import { findFirstFocusableNodeIncludingDisabled, focusNextFocusableNode } from '@/utilities/focus';
import { Portal, PopoverOverlay } from '@/components';
import { portal } from '@polaris/components/shared';
import { setActivatorAttributes } from './set-activator-attributes';
import { PopoverCloseSource } from './components/PopoverOverlay/types';
import useId from '@/use/useId';
import type { VueNode } from '@/utilities/types';
import type { PopoverProps } from './types';

const props = withDefaults(defineProps<PopoverProps>(), {
  activatorWrapper: 'div',
  preferInputActivator: true,
});

const emits = defineEmits<{
  /** Callback when popover is closed */
  'close': [event: PopoverCloseSource];
}>();

const slots = defineSlots<{
  /** The content to display inside the popover */
  default?: (_?: VueNode) => any;
  /** The content to display as the activator */
  activator?: (_?: VueNode) => any;
}>();

const id = useId();

const observer = ref<ResizeObserver | null>(null);
const isDisplayed = ref<boolean>(false);
const activatorNode = ref<HTMLElement | null>(null);
const activatorContainer = ref<HTMLElement | null>(null);
const overlayRef = ref<InstanceType<typeof PopoverOverlay> | HTMLElement | null>(null);

watch(
  () => props.active,
  () => {
    setAccessibilityAttributes();
  },
)

const forceUpdatePosition = () => {
  (overlayRef.value as InstanceType<typeof PopoverOverlay>).forceUpdatePosition();
}

const setAccessibilityAttributes = () => {
  if (activatorContainer.value == null) {
    return;
  }

  const firstFocusable = findFirstFocusableNodeIncludingDisabled(activatorContainer.value);
  const focusableActivator: HTMLElement & {
    disabled?: boolean;
  } = firstFocusable || activatorContainer.value;

  const activatorDisabled = 'disabled' in focusableActivator
    && Boolean(focusableActivator.disabled);

  setActivatorAttributes(focusableActivator, {
    id: String(id),
    active: props.active,
    ariaHaspopup: props.ariaHaspopup,
    activatorDisabled,
  });
}

const handleClose = (source: PopoverCloseSource) => {
  emits('close', source);

  if (activatorContainer.value == null || props.preventFocusOnClose) {
    return;
  }

  if (source === PopoverCloseSource.FocusOut && activatorNode.value) {
    const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode.value)
      || findFirstFocusableNodeIncludingDisabled(activatorContainer.value)
      || activatorContainer.value;

    if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
      focusableActivator.focus();
    }
  } else if (source === PopoverCloseSource.EscapeKeypress && activatorNode.value) {
    const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode.value)
      || findFirstFocusableNodeIncludingDisabled(activatorContainer.value)
      || activatorContainer.value;

    if (focusableActivator) {
      focusableActivator.focus();
    } else {
      focusNextFocusableNode(focusableActivator, isInPortal);
    }
  }
};

onMounted(() => {
  if (!activatorNode.value && activatorContainer.value) {
    activatorNode.value = activatorContainer.value.firstElementChild as HTMLElement;
  } else if (
    activatorNode.value
    && activatorContainer.value
    && !activatorContainer.value.contains(activatorNode.value)
  ) {
    activatorNode.value = activatorContainer.value.firstElementChild as HTMLElement;
  }

  if (activatorNode.value && activatorContainer.value) {
    activatorNode.value = activatorContainer.value.firstElementChild as HTMLElement;
  }

  if (!activatorNode.value) {
    return;
  }

  observer.value = new ResizeObserver(() => {
    setDisplayState();
  });

  observer.value.observe(activatorNode.value);

  setDisplayState();

  setAccessibilityAttributes();
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});

function isInPortal(element: Element) {
  let { parentElement } = element;

  while (parentElement) {
    if (parentElement.matches(portal.selector)) {return false;}
    parentElement = parentElement.parentElement;
  }

  return true;
};

function setDisplayState() {
  /**
   * This is a workaround to prevent rendering the Popover when the content is moved into
   * a React portal that hasn't been rendered. We don't want to render the Popover in this
   * case because the auto-focus logic will break. We wait until the activatorContainer is
   * displayed, which is when it has an offsetParent, or if the activatorContainer is the
   * body, if it has a clientWidth bigger than 0.
   * See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
   */
  isDisplayed.value = Boolean(
    activatorContainer.value
    && (activatorContainer.value.offsetParent !== null
      || (activatorContainer.value === activatorContainer.value.ownerDocument.body
        && activatorContainer.value.clientWidth > 0)),
  );
}

defineExpose({
  forceUpdatePosition,
  close: (target = 'activator') => {
    const source =
      target === 'activator'
        ? PopoverCloseSource.EscapeKeypress
        : PopoverCloseSource.FocusOut;

    handleClose(source);
  },
});
</script>
