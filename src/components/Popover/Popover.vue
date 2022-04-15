<template lang="pug">
// TODO: Update lazy loaded docs
component(
  :is="activatorWrapper",
  ref="container"
)
  slot(name="activator")
  Portal(v-if="activator && active", idPrefix="popover")
    PopoverOverlay(
      :id="id",
      :activator="activator",
      :fullWidth="fullWidth",
      :active="active",
      :preferInputActivator="preferInputActivator",
      :fixed="fixed",
      :preferredPosition="preferredPosition",
      :preferredAlignment="preferredAlignment",
      :zIndexOverride="zIndexOverride",
      :autofocusTarget="autofocusTarget",
      :sectioned="sectioned",
      :colorScheme="colorScheme",
      @close="handleClose",
      @scrolled-to-bottom="emit('scrolled-to-bottom')",
    )
      template(#overlay="attrs")
        slot(name="content")
      template(#extra-content)
        slot(name="extra-content")
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { watch, ref, onMounted, useAttrs } from 'vue';
import { portal } from 'polaris/polaris-react/src/components/shared';
import { findFirstFocusableNodeIncludingDisabled, focusNextFocusableNode } from '@/utilities/focus';
import { UseUniqueId } from '@/use';
import type { PopoverOverlayProps, PopoverAutofocusTarget } from './utils';
import { PopoverCloseSource, setActivatorAttributes } from './utils';
import { PopoverOverlay } from './components';
import { Portal } from '../Portal';

interface PopoverProps {
  /** The preferred direction to open the popover */
  preferredPosition?: PopoverOverlayProps['preferredPosition'];
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PopoverOverlayProps['preferredAlignment'];
  /** Show or hide the Popover */
  active: boolean;
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
  /** Prevents focusing the activator or the next focusable element
   * when the popover is deactivated */
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
  ariaHaspopup?: string;
  /** Allow the popover overlay to be hidden when printing */
  hideOnPrint?: boolean;
  /** Accepts a color scheme for the contents of the popover */
  colorScheme?: PopoverOverlayProps['colorScheme'];
  /**
   * The preferred auto focus target defaulting to the popover container
   * @default 'container'
   */
  autofocusTarget?: PopoverAutofocusTarget;
}

const props = withDefaults(defineProps<PopoverProps>(), {
  preferredPosition: undefined,
  preferredAlignment: undefined,
  zIndexOverride: undefined,
  ariaHaspopup: undefined,
  colorScheme: undefined,
  activatorWrapper: 'div',
  preferInputActivator: true,
  autofocusTarget: 'container',
});

const emit = defineEmits<{
  (event: 'close', source: PopoverCloseSource): void;
  (event: 'scrolled-to-bottom'): void
}>();

const container = ref<HTMLElement | null>(null);

const activator = ref<HTMLElement | null>(null);

const { useUniqueId } = UseUniqueId();

const attrs = useAttrs();

const id = ref<string>(useUniqueId('popover'));

const setAccessibilityAttributes = () => {
  if (container.value) {
    const containerNode = container.value;
    const firstFocusable = findFirstFocusableNodeIncludingDisabled(containerNode);
    const focusableActivator: HTMLElement & { disabled?: boolean } = firstFocusable || containerNode;
    const activatorDisabled = 'disabled' in focusableActivator && Boolean(focusableActivator.disabled);

    setActivatorAttributes(focusableActivator, {
      id: id.value,
      active: props.active,
      ariaHaspopup: props.ariaHaspopup as string,
      activatorDisabled,
    });
  }
};

watch(
  () => props.active,
  () => setAccessibilityAttributes(),
);

const isInPortal = (element: Element) => {
  let { parentElement } = element;

  while (parentElement) {
    if (parentElement.matches(portal.selector)) {return false;}
    parentElement = parentElement.parentElement;
  }

  return true;
};

const handleClose = (source: PopoverCloseSource) => {
  emit('close', source);
  if (!container.value || props.preventFocusOnClose) {return;}

  if ((source === PopoverCloseSource.FocusOut || source === PopoverCloseSource.EscapeKeypress) && activator.value) {
    const focusableActivator =
      findFirstFocusableNodeIncludingDisabled(activator.value) ||
      findFirstFocusableNodeIncludingDisabled(container.value) ||
      container.value;
    if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
      focusableActivator.focus();
    }
  }
};

onMounted(() => {
  if (container.value) {
    const activatorNode = container.value.firstElementChild;
    if (activatorNode) {activator.value = activatorNode as HTMLElement;}
    setAccessibilityAttributes();
  }
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Popover/Popover.scss';
</style>
