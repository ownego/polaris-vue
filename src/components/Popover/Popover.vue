<template lang="pug">
component(
  :is="activatorWrapper",
  ref="activatorContainer",
)
  slot(name="activator")
  Portal(
    v-if="activatorNode",
    id-prefix="popover",
  )
    PopoverOverlay(
      ref="overlayRef"
      :id="String(id)"
      :activator="activatorNode"
      :preferInputActivator="preferInputActivator"
      :active="active"
      :fixed="fixed"
      :zIndexOverride="zIndexOverride"
      @close="handleClose"
    )
      slot
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { findFirstFocusableNodeIncludingDisabled, focusNextFocusableNode } from '@/utilities/focus';
import {
  Portal,
  PopoverOverlay,
  Pane,
  Section,
} from '@/components';
import { portal } from '@polaris/components/shared';
import { setActivatorAttributes } from './set-activator-attributes';
import type { PopoverOverlayProps, PopoverAutofocusTarget } from '@/components/Popover/components/PopoverOverlay/PopoverOverlay.vue';
import { PopoverCloseSource } from '@/components/Popover/components/PopoverOverlay/PopoverOverlay.vue';
import useId from '@/use/useId';

interface PopoverProps {
   /** The preferred direction to open the popover */
  preferredPosition?: PopoverOverlayProps['preferredPosition'];
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PopoverOverlayProps['preferredAlignment'];
  /** Show or hide the Popover */
  active: boolean;
  // /** The element to activate the Popover.
  //  * If using a button, use the default or tertiary variant
  //  * which will show an active state when popover is active
  //  */
  // activator: React.ReactElement;
  /**
   * Use the activator's input element to calculate the Popover position
   * @default true
   */
  preferInputActivator?: PopoverOverlayProps['preferInputActivator'];
  /**
   * The element type to wrap the activator with
   * @default 'div'
   */
  activatorWrapper?: string;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Prevents focusing the activator or the next focusable element when the popover is deactivated */
  preventFocusOnClose?: boolean;
  /** Automatically add wrap content in a section */
  sectioned?: boolean;
  /** Allow popover to stretch to the full width of its activator */
  fullWidth?: boolean;
  /** Allow popover to stretch to fit content vertically */
  fullHeight?: boolean;
  /** Allow popover content to determine the overlay width and height */
  fluidContent?: boolean;
  /** Remains in a fixed position */
  fixed?: boolean;
  /** Used to illustrate the type of popover element */
  ariaHaspopup?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
  /** Allow the popover overlay to be hidden when printing */
  hideOnPrint?: boolean;
  /**
   * The preferred auto focus target defaulting to the popover container
   * @default 'container'
   */
  autofocusTarget?: PopoverAutofocusTarget;
  /** Prevents closing the popover when other overlays are clicked */
  preventCloseOnChildOverlayClick?: boolean;
  /**
   * Prevents page scrolling when the end of the scrollable Popover overlay content is reached - applied to Pane subcomponent
   * @default false
   */
  captureOverscroll?: boolean;
}

const props = withDefaults(defineProps<PopoverProps>(), {
  activatorWrapper: 'div',
  preferInputActivator: true,
});

const emits = defineEmits<{
  /** Callback when popover is closed */
  'close': [event: PopoverCloseSource];
}>();

const id = useId();

const activatorNode = ref<HTMLElement | null>(null);
const activatorContainer = ref<HTMLElement | null>(null);
const overlayRef = ref<InstanceType<typeof PopoverOverlay> | HTMLElement | null>(null);

const isInPortal = (element: Element) => {
  let { parentElement } = element;

  while (parentElement) {
    if (parentElement.matches(portal.selector)) {return false;}
    parentElement = parentElement.parentElement;
  }

  return true;
};

const handleClose = (source: PopoverCloseSource) => {
  emits('close', source);

  if (activatorContainer.value == null || props.preventFocusOnClose) {
    return;
  }

  if (source === PopoverCloseSource.FocusOut && activatorNode.value) {
    const focusableActivator =
      findFirstFocusableNodeIncludingDisabled(activatorNode.value) ||
      findFirstFocusableNodeIncludingDisabled(activatorContainer.value) ||
      activatorContainer.value;
    if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
      focusableActivator.focus();
    }
  } else if (
    source === PopoverCloseSource.EscapeKeypress &&
    activatorNode.value
  ) {
    const focusableActivator =
      findFirstFocusableNodeIncludingDisabled(activatorNode.value) ||
      findFirstFocusableNodeIncludingDisabled(activatorContainer.value) ||
      activatorContainer.value;

    if (focusableActivator) {
      focusableActivator.focus();
    } else {
      focusNextFocusableNode(focusableActivator, isInPortal);
    }
  }
};

const setAccessibilityAttributes = () => {
  if (activatorContainer.value == null) {
    return;
  }

  const firstFocusable = findFirstFocusableNodeIncludingDisabled(
    activatorContainer.value,
  );
  const focusableActivator: HTMLElement & {
    disabled?: boolean;
  } = firstFocusable || activatorContainer.value;

  const activatorDisabled =
    'disabled' in focusableActivator &&
    Boolean(focusableActivator.disabled);

  setActivatorAttributes(focusableActivator, {
    id: String(id),
    active: props.active,
    ariaHaspopup: props.ariaHaspopup,
    activatorDisabled,
  });
}
function forceUpdatePosition() {
  (overlayRef.value as InstanceType<typeof PopoverOverlay>).forceUpdatePosition();
}

onMounted(() => {
  if (!activatorNode.value && activatorContainer.value) {
    activatorNode.value = activatorContainer.value.firstElementChild as HTMLElement;
  } else if (
    activatorNode &&
    activatorContainer.value &&
    !activatorContainer.value.contains(activatorNode.value)
  ) {
    activatorNode.value = activatorContainer.value.firstElementChild as HTMLElement;
  }

  if (activatorNode.value && activatorContainer.value) {
    activatorNode.value = activatorContainer.value.firstElementChild as HTMLElement;
  }

  setAccessibilityAttributes();
});

defineExpose({
  forceUpdatePosition,
});
</script>
